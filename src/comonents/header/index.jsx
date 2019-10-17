import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { formateDate } from '../../utils/dateUtils'
import { reqWeather } from '../../api/index'
import menuList from '../../config/menuConfig'
import { message } from 'antd'
import './index.less'

const { confirm } = Modal
class Header extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    dayPictureUrl: '',
    weather: ''
  }

  getTime = () => {
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({
        currentTime
      })
    }, 1000)
  }
  getWeather = async () => {
    try {
      let { dayPictureUrl, weather } = await reqWeather('北京')
      this.setState({dayPictureUrl, weather})
    } catch (err) {
      message.error('请求出错了：'+ err)
    }
  }
  // 获取当前请求头
  getTitle = () => {
    const path = this.props.location.pathname
    let title = ''

    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        let cItem = item.children.find(citem => citem.key === path)
        if (cItem) {
          title = cItem.title
        }
      }
    })

    return title
  }

  // 退出登录
  logout = () => {
    confirm({
      title: '确认退出吗?',
      onOk: () =>{
        // 删除本地的user
        storageUtils.removeUser()
        memoryUtils.user = {}

        // 跳转到
        this.props.history.replace('/login')
      },
      onCancel() {
        console.log('Cancel')
      },
    });
  }
  /*
    第一次render后开始执行该生命周期
    一般在此执行异步操作：发送ajax请求:: 启动定时器
  */
  componentDidMount () {
    // 时间
    this.getTime()
    // 得到天气
    this.getWeather()
  }

  // 组件卸载之前，需要清空定时器
  componentWillUnmount () {
    // 清除定时器
    clearInterval(this.intervalId)
  }

  render () {
    const { currentTime, dayPictureUrl, weather } = this.state
    const userName = memoryUtils.user.username
    const title = this.getTitle()

    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎，{ userName }</span>
          <span style={{ color: '#1da57a', cursor: 'pointer' }} onClick={ this.logout }>
            退出
          </span>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            { title }
          </div>
          <div className="header-bottom-right">
            <span>
              { currentTime }
            </span>
            <span>
              <img src={ dayPictureUrl } alt="weather" />
            </span>
            <span>
              { weather }
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
