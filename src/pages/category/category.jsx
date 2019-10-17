import React, { Component } from 'react'
import { Card, Button, Icon, Table, message, Modal } from 'antd'
import ButtonLine from '../../comonents/link-button/index'
import AddForm from './add-form'
import UpdateForm from './update-form'
import { reqCategorys } from '../../api/index'
import LinkButton from '../../comonents/link-button/index';

// 分类路由
export default class Category extends Component {
  state = {
    categorys: [],  // 一级分类列表
    subCategorys: [], // 二级分类列表
    loadingIsVisibile: true,
    parentId: 0,
    parentName: '',
    showStatus: 0, // 等于添加 || 修分类都不显示， 1显示添加，2显示更新分类
  }
  componentWillMount () {
    this.initColumns()
  }
  // 用于请求异步的ajax
  componentDidMount () {
    this.getCategorys()
  }
  getCategorys = async () => {
    const { parentId } = this.state // 获取parentId
    let res = await reqCategorys(parentId)
    if (res.status === 0) {
      if (parentId === 0) {
        this.setState({
          categorys: res.data
        })
      } else {
        this.setState({
          subCategorys: res.data
        })
      }

      this.setState({
        loadingIsVisibile: false
      })
    } else {
      message.error('获取分类列表失败!')
    }
  }
  // 获取二级分类
  showSubCategorys = async (category) => {
    // this.setState是一个异步操作
    await this.setState({
      parentId: category._id,
      parentName: category.name
    })
    this.getCategorys()
  }
  // 获取一级菜单列表
  showCategorys = async () => {
    await this.setState({
      parentId: 0,
      parentName: '',
      subCategorys: []
    })

    this.getCategorys()
  }
  // 添加分类
  addCategeory = () => {
  
  }
  // 更新分类
  updateCategeory = () => {
    
  }
  // 隐藏dialog
  handleCancel = () => {
    this.setState({
      showStatus: 0
    })
  }
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }
  updateCategory = (category) => {
    console.log(category)
    this.setState({
      showStatus: 2
    })
  }
  initColumns = () => {
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        key: 'action',
        width: 300,
        render: (category) => (
          <span>
            <ButtonLine onClick={() => this.updateCategory(category)}>修改分类</ButtonLine>
            {
              this.state.parentId === 0 ? <ButtonLine onClick={() => { this.showSubCategorys(category) }}>查看子分类</ButtonLine> : null
            }
          </span>
        )
      }
    ]
  }

  render () {
    const { categorys, loadingIsVisibile, parentId, subCategorys, parentName, showStatus } = this.state

    // 一级分类的名称
    const title = parentId === 0 ? '一级分类' : (
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类</LinkButton>
        <Icon type="arrow-right" style={{ marginRight: 5 }}></Icon>
        <span>{ parentName }</span>
      </span>
    )
    // card的右侧 
    const extra = (
      <Button type="primary" onClick={this.showAdd}>
        <Icon type="plus" ></Icon>
        添加
      </Button>
    )

    return (
      <Card title={ title } extra={ extra }>
        <Table
          bordered
          rowKey="_id"
          dataSource={parentId === 0 ? categorys : subCategorys}
          columns={this.columns}
          pagination={{defaultPageSize: 5, showQuickJumper: true}}
          loading={loadingIsVisibile}
        />
        <Modal
          title="添加分类"
          visible={showStatus === 1}
          onOk={this.addCategeory}
          onCancel={this.handleCancel}
        >
          <AddForm></AddForm>
        </Modal>
        <Modal
          title="更新分类"
          visible={showStatus === 2}
          onOk={this.updateCategeory}
          onCancel={this.handleCancel}
        >
          <UpdateForm categoryName={''}></UpdateForm>
        </Modal>
      </Card>
    )
  }
}
