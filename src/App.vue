<template>
  <div id="app">
       <div>
         <!-- <keep-alive> -->
        <router-view v-if = "isRouterAlive"></router-view>
        <!-- </keep-alive> -->
       </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      newMsg: [],
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

    reload () {
      this.isRouterAlive = false
      this.$nextTick(
        function () {
          this.isRouterAlive = true
        }
      )
    },

    initWebSocket: function () {
      let that = this
      that.websock = new WebSocket('ws://localhost:8069/websocket/' + sessionStorage.getItem('myid'))
      that.websock.onopen = that.websocketonopen
      that.websock.onerror = that.websocketonerror
      // that.websock.onmessage = that.websocketonmessage
      that.websock.onclose = that.websocketclose
      window.onbeforeunload = that.onbeforeunload
      that.global.setWs(that.websock)
      console.log('app.vue:', that.websock)
    },
    websocketonopen: function () {
      console.log('WebSocket连接成功~~~')
    },
    websocketonerror: function (e) {
      console.log('WebSocket连接发生错误')
    },

    websocketonmessage: function (e) {
      if (e.data !== '') {
        console.log('event-data', e.data)
        this.jsonmsg = JSON.parse(e.data)
        // console.log('onmessage:', this.jsonmsg.text)
        if (this.jsonmsg.text) {
          console.log('onmessage:', sessionStorage.getItem('myid'))
          if (this.jsonmsg.frommsg !== sessionStorage.getItem('myid')) {
            this.newMsg.push({
              label: false,
              msg: this.jsonmsg.msg,
              text: 1
            })
          } else {
            this.newMsg.push({
              label: true,
              msg: this.jsonmsg.msg,
              text: 1
            })
          }
        } else {
          if (this.jsonmsg.frommsg !== sessionStorage.getItem('myid')) {
            this.newMsg.push({
              label: false,
              msg: this.jsonmsg.msg,
              text: 0
            })
          } else {
            this.newMsg.push({
              label: true,
              msg: this.jsonmsg.msg,
              text: 0
            })
          }
        }
        console.log(this.newMsg)
      }
    },
    // websocketonmessage: function (e) {
    //   if (e.data !== '') {
    //     console.log('event-data', e.data)
    //     this.jsonmsg = JSON.parse(e.data)
    //     // console.log('onmessage:', this.jsonmsg.text)
    //     if (this.jsonmsg.text) {
    //       console.log('onmessage:', sessionStorage.getItem('myid'))
    //       if (this.jsonmsg.frommsg !== sessionStorage.getItem('myid')) {
    //         this.newMsg.push({
    //           label: false,
    //           msg: this.jsonmsg.msg,
    //           text: 1
    //         })
    //       } else {
    //         this.newMsg.push({
    //           label: true,
    //           msg: this.jsonmsg.msg,
    //           text: 1
    //         })
    //       }
    //     } else {
    //       if (this.jsonmsg.frommsg !== sessionStorage.getItem('myid')) {
    //         this.newMsg.push({
    //           label: false,
    //           msg: this.jsonmsg.msg,
    //           text: 0
    //         })
    //       } else {
    //         this.newMsg.push({
    //           label: true,
    //           msg: this.jsonmsg.msg,
    //           text: 0
    //         })
    //       }
    //     }
    //     console.log(this.newMsg)
    //     this.$store.commit('getNewMsg', this.newMsg)
    //   }
    //   // this.msg_data.unshift(da)
    // },
    websocketclose: function (e) {
      console.log('websocket连接关闭')
    },
    onbeforeunload () {
      this.websocketclose()
    },

    websocketsend (Data) { // 数据发送
      this.websock.send(Data)
    }

  },
  created () {
    if (sessionStorage.getItem('myid')) {
      // console.log('appid:', this.wsId)
      this.initWebSocket()
    }
  },
  computed: {
    ...mapState(['wsId'])
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

    // @import "assets/css/base.css";
    // @import "assets/css/common.css";
    // @import "assets/css/wx-header.css";
    // /*阿里 fonticon*/

    // @import "assets/css/lib/iconfont.css";
    // /*过渡效果需要的动画库*/

    // @import "assets/css/lib/animate.css";
    // /*weui 样式库 非常适合高仿微信*/

    // @import "assets/css/lib/weui.min.css";
      // @import "../../assets/css/wx-nav.css";
</style>
