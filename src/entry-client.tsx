/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-10 23:07:14
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-20 16:56:31
 * @FilePath     : /chat-webpack/src/entry-client.tsx
 */
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { BrowserRouter } from "react-router-dom";
import Main from '@/main'

const dom = document.getElementById('root') as HTMLElement
const App = () => (
  <Provider store={store}>
    {/* @ts-ignore */}
    <BrowserRouter basename={PUBLIC_PATH}>
      <Main />
    </BrowserRouter>
  </Provider>
)

ReactDOM.hydrateRoot(
  dom,
  <App />
)

if ((import.meta as any).webpackHot) {
  const root = ReactDOM.createRoot(dom);
  (import.meta as any).webpackHot.accept('@/main', () => {
    root.render(<App />)
  });
}