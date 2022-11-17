/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-15 23:48:04
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-17 14:02:47
 * @FilePath     : /chat-webpack/src/store/reducers/user.ts
 */
import { createReducer } from '@reduxjs/toolkit'
import { USER_SET } from '@/store/actions'
import { User, Session } from '@/index'

const initialState: User & Session = {
  userID: '',
  username: '',
  connected: false,
  sessionID: ''
}

export default createReducer(initialState, (builder) => {
  builder.addCase(USER_SET, (state, action) => {
    return action.payload
  })
})