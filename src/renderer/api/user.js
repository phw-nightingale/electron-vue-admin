import request from '@/utils/request'

export function teachList() {
  return request({
    url: '/users',
    method: 'get',
    params: {
      role: 'TEACHER'
    }
  })
}

export function studentList() {
  return request({
    url: '/users',
    method: 'get',
    params: {
      role: 'STUDENT'
    }
  })
}

export function saveStudent(data) {
  return request({
    url: '/users',
    method: data.id === undefined ? 'post' : 'put',
    data
  })
}

export function saveTeacher(data) {
  return request({
    url: '/users',
    method: data.id === undefined ? 'post' : 'put',
    data
  })
}

export function removeStudent(id) {
  return request({
    url: '/users/' + id,
    method: 'delete'
  })
}

export function removeTeacher(id) {
  return request({
    url: '/users/' + id,
    method: 'delete'
  })
}
