/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-16 03:03:44
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-16 22:49:58
 * @FilePath     : /chat-webpack/src/api/http.ts
 */
import axios from 'axios'
import { Toast } from 'antd-mobile'

const instance = axios.create({
  baseURL: '/api'
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // const authoriZation = window.localStorage.authoriZation || ''
  // if (authoriZation) {
  //   config.headers['authorization'] = `Bearer ${authoriZation}`
  // }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  const { data } = response
  const { statusCode, message } = data
  if (statusCode >= 400) {
    Toast.show({
      icon: 'fail',
      content: message,
    })
    return Promise.reject(response)
  }
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

const get = (url: string, params: object) => {
  return instance.get(url, { params }).then(res => res.data)
}

const post = (url: string, params: object) => {
  return instance.post(url, params).then(res => res.data)
}

export default {
  get,
  post
}
