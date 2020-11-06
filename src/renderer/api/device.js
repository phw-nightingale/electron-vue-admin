import request from '@/utils/request'

export function listDevices() {
  return request({
    url: '/devices',
    method: 'get'
  })
}
