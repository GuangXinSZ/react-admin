import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import menuList from '../../config/menuConfig'
import Logo from '../../assets/images/logo.png'
import './index.less'

const { SubMenu } = Menu
// 左侧导航
class LeftNav extends Component {
  state = {
    collapsed: false,
    openKey: ''
  }

  // 根据menu的数据数组生成对应的标签数组
  getMenuNodes_map = (menuList) => {
    // 获取localtion的path
    const path = this.props.location.pathname

    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={ item.key }>
            <Link to={ item.key }>
              <Icon type={ item.icon } />
              <span>{ item.title }</span>
            </Link>
          </Menu.Item>
        )
      } else {
        const cItem = item.children.find(cItem => cItem.key === path)

        if (cItem) {
          // 切记此处是返回上一级item.key的值
          this.setState({
            openKey: item.key
          })
        }

        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={ item.icon } />
                <span>{ item.title }</span>
              </span>
            }
          >
            { this.getMenuNodes_map(item.children) }
          </SubMenu>
        )
      }
    })
  }

  // render之前执行
  componentWillMount () {
    this.menuNodes = this.getMenuNodes_map(menuList)
  }

  render () {
    const path = this.props.location.pathname

    // 获取openkey
    return (
      <div className="left-nav">
        <Link to='/' className="left-nav-header">
          <img src={Logo} alt=""/>
          <h1>蛙谷后台</h1>
        </Link>
        <Menu
          selectedKeys={[ path ]}
          defaultOpenKeys={[ this.state.openKey ]}
          mode="inline"
          theme="dark"
        >
          {
            this.menuNodes
          }
        </Menu>
      </div>
    )
  }
}

export default withRouter(LeftNav)