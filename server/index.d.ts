/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-16 00:35:37
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-17 14:21:38
 * @FilePath     : /chat-webpack/server/index.d.ts
 */
type Message = {
  from?: string,
  to: string,
  content: string
}

export type Session = {
  sessionID: string,
  userID: string,
  connected: boolean,
}

export type User = {
  userID: string,
  username: string,
  friends: Array<string>
}
