/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-15 17:59:05
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-16 18:47:24
 * @FilePath     : /chat-webpack/src/store/index.ts
 */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { user, allPeople, message } from './reducers'

export const store = configureStore({
  reducer: {
    user,
    allPeople,
    message
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector