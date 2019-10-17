import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import { Redirect } from 'react-router-dom'
import './login.less'
import Logo from '../../assets/images/logo.png'
import { reqLogin } from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

// const Item = Form.Item
// 登录的路由组件
class Login extends Component {
  // 表单提交事件
  handleSubmit = (event) => {
    // 阻止事件的默认行为
    event.preventDefault()

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let { username, password } = values
        try {
          let response = await reqLogin(username, password)
          if (response.status === 0) {
            message.success('登录成功')

            // 保存user
            const user = response.data
            memoryUtils.user = user // 存在内存里
            storageUtils.saveUser(user) // 存缓存
            this.props.history.replace('/')
          } else {
            message.error(response.msg)
          }
        } catch (error) {
          console.log('登录失败', error)
        }
      } else {
        console.log('校验失败!')
      }
    })
  }

  // 自定义表单验证
  validatePwd = (rule, value, callback) => {
    if (!value) {
      callback('请输入密码')
    } else if (value.length < 4) {
      callback('密码不能小于4位数')
    } else if (value.length > 12) {
      callback('密码长度不能超过12为数')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线组成')
    } else {
      callback()
    }
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const user = memoryUtils.user
    if (user && user._id) {
      return <Redirect to="/" />
    }

    return (
      <div className="login">
        <header className="login-header">
          <img src={ Logo } alt="" />
          <h1>React： 后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form onSubmit={ this.handleSubmit } className="login-form">
            <Form.Item>
              {getFieldDecorator('username', {
                // 表单验证
                rules: [
                  { require: true, whitespace: true, message: '请输入用户名'},
                  { min: 4, message: '用户名最少4位数'},
                  { max: 12, message: '用户名最多12位数'},
                  { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成'},
                ],
                initialValue: 'admin'
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.validatePwd
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
 }

const WrapLogin = Form.create()(Login)
export default WrapLogin