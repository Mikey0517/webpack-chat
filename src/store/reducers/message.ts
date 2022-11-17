/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-16 18:02:58
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-17 20:47:12
 * @FilePath     : /chat-webpack/src/store/reducers/message.ts
 */
import { createReducer } from '@reduxjs/toolkit'
import { MESSAGE_SET, MESSAGE_ADD_USER, MESSAGE_PUSH, MESSAGE_UPDATE_USER } from '@/store/actions'
import { MessageState } from '@/index'
import { cloneDeep } from 'lodash'

const initialState: MessageState = {
  data: {},
  sort: []
}

export default createReducer(initialState, (builder) => {
  builder.addCase(MESSAGE_SET, (state, action) => {
    return action.payload
  })
  builder.addCase(MESSAGE_ADD_USER, (state, action) => {
    const user = action.payload
    if (!Array.isArray(user.messages)) user.messages = []
    state.data[user.userID] = user
    state.sort.unshift(user.userID)
    return state
  })
  builder.addCase(MESSAGE_PUSH, (state, action) => {
    const message = action.payload
    const user = cloneDeep(state.data[message.to])
    const sort = [...state.sort]
    if (!Array.isArray(user.messages)) user.messages = []
    user.messages.push(message)
    state.data[message.to] = user
    const index = sort.indexOf(user.userID)
    if (index > -1) {
      state.sort = [...sort.splice(index, 1), ...sort]
    }
    
    return state
  })
  builder.addCase(MESSAGE_UPDATE_USER, (state, action) => {
    const newUser = action.payload
    const data = cloneDeep(state)
    data.data[newUser.userID] = newUser

    return data
  })
})