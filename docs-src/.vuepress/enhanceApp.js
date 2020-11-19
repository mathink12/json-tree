import ElementUI from 'element-ui'
// import JsonTree from '@lib/JsonTree.common.js'
import JsonTree from '@/json-tree/JsonTree.vue'

import 'element-ui/lib/theme-chalk/index.css'
// import "@lib/JsonTree.css"

// 使用异步函数也是可以的
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
  isServer // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  Vue.use(ElementUI)
  Vue.component('JsonTree', JsonTree)
}
