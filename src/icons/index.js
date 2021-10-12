// 导入vue
import Vue from 'vue'
// 导入SvgIcon组件
import SvgIcon from '@/components/SvgIcon'//

// 注册为全局组件
Vue.component('svg-icon', SvgIcon)

// require.context(路径，是否遍历底层所有,匹配规则)
// 找到当前目录下的svg文件阿基，找到后缀为svg的文件，全部读取出来
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
