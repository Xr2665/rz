import Vue from 'vue'
// 引入重置样式(第三方)
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// 导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入语言包
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
// 导入自定义全局样式
import '@/styles/index.scss' // global css
// 导入根组件
import App from './App'
// 导入仓库
import store from './store'
// 导入路由
import router from './router'
// 导入SVG图标
import '@/icons' // icon
// 导入导航守卫函数
import '@/permission' // permission control

// Mock模拟数据
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// 安装element-ui并且配置其语言包
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
