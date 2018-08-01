import Vue from 'vue'
import App from './App'
import '@/assets/common.css'
import '@/assets/stylus/index.styl'
import Axios from 'axios'
Vue.prototype.$http = Axios // 类似于vue-resource的调用方法，之后可以在实例里直接用this.$http.get()等

import store from '@/store'
Vue.prototype.$store = store

Vue.config.productionTip = false
App.mpType = 'app'


// 拦截器
// router.beforeEach((to,from,next) =>{
//   const token = wx.getStorageSync('demo-token');
//   if(to.path == '/'){ // 如果是跳转到登录页的
//     if(token != 'null' && token != null){
//       next('/todolist') // 如果有token就转向todolist不返回登录页
//     }
//     next(); // 否则跳转回登录页
//   }else{
//     if(token != 'null' && token != null){
//       Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token; // 全局设定header的token验证，注意Bearer后有个空格
//       next() // 如果有token就正常转向
//     }else{
//       next('/') // 否则跳转回登录页
//     }
//   }
// })
// const token =wx.getStorageSync('demo-token');
// if(token != 'null' && token != null){
//   wx.request.defaults.headers.common['Authorization'] = 'Bearer ' + token;
// }


const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/login/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    'tabBar': {
      selectedColor: '#EA5149',
      list: [
        {
          pagePath: 'pages/login/main',
          text: '登陆',
          iconPath: 'static/images/tab_my.png',
          selectedIconPath: 'static/images/tab_active_my.png'
        },
        {
          pagePath: 'pages/success/main',
          text: '我',
          iconPath: 'static/images/tab_home.png',
          selectedIconPath: 'static/images/tab_active_home.png'
        }
      ]
    }
  }
}
