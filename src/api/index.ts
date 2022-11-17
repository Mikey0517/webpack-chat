/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-16 03:07:03
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-16 19:19:44
 * @FilePath     : /chat-webpack/src/api/index.ts
 */
import http from "./http"

export default {
  postUpdateUser (params: object) {
    return http.post('/user', params)
  },
  getUser (userID: string) {
    return http.get('/user', { userID })
  }
}