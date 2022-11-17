/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-15 18:40:41
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-17 15:30:02
 * @FilePath     : /chat-webpack/src/store/reducers/all-people.ts
 */
import { createReducer } from '@reduxjs/toolkit'
import { ALL_PEOPLE_SET } from '@/store/actions'
import { MessageState } from '@/index'

const initialState: MessageState = {
  data: {},
  sort: []
}

export default createReducer(initialState, (builder) => {
  builder.addCase(ALL_PEOPLE_SET, (state, action) => {
    return action.payload
  })
})