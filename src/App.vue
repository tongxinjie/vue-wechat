<template>
  <div id="app">
    <div class="newMsg" v-show="this.$store.state.showToast">
          <ul>
            <li v-for="(user,index) in newMsg" :key="index" v-show="index===newMsg.length-1" @click="gotoChatroom(user)">
              <div class="newMsgTop">
                <div>
                <img src="/static/微信.png" height="18" width="18" style="padding-right:10px">
                <span>微信</span>
                </div>
                <span style = "color:gray">现在</span>
              </div>
              <div class="newMsgContent">
                <div style="font-size:14px">
                  <div v-if="!user.isgroup">
                    <p >{{user.fromname}}</p>
                    <span  v-show="user.text">{{user.msg}}</span>
                    <span  v-show="!user.text">[图片]</span>
                  </div>

                  <div v-if="user.isgroup">
                  <p >群聊消息</p>
                   <span  v-show="user.text">{{user.fromname}}：{{user.msg}}</span>
                    <span  v-show="!user.text">{{user.fromname}}：[图片]</span>
                  </div>

                  <div class="restinfo">
                  <span v-if="newMsg.length-1!==0">还有{{newMsg.length-1}}个通知</span>
                  </div>
                </div>
                <img :src="'/static/uploads/'+user.avatar" height="30" width="30" style="border-radius:5px">
              </div>
            </li>
          </ul>
        </div>
       <div>
         <!-- <keep-alive> -->
        <router-view v-if = "isRouterAlive"></router-view>
        <!-- </keep-alive> -->
       </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import qs from 'qs'
import { setTimeout } from 'timers'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload,
      setGlobalWebsocket: this.setGlobalWebsocket
    }
  },
  data () {
    return {
      // newMsg: [],
      imgpath: '',
      myimgPath: '../../../static/uploads/',
      convertlist: [],
      arr: [],
      jsonmsg: {},
      isRouterAlive: true

    }
  },
  watch: {
  },

  methods: {

    gotoChatroom (user) {
      console.log('user', user)
      if (!user.isgroup) {
        this.$router.push({path: '/chatroom',
          query: {
            friendname: user.fromname,
            friendid: user.fromid,
            friendheader: user.avatar,
            frompath: '/chat',
            isgroup: 0

          }})
      } else {
        axios.post('/api/getGroupName', qs.stringify({groupid: user.tomsg}))
          .then((res) => {
            console.log(res)
            this.$router.push({path: '/chatroom',
              query: {
                friendname: res.data,
                friendid: user.tomsg,
                friendheader: user.avatar,
                frompath: '/chat',
                isgroup: 1

              }})
          })
      }

      // this.$store.commit('unshowToast')
    },

    reload () {
      this.isRouterAlive = false
      this.$nextTick(
        function () {
          this.isRouterAlive = true
        }
      )
    },

    setGlobalWebsocket () {
      setTimeout(() => {
        let that = this
        console.log('get ws in app.', that.global.ws)
        that.global.ws.onmessage = that.websockonmessage
      }, 400)
    },

    initWebSocket: function () {
      let that = this
      if (this.$store.state.token) {
        that.websock = new WebSocket('ws://localhost:8069/websocket/' + this.$store.state.myid)
        that.global.setWs(that.websock)
        that.websock.onopen = function () {
          console.log('WebSocket连接成功，状态码：' + that.websock.readyState)
        }
        // that.websock.onerror = this.websocketonerror
        that.websock.onclose = function () {
          console.log('连接已关闭...')
          setTimeout(() => {
            that.initWebSocket()
          }, 1000)
        }
        // that.websock.onmessage = function (e) {
        //   console.log('app-event-data', e.data)
        // }
        that.websock.onclose = function (e) {
          console.log('websocket连接关闭')
        }
        // window.onbeforeunload = this.onbeforeunload

        // console.log('app.vue:', that.websock)
      } else {
        console.log('无用户登录')
        setTimeout(() => {
          that.initWebSocket()
        }, 2000)
      }
    },
    websockonmessage (e) {
      console.log('app-onmessage')
      var a = JSON.parse(e.data)
      console.log('app', a)
      axios.post('/api/MsgFrom', qs.stringify({fromid: a.frommsg}))
        .then((res) => {
          console.log('res-app:', res)
          this.$store.commit('setMsgToast', {res, a})
          this.jsonmsg.fromid = a.frommsg
          this.jsonmsg.isgroup = a.isgroup
          this.jsonmsg.tomsg = a.tomsg
          this.jsonmsg.msg = a.msg
          this.jsonmsg.time = a.time
          this.jsonmsg.text = parseInt(a.text)
          // this.jsonmsg.avatar = a.avatar
          this.$store.commit('showToast')
          // this.showToast = 1
          if (this.$store.state.showToast) {
            setTimeout(() => {
              this.$store.commit('unshowToast')
            }, 3000)
          }
        })

      console.log('that', this.$store.state.newMsg)
      setTimeout(() => {
        this.$store.commit('setNewmsg', this.jsonmsg)
      }, 405)
    }
  },
  created () {
    this.initWebSocket()
  },
  computed: {
    ...mapState(['newMsg'])
  },
  mounted () {
    this.setGlobalWebsocket()
  }
}
</script>

<style lang="less">

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video  {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;

}

body {
  line-height: 1;
  font-family: 'Avenir Next','Lantinghei SC';
}
// ol, ul {
//   list-style: none;
// }

#app{
  height: 100%;
}

.newMsg{
  position: fixed;
  top: 2px;
  left: 5px;
  right: 5px;
  background-color: rgb(250, 250, 250);
  padding: 10px;
  border: 1px solid rgba(153,153,153,0.4);
  border-radius: 10px;
  z-index: 9999;
}
.newMsgTop{
  display: flex;
  align-items: center;
  padding-bottom: 6px;
  font-size: 13px;
  justify-content: space-between;
}
.newMsgContent{
  display: flex;
  justify-content: space-between;
}

.newMsgContent p{
   font-weight: bold;
   padding-bottom:8px
}

.restinfo{
  padding-top:10px;
  font-size: 12px;
  color: gray
}

</style>
