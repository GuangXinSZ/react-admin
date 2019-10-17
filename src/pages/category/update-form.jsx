import React, { Component } from 'react'
import { Form, Select } from 'antd'


const Item = Form.Item
const Option = Select.Option

class updateForm extends Component {
  render () {
    const { getFieldDecorator } = this.props.form

    return (
      <Form>
        <Item>
          {
            getFieldDecorator('parentId', {
              rules: [
              ],
              initialValue: '0'
            })(
              <Select>
                <Option value='0'>一级分类</Option>
                <Option value='1'>电脑</Option>
                <Option value='2'>图书</Option>
                <Option value='3'>笔记本</Option>
                <Option value='4'>水果</Option>
              </Select>
            )
          }
        </Item>
      </Form>
    )
  }
}

export default Form.create()(updateForm)