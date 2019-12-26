// 统一接口函数
import jsonp from 'jsonp'
import ajax from './ajax'
import { message } from 'antd'

const BASE = ''
// 登录
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')
// 添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')
// jsonp请求的接口函数封装
export function reqWeather(city) {
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
  return new Promise((resolve, reject) => {
    jsonp(url, {
      param: 'callback'
    }, (error, response) => {
      if (!error && response.status === 'success') {
        const { dayPictureUrl, weather } = response.results[0].weather_data[0]
        resolve({ dayPictureUrl, weather })
      } else {
        message.error('获取天气信息失败')
      }
    })
  })
}

// 获取一级/二级分类的列表
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', { parentId })
// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', { categoryName, parentId }, 'POST')
// 更新分类
export const reqUpdateCategory = ( {categoryId, categoryName} ) => ajax(BASE + '/manage/category/update', { categoryId, categoryName }, 'POST')
