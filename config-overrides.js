const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override (
  // 针对antd实现按需打包加载
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  // 加入LessLoader
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color' : '#1DA57A' }
  })
)