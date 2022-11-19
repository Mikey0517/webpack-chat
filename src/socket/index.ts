/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-14 17:19:54
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-20 03:21:43
 * @FilePath     : /chat-webpack/src/socket/index.ts
 */
import { io } from "socket.io-client";

// @ts-ignore
const socket: any = io(PUBLIC_PATH, { autoConnect: false });

export default socket;