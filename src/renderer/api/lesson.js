import request from '@/utils/request'

export function lessonList(params) {
  return request({
    url: '/lessons/list',
    method: 'get',
    params
  })
}

export function addLesson(data) {
  return request({
    url: '/lessons',
    method: 'post',
    data
  })
}

export function lessonAll() {
  return request({
    url: '/lessons',
    method: 'get'
  })
}

export function updateLesson(data) {
  return request({
    url: '/lessons/' + data.id,
    method: 'put',
    data
  })
}

export function removeLesson(id) {
  return request({
    url: '/lessons/' + id,
    method: 'delete'
  })
}
