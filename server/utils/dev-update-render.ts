/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-14 01:30:22
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-14 02:48:06
 * @FilePath     : /chat-webpack/server/utils/dev-update-render.ts
 */
import type { Compiler } from 'webpack';
import path from 'path'
import vm from 'vm'
import { createRequire } from "module";

const require = createRequire(import.meta.url)

export default function devUpdateRender (compiler: Compiler, instance: any) {
  compiler.hooks.done.tap('done', () => {
    const { outputFileSystem } = instance.context
    const ssrFile = outputFileSystem.readFileSync(path.resolve('dist/server/entry-server.js'), 'utf-8')
    const contextObject = {
      require,
      global
    };
    vm.runInNewContext(ssrFile, contextObject)
  })
}