/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-14 15:38:40
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-17 20:56:43
 * @FilePath     : /chat-webpack/src/main.tsx
 */
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'
import Route from '@/router'
import { useAppDispatch, useAppSelector } from '@/store'
import { MESSAGE_SET, USER_SET, ALL_PEOPLE_SET } from '@/store/actions';
import socket from '@/socket'
import * as constants from '@/socket/constants'
import { Message, MessageState, Session, User } from '@/index';
import { cloneDeep } from 'lodash'
import 'antd-mobile/es/global'
import '@/assets/common.less'
import { Toast } from 'antd-mobile';

export default function Main () {
  const dispatch = useAppDispatch()
  const message = useAppSelector(state => state.message)
  const allPeople = useAppSelector(state => state.allPeople)
  const location = useLocation()
  const dataRef = useRef<{[key: string]: any}>({})

  useEffect(() => {
    const sessionID = localStorage.getItem("sessionID");
    if (sessionID) {
      socket.auth = { sessionID };
    }

    socket.connect();

    socket.on(constants.SESSION, (data: User & Session) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { 
        sessionID: data.sessionID
      };
      // store it in the localStorage
      localStorage.setItem("sessionID", data.sessionID as string);
      // save the ID of the user
      socket.userID = data.userID;

      dispatch(USER_SET(data))
    });

    getFriends()
    getConnectedUsers()

    // 监听用户上线
    socket.on(constants.USER_CONNECTED, (user: User) => {
      const allPeople = cloneDeep(dataRef.current.allPeople)

      if (!allPeople.data[user.userID]) {
        allPeople.data[user.userID] = user
        allPeople.sort.splice(1, 0, [user.userID])
        dispatch(ALL_PEOPLE_SET(allPeople))
      }
    })

    // 监听用户下线
    socket.on(constants.USER_DISCONNECTED, (userID: string) => {
      const allPeople = cloneDeep(dataRef.current.allPeople)
      if (allPeople.data[userID]) {
        Reflect.deleteProperty(allPeople.data, userID)
        const index = allPeople.sort.indexOf(userID)
        if (index > -1) allPeople.sort.splice(index, 1)
      
        dispatch(ALL_PEOPLE_SET(allPeople))
      }
    })

    socket.on(constants.PRIVATE_MESSAGE, (message: Message, fromUser: User) => {
      const state = cloneDeep(dataRef.current.message)
      const location = dataRef.current.location
      const id = location.pathname.split('/').pop()

      const user = state.data[message.from as string] 
      if (user !== void 0) {
        user.messages.push(message);
        user.username = fromUser.username

        if (!(location.pathname.startsWith('/chat-room') && id === message.from)) {
          user.notify.num = user.notify.num + 1;
          Toast.show({
            content: '你有新的消息'
          })
        }
        const index = state.sort.indexOf(fromUser.userID)
        if (index > -1) {
          state.sort.splice(index, 1)
        }
      } else {
        state.data[fromUser.userID] = {
          ...fromUser,
          messages: [message],
          notify: {
            num: 1
          }
        }
        Toast.show({
          content: '你有新的消息'
        })
      }
      state.sort.unshift(fromUser.userID)

      dispatch(MESSAGE_SET(state))
    });

    socket.on(constants.CONNECT_ERROR, (err: any) => {
      console.log('%c [ err ]-38', 'font-size:13px; background:pink; color:#bf2c9f;', err)
    });

    function getFriends () {
      // 获取好友列表
      socket.on(constants.FRIENDS, (users: Array<User>) => {
        const state: MessageState = {
          data: {},
          sort: []
        }
        users.forEach(user => {
          state.data[user.userID] = {
            ...user,
            notify: {
              num: 0
            }
          }
          state.sort.push(user.userID)
        })
  
        dispatch(MESSAGE_SET(state))
      })
    }

    function getConnectedUsers () {
      // 监听已连接用户获取 //TODO
      socket.on(constants.ALL_PEOPLE, (users: Array<User>) => {
        const state: MessageState = {
          data: {},
          sort: []
        }
        users.forEach(user => {
          state.data[user.userID] = user
          state.sort.push(user.userID)
        })
        dispatch(ALL_PEOPLE_SET(state))
      })
    }

    return () => {
      socket.off(constants.SESSION);
      socket.off(constants.CONNECT_ERROR);
    }
  }, [])

  useEffect(() => {
    dataRef.current.message = message
    dataRef.current.allPeople = allPeople
    dataRef.current.location = location
  }, [message, allPeople, location])

  return <Route />
}