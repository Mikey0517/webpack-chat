/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-15 20:52:04
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-17 20:41:03
 * @FilePath     : /chat-webpack/src/index.d.ts
 */
export type Message = {
  from?: string,
  to: string,
  content: string
}

export type Notify = {
  num: number
}

export type Session = {
  sessionID: string,
  connected: boolean,
}

export type User = {
  userID: string,
  username: string,
  messages?: Array<Message>,
  notify?: Notify
}

export type MessageStateData = {
  [key: string]: User
}

export type MessageState = {
  data: MessageStateData,
  sort: Array<string>
}