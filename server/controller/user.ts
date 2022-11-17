/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-16 02:55:10
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-17 13:52:59
 * @FilePath     : /chat-webpack/server/controller/user.ts
 */
import { Context, Next } from 'koa';
import { sessionStore, userStore } from '../socket/store/index.js';
// @ts-ignore
import result from 'response-format';

export default {
  updateUser (ctx: Context, next: Next) {
    const { sessionID, username } = (ctx.request as any).body
    
    const session = sessionStore.findSession(sessionID)
    const user = userStore.findUser(session.userID)

    user.username = username

    userStore.saveUser(user.userID, user)

    ctx.body = result.success('ok', user)
  },
  getUserByUserID (ctx: Context, next: Next) {
    const { userID } = ctx.query

    const user = userStore.findUser(userID as string) as object

    if (user) {
      ctx.body = result.success('ok', user)
    } else {
      ctx.body = result.success('未找到用户', user)
    }
  }
}