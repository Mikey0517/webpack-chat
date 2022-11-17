/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-13 17:54:31
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-13 17:58:28
 * @FilePath     : /chat-webpack/server/utils/ip.ts
 */
import os from 'os'

export default function getIPAddress () {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    if (Array.isArray(iface)) {
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
            return alias.address;
        }
      }
    }
  }

  return '0.0.0.0'
}