/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-14 17:19:54
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-15 16:48:29
 * @FilePath     : /chat-webpack/src/utils/socket.ts
 */
import { io } from "socket.io-client";

const socket: any = io('/', { autoConnect: false });

export default socket;