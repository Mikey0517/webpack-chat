/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-11 11:40:49
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-16 23:28:34
 * @FilePath     : /chat-webpack/server/render.ts
 */
import { Context, Next } from 'koa';
import fs from 'fs'
import path from 'path'

const isProd = process.env.NODE_ENV === 'production'

function renderMiddlewares () {
  return async (ctx: Context, next: Next) => {
    try {
      if (ctx.request.accepts('html')) {
        let template = '', render
  
        if (!isProd) {
          const { devMiddleware } = (ctx.res as any).locals.webpack;
          const outputFileSystem = devMiddleware.outputFileSystem;
          template = outputFileSystem.readFileSync(path.resolve('dist/client/index.html'), 'utf-8')

          render = (global as any).ssr?.render
        } else {
          template = fs.readFileSync(path.resolve(process.cwd(), 'dist/client/index.html'), 'utf-8');
  
          render = (await import(path.resolve(process.cwd(), 'dist/server/entry-server.js'))).render
        }
  
        await renderTemplate(ctx, render, template)
      } else {
        await next()
      }
    } catch (e: any) {
      ctx.throw(500, e.stack)
    }
  }
}

function renderTemplate (ctx: Context, render: any, template: string) {
  const html = template.split('loading')
  return new Promise((resolve) => {
    if (typeof render === 'function') {
      const stream = render(ctx.path, {
        onShellReady() {
          // The content above all Suspense boundaries is ready.
          // If something errored before we started streaming, we set the error code appropriately.
          ctx.status = 200
          ctx.type = 'text/html'
          ctx.res.write(html[0])
          stream.pipe(ctx.res)
          ctx.res.write(html[1])
          resolve(stream)
        },
        onError(err: unknown) {
          console.error(err);
        },
      })
    } else {
      ctx.body = template
    }
  })
}

export default renderMiddlewares