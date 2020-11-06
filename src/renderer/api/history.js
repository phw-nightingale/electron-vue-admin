import request from '@/utils/request'

export function historyPage(params) {
  return request({
    url: '/train-histories/page',
    method: 'get',
    params
  })
}

export function findHistoryById(id) {
  return request({
    url: '/train-histories/' + id,
    method: 'get'
  })
}

export function pageStuNameLike(params) {
  return request({
    url: '/train-histories/student-name/like',
    method: 'get',
    params
  })
}

export function getScoreLine(userId) {
  return request({
    url: '/train-histories/score-line/' + userId,
    method: 'get'
  })
}

