import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'

Vue.use(Vuex) // 注册插件vuex

const store = new Vuex.Store({
  state: {
    myname: sessionStorage.getItem('myname'),
    myid: sessionStorage.getItem('myid'),
    myimg: sessionStorage.getItem('myimg'),
    newMsg: [],
    wsId: '',
    token: sessionStorage.getItem('token'),
    // 好友名片信息
    friendid: '',
    friendname: '',
    friendimg: '',
    friendloc: ''
  },

  mutations: {
    friendinfo: (state, payload) => {
      state.friendname = payload.loginName
      state.friendid = payload.wechatId
      state.friendimg = '../../static/uploads/' + payload.avatar
      state.friendloc = payload.location
    },
    changeLogin: (state, payload) => {
      console.log('store', payload)
      state.token = payload
      sessionStorage.setItem('token', payload)
    },
    getNewMsg: (state, res) => {
      // console.log('done')
      state.newMsg = res
      console.log('newmsg', res)
    },
    clean: (state) => {
      // state.weId = ''
      sessionStorage.removeItem('myid')
      state.token = ''
      sessionStorage.setItem('token', '')
    },

    del_token: (state) => {
      state.token = ''
      sessionStorage.setItem('token', '')
    },

    init: (state, res) => {
      state.token = res.token
      sessionStorage.setItem('token', res.token)
      sessionStorage.setItem('myname', res.username)
      sessionStorage.setItem('myid', res.wechatid)
      sessionStorage.setItem('myimg', res.avatar)
    },
    change: (state, payload) => {
      console.log('mutation:', payload)
      state.myname = payload
      sessionStorage.setItem('myname', payload)
      // state.myid
      let jsoninput = {in: state.myname, id: sessionStorage.getItem('myid')}
      // 后台请求
      axios.post(
        'api/changeName'
        , qs.stringify(jsoninput)
      )
        .then((res) => {
          console.log('modify-data:', res.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    changeheader: (state, payload) => {
      console.log('mutation:', payload.name)
      sessionStorage.setItem('myimg', payload.name)
    },

    islogin: (state, payload) => {
      if (payload) {
        sessionStorage.setItem('logged', true)
      } else {
        sessionStorage.setItem('logged', '')
      }
    }

  }
})

export default store
