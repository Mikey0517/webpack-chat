/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-16 00:30:56
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-17 19:09:36
 * @FilePath     : /chat-webpack/server/socket/controller/index.ts
 */
import { messageStore, sessionStore, userStore } from '../store/index.js';
import * as action from '../constants.js'
import type { User, Session, Message } from '../../index.d.js'

export const saveSessionAndUser = (socket: any) => {
  const session = sessionStore.findSession(socket.sessionID)
  if (session) {
    session.connected = true
    sessionStore.saveSession(socket.sessionID, session)
  } else {
    const session = {
      sessionID: socket.sessionID,
      userID: socket.userID,
      connected: true
    }
    sessionStore.saveSession(socket.sessionID, session)
    const user = {
      userID: socket.userID,
      username: socket.username,
      friends: []
    }
    userStore.saveUser(user.userID, user)
  }
}

export const sendSessionAndUser = (socket: any) => {
  const session = sessionStore.findSession(socket.sessionID)
  const user = userStore.findUser(socket.userID)
  
  socket.emit(action.SESSION, {...session, ...user});
}

export const getFriendsUsers = (socket: any) => {
  const user = userStore.findUser(socket.userID)
  console.log('%c [ user ]-36', 'font-size:13px; background:pink; color:#bf2c9f;', user)
  const messages = messageStore.findMessagesForUser(user.userID)
  const messagesPerUser = new Map();
  const friends: any = []

  messages.forEach(message => {
    const { from, to } = message;
    const otherUser = socket.userID === from ? to : from;
    if (messagesPerUser.has(otherUser)) {
      messagesPerUser.get(otherUser).push(message);
    } else {
      messagesPerUser.set(otherUser, [message]);
    }
  })
  user.friends.forEach(userID => {
    const friend = userStore.findUser(userID)
    if (friend) {
      const cloneFriend = {...friend}
      Reflect.deleteProperty(cloneFriend, 'friends')
      friends.push({
        ...cloneFriend,
        messages: messagesPerUser.get(userID) || []
      })
    }
  })

  socket.emit(action.FRIENDS, friends);
}

export const getConnectedUsers = (socket: any) => {
  const users: Array<User> = [];
  let currentUser
  sessionStore.findAllSessions().forEach((session: Session) => {
    if (session.connected) {
      const user = userStore.findUser(session.userID)
      if (session.userID === socket.userID) {
        currentUser = user
      } else {
        users.push(user);
      }
    }
  });

  if (currentUser) users.unshift(currentUser as User)

  socket.emit(action.ALL_PEOPLE, users);
}

export const sendMessage = (socket: any) => {
  socket.on(action.PRIVATE_MESSAGE, ({ content, to }: Message) => {
    const fromUser = {...userStore.findUser(socket.userID)}
    const toUser = {...userStore.findUser(to)}
    const message = {
      content,
      from: fromUser.userID,
      to,
    };
    socket.to(to).to(socket.userID).emit(action.PRIVATE_MESSAGE, message, fromUser);
    messageStore.saveMessage(message);
    if (!fromUser.friends.includes(to)) {
      fromUser.friends.push(to) 
      userStore.saveUser(fromUser.userID, fromUser)
    }
    if (!toUser.friends.includes(fromUser.userID)) {
      toUser.friends.push(fromUser.userID)
      userStore.saveUser(to, toUser)
    }
  });
}