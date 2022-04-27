import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data // post用data，get用params
  })
}

export function getInfo(token) {

}

export function logout() {

}
