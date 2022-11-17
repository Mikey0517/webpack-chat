/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-15 18:30:11
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-17 20:44:08
 * @FilePath     : /chat-webpack/src/store/actions.ts
 */
import { createAction } from '@reduxjs/toolkit'
import { User, Message, MessageState, Session } from '@/index'

export const USER_SET = createAction<User & Session, 'user/set'>('user/set')
export const ALL_PEOPLE_SET = createAction<MessageState, 'allPeople/set'>('allPeople/set')
export const MESSAGE_SET = createAction<MessageState, 'message/set'>('message/set')
export const MESSAGE_ADD_USER = createAction<User, 'message/add/user'>('message/add/user')
export const MESSAGE_UPDATE_USER = createAction<User, 'message/update/user'>('message/update/user')
export const MESSAGE_PUSH = createAction<Message, 'message/push'>('message/push')