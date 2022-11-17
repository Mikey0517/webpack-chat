/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-16 02:50:30
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-16 19:18:04
 * @FilePath     : /chat-webpack/server/router.ts
 */
import Router from 'koa-router'
import { koaBody } from 'koa-body'
import { UserController } from './controller/index.js'

const router = new Router({
  prefix: '/api'
})

router.post('/user', koaBody(), UserController.updateUser)
router.get('/user', UserController.getUserByUserID)

export default router