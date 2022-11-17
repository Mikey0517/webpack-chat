/**
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-10 23:52:00
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-14 21:44:02
 * @FilePath     : /chat-webpack/configs/babel.config.js
 */
export default function () {
  const config = {
    "presets": [
      "@babel/preset-env",
      [
        "@babel/preset-react",
        {
          runtime: 'automatic'
        }
      ],
      "@babel/preset-typescript"
    ],
    "plugins": [
      [
        "import",
        { 
          "libraryName": "antd-mobile", 
          "libraryDirectory": "es/components", 
          "style": false
        }
      ]
    ]
  }

  return config
}