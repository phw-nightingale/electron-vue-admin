import request from '@/utils/request'

export function send(data) {
  return request({
    url: '/websocket/send/' + data.deviceId,
    method: 'post',
    data: {
      data: JSON.stringify(data)
    }
  })
}

export function getOnline() {
  return request({
    url: '/websocket/online',
    method: 'get'
  })
}
