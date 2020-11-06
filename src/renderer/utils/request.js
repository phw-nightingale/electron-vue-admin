import axios from 'axios'
import { Loading, Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: 'http://127.0.0.1:8080', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 0 // request timeout
})

let load_ins

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    load_ins = Loading.service({ fullscreen: true, lock: true })

    const data = new FormData()
    if (config.data) {
      const old = config.data
      for (const prop in old) {
        data.append(prop, old[prop])
      }
      config.data = data
    }
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['access_token'] = getToken()
    }
    // console.log('current request config is: ', config)
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    load_ins.close()
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    load_ins.close()
    // if the custom code is not 20000, it is judged as an error.
    if (res.status !== 0) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.status === 400 || res.status === 401 || res.status === 403) {
        // to re-login
        MessageBox.confirm('用户认证失败，你可以保留此页面，也可以重新登录。', '用户认证', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // store.dispatch('user/resetToken').then(() => {
          //   location.reload()
          // })
          // removeToken('access_token')
          location.reload()
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    load_ins.close()
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
