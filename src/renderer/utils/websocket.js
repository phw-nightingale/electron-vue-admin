import { Message } from 'element-ui'

const path = 'ws://127.0.0.1:8080/websocket/admin/0'

const websocket = {
  instance: null,
  init() {
    console.log('initializing websocket...')
    if (WebSocket === undefined) {
      Message.error('您的浏览器不支持websocket')
    } else {
      this.instance = new WebSocket(path)
      this.instance.onopen = this.onopen
      this.instance.onmessage = this.onmessage
      this.instance.onerror = this.onerror
      this.instance.onclose = this.onclose
      console.log('initialize websocket complete...')
    }
  },
  onopen() {
    console.log('on open')
    Message.info('连接服务器成功')
    // this.events['open'].forEach(fun => fun())
  },
  onerror() {
    Message.error('连接服务器异常，尝试重新连接中...')
  },
  onmessage(msg) {
    console.log('on message: ', msg)
  },
  onclose() {
    console.log('on close')
    Message.warning('与服务器断开连接，尝试重新连接中...')
  },
  destroyed() {
    console.log('on destroy')
    this.instance = null
  }
}

export default websocket
