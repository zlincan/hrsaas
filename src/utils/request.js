import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})

service.interceptors.request.use()

service.interceptors.response.use(
  // 成功的回调，拿到后端返回的数据
  response => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  // 失败的回调，拿到浏览器封装的错误对象
  error => {
    Message.error(error.message)
    return Promise.reject(error) // 让当前的执行链跳出then进入catch
  }
)

export default service
