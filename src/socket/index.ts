/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-14 17:19:54
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-20 15:23:59
 * @FilePath     : /chat-webpack/src/socket/index.ts
 */
import { io } from "socket.io-client";

const socket: any = io('/', { 
  autoConnect: false,
  // @ts-ignore
  path: `${PUBLIC_PATH === '/' ? '' : PUBLIC_PATH }/socket.io/`
});

export default socket;