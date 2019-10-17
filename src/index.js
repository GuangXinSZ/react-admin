// 入口js文件
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'

// 读取local里面的user 初始默认user
const user = storageUtils.getUser()
memoryUtils.user = user

ReactDOM.render(<App />, document.getElementById('root'))