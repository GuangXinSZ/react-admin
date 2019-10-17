import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd'
import { Route, Switch } from 'react-router-dom'
import LeftNav from '../../comonents/left-nav'
import HeaderNav from '../../comonents/header'
import Home from '../home/home'
import Cateory from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const { Footer, Sider, Content } = Layout
// 应用的根组件
export default class Admin extends Component {
  render () {
    const user = memoryUtils.user
    // 如果用户没有登录
    if (!user.username || !user._id) {
      return <Redirect to="/login" />
    }

    return (  
      <Layout style={{ height: '100%' }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <header>
            <HeaderNav></HeaderNav>
          </header>
          <Content style={{ margin: 20, backgroundColor: '#fff' }}>
            {/* router组件基本控制 */}
            <Switch>
              <Route path='/home' component={ Home }></Route>
              <Route path='/category' component={ Cateory }></Route>
              <Route path='/product' component={ Product }></Route>
              <Route path='/role' component={ Role }></Route>
              <Route path='/user' component={ User }></Route>
              <Route path='/charts/bar' component={ Bar }></Route>
              <Route path='/charts/line' component={ Line }></Route>
              <Route path='/charts/pie' component={ Pie }></Route>
              <Redirect to="/home"></Redirect>
            </Switch>
            {/* router组件基本控制 */}
          </Content>
          <Footer style={{ textAlign: 'center', color: '#ccc' }}>
            推荐使用goggle浏览器, 可以获得更佳页面操作体验
          </Footer>
        </Layout>
      </Layout>
    )
  }
}