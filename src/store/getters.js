// 根getters数据
// 目的： 通过根getters去获取子模块的state的数据，将其变成根getters的数据
// 通俗称之为：建立对子模块state的快捷访问
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device
}
export default getters
