/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-11 11:24:38
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-17 18:22:39
 * @FilePath     : /chat-webpack/server/index.ts
 */
import path from 'path'
import Koa from 'koa'
import e2k from 'express-to-koa'
import send from 'koa-send'
import webpack from 'webpack'
import http from 'http'
import { Configuration } from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
// @ts-ignore
import acceptOverride from 'koa-accept-override'
import renderMiddlewares from './render.js'
import router from './router.js'
import createSocketIO from './socket/index.js'
import { getIPAddress, devUpdateRender } from './utils/index.js'

const port = 8080
const network = `${getIPAddress()}:${port}`

async function createServer (isProd = process.env.NODE_ENV === 'production') {
  const app = new Koa()

  if (!isProd) {
    const config = (await import(path.resolve('configs/webpack.config.ts'))).default
    const compiler = webpack(config as Configuration);

    // 开发环境中间件
    const instance = devMiddleware(compiler, {
      publicPath: config[0].output.publicPath,
      writeToDisk: false,
      serverSideRender: true,
      stats: 'errors-warnings',
    })

    app.use(e2k(instance))

    // 热更新
    app.use(e2k(hotMiddleware((compiler as any).compilers[0])));

    // 监听编译结束，重新生成 render 方法
    devUpdateRender(compiler, instance)

    // 等待加载结束事件
    instance.waitUntilValid(logAddress)
  } else {
    app.use(async (ctx, next) => {
      // 判断是否是静态资源
      try {
        const realPath = await send(ctx, ctx.path, { root: path.resolve('dist/client') });
        if (realPath === undefined) {
          await next()
        }
      } catch (e: any) {
        await next()
      }
    })
  }

  // 优化 accept
  app.use(acceptOverride())
  // // 路由
  app.use(router.routes())
  app.use(router.allowedMethods())
  // 渲染 ssr html
  app.use(renderMiddlewares())

  const httpServer = http.createServer(app.callback())

  const io = createSocketIO()

  io.attach(httpServer)

  httpServer.listen(port, () => {
    isProd && logAddress()
  })

  return app
}

function logAddress () {
  console.log(`
    App runing at: 
    - Local: http://localhost:${port}
    - Network: http://${network}
  `)
}

export default createServer()