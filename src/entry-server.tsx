/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-10 23:09:00
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-15 20:25:10
 * @FilePath     : /chat-webpack/src/entry-server.tsx
 */
import ReactDOMServer, { RenderToPipeableStreamOptions } from 'react-dom/server'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { StaticRouter } from "react-router-dom/server"
import Main from '@/main'

function render(url: string, options: RenderToPipeableStreamOptions) {
  return ReactDOMServer.renderToPipeableStream(
    <Provider store={store}>
      <StaticRouter location={url}>
        <Main />
      </StaticRouter>
    </Provider>,
    options
  )
}

export {
  render
}