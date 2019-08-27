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
    Fulllist: [],
    token: sessionStorage.getItem('token'),
    showToast: ''

  },

  mutations: {

    showToast: (state) => {
      state.showToast = 1
    },

    unshowToast: (state) => {
      state.showToast = ''
    },

    setMsgToast: (state, data) => {
      console.log('res', data.res)
      console.log('a', data.a)
      state.newMsg.push({
        fromname: data.res.data.fromname,
        avatar: data.res.data.avatar,
        msg: data.a.msg,
        time: data.a.time,
        text: parseInt(data.a.text),
        fromid: data.a.frommsg
      })
    },

    cleanMsgToast: (state) => {
      state.newMsg = []
    },

    setNewmsg: (state, payload) => {
      console.log('payload', payload.fromid)
      console.log(state.Fulllist)
      for (let i = 0; i < state.Fulllist.length; i++) {
        console.log('state.newMsg.fromid', payload.fromid)
        if (payload.fromid === state.Fulllist[i].wechatId) {
          console.log('haha--------')
          state.Fulllist[i].unread += 1
          state.Fulllist[i].msg = payload.msg
          state.Fulllist[i].text = parseInt(payload.text)
          state.Fulllist[i].time = payload.time
        }
      }
      console.log('2:', state.Fulllist)
    },

    setGetlist: (state, payload) => {
      state.Fulllist = payload
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

    init: (state, res) => {
      state.token = res.token
      state.myid = res.wechatid
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
