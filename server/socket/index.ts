/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-15 15:05:40
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-17 18:52:16
 * @FilePath     : /chat-webpack/server/socket/index.ts
 */
import { Server } from 'socket.io'
import crypto from 'crypto'
import { sessionStore, userStore } from './store/index.js';
import * as controller from './controller/index.js'
import * as action from './constants.js'

const randomId = () => {
  return crypto.randomBytes(8).toString('hex')
}

export default function createSocketIO () {
  const io = new Server()

  // 中间件
  io.use((socket: any, next) => {
    const sessionID = socket.handshake.auth.sessionID;
    if (sessionID) {
      const session = sessionStore.findSession(sessionID)
      if (session) {
        const user = userStore.findUser(session.userID)
        socket.sessionID = sessionID;
        socket.userID = session.userID;
        socket.username = user.username;
        return next();
      }
    }
    socket.sessionID = randomId();
    socket.userID = randomId();
    socket.username = `测试${randomId().slice(0, 4)}`;
    next();
  });

  const isReload: {[key: string]: boolean} = {}
  io.on('connection', async (socket: any) => {
    // 是否在规定时间内重连
    if (isReload[socket.sessionID] !== void 0) {
      isReload[socket.sessionID] = true
    }

    // 保存 session 和用户信息
    controller.saveSessionAndUser(socket)

    // 发送 session 和用户 信息
    controller.sendSessionAndUser(socket)

    // join the "userID" room
    socket.join(socket.userID);

    // 获取好友列表
    controller.getFriendsUsers(socket)
    // 获取所有已连接用户
    controller.getConnectedUsers(socket)

    // 广播用户连接
    socket.broadcast.emit(action.USER_CONNECTED, userStore.findUser(socket.userID));

    // 发送消息
    controller.sendMessage(socket)

    // 刷新
    socket.on(action.REFRESH, (type: string) => {
      switch (type) {
        case action.ALL_PEOPLE:
          controller.getConnectedUsers(socket)
          controller.getConnectedUsers(socket.broadcast)
      }
    })

    // 监听用户下线
    socket.on(action.DISCONNECT, () => {
      isReload[socket.sessionID] = false
      setTimeout(() => {
        if (!isReload[socket.sessionID]) {
          io.to(socket.userID).disconnectSockets();

          socket.broadcast.emit(action.USER_DISCONNECTED, socket.userID);
          // update the connection status of the session
          const session = sessionStore.findSession(socket.sessionID)
          sessionStore.saveSession(socket.sessionID, {...session, connected: false});
        } else {
          Reflect.deleteProperty(isReload, socket.sessionID)
        }
      }, 5000)
    });
  })

  return io
}