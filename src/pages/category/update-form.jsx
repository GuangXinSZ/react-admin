import React, { Component } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types' 

const Item = Form.Item

class updateForm extends Component {

  static propTypes = {
    categoryName: PropTypes.string.isRequired,
    setForm: PropTypes.func.isRequired
  }

  componentWillMount () {
    // 将form对象通过setform传给父组件
    this.props.setForm(this.props.form)
  }
  render () {
    // 获取父组件传的参数
    const { categoryName } = this.props
    const { getFieldDecorator } = this.props.form

    return (
      <Form>
        <Item>
          {
            getFieldDecorator('categoryName', {
              rules: [
              ],
              initialValue: categoryName
            })(
              <Input placeholder="请输入分类名称"/>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(updateForm)