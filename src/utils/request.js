import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'

const Timeout = 3600 // token过期时间

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      if (isTimeout()) {
        store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject(new Error('token超时'))
      }
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error) // 理解为抛出异常
  }
)

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
    if (error.response && error.response.data && error.response.data.code === 10002) {
      store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error) // 让当前的执行链跳出then进入catch
  }
)

function isTimeout() {
  const currentTime = Date.now()
  const timeStamp = getTimeStamp()
  return (currentTime - timeStamp) / 1000 > Timeout
}

export default service
