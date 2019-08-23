// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import animate from 'animate.css'
import VueScroller from 'vue-scroller'
import VueResource from 'vue-resource'
import axios from 'axios'
import global from './global'
import store from './store'
import moment from 'moment/moment'
import qs from 'qs'
// import {getRefreshToken, isRefreshTokenExpired} from './format'
Vue.filter('moment', function (value, formatString) { formatString = formatString || 'MM-DD HH:mm'; return moment(value).format(formatString) })
// inject:['reload']
// Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(animate)
Vue.use(VueScroller)
Vue.use(VueResource)
Vue.prototype.global = global

router.beforeEach((to, from, next) => {
  if (to.meta.req) {
    if (sessionStorage.getItem('token')) {
      console.log('已登录')
      next()
    } else {
      console.log('未登录', sessionStorage.getItem('token'))
      next({path: '/login'})
    }
  } else {
    next()
  }
})

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     next()
//   } else {
//     let token = localStorage.getItem('token')
//     console.log('token', token)
//     if (token === 'null' || token === '') {
//       next({path: '/login'})
//     } else {
//       next()
//     }
//   }
// })
// inject: { 'reload' }
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common['token'] = store.state.token
window.isReresh = false
// 添加请求拦截器
axios.interceptors.request.use(config => {
  if (store.state.token) {
    config.headers.common['token'] = store.state.token
  }
  return config
},
error => {
  return Promise.reject(error)
}

)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    console.log('response', response)
    // let resetTime = 1
    // // console.log('resetTime', resetTime)
    // let token = sessionStorage.getItem('token')
    // if (token) {
    //   isRefreshTokenExpired(resetTime)
    //   if (resetTime < 10) {
    //     if (!window.isReresh) {
    //       window.isReresh = true
    //       axios.post('api/refreshToken', qs.stringify({refreshToken: token}))
    //         .then((res) => {
    //           console.log('res', res)
    //         })
    //     }
    //   } else window.isReresh = false
    // }
    // console.log(response.data.errCode)

    if (response.data.errCode === '401') {
      console.log(response.data.errCode)
      let token = sessionStorage.getItem('token')
      if (token) {
        axios.post('api/refreshToken', qs.stringify({refreshToken: token}))
          .then((res) => {
            console.log('res', res)
            if (res.data) {
              // console.log('token更新')
              let newToken = res.data.refreshToken
              store.state.token = newToken
              sessionStorage.setItem('token', newToken)
              router.go(0)
              // location.reload()
            } else {
              store.state.token = ''
              sessionStorage.setItem('token', '')
              router.push({
                path: '/login'
              })
            }
          })
      }
    }
    return response
  },
  error => {
    console.log('error', error.response)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.state.token = ''
          sessionStorage.setItem('token', '')
          router.push({
            path: '/login'
          }
          )
      }
    }
    return Promise.reject(error.response.data)
  })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})
