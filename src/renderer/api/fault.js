import request from '@/utils/request'

export function faultList(params) {
  return request({
    url: '/faults/list',
    method: 'get',
    params
  })
}

export function componentNames() {
  return request({
    url: '/faults/component-names',
    method: 'get'
  })
}

export function listAll() {
  return request({
    url: '/faults',
    method: 'get'
  })
}

export function listIdIn(params) {
  return request({
    url: '/faults/ids/in',
    method: 'get',
    params: {
      ids: params
    }
  })
}
