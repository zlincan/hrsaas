import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data // post用data，get用params
  })
}

export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
    // method: 'get' // 默认就是get
  })
}

export function logout() {

}
