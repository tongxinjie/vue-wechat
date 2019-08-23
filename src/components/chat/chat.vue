<template>
  <div class="chatt">
    <div class="chat-headerr">
      <img src="../../assets/添加.png" />
            <p>微信</p>
      <input type="text" ref="sTest" placeholder="搜索">
      </div>
          <div v-for="info in Getlist" :key="info.id">
              <!-- <chatblc :blcdata="info"></chatblc> -->
              <!-- 头像 -->
                <div class='chat-wrapperr'>
                  <div  class="itemm">
                <ul>
              <div class='itemm-cell' @click='Enterroom(info)'>
                  <div class="img-unread">
                <img class="itemm-img" :src="'../../../static/uploads/'+info.avatar" height="50" width="50" />
                <span v-show="info.unread">{{info.unread}}</span>
              </div>
              <h2 class="wechattname">{{info.loginName}}</h2>
                <p v-show="info.text" class="msgg">{{info.msg}}</p>
                <p v-show="!info.text" class="msgg">[图片]</p>
              <span class="itemm-time">{{info.time|moment}}</span>
              </div>
              </ul>
              </div>
              </div>
          </div>
     <div class="bottom-margin"></div>
<div><tabbar></tabbar></div>

  </div>

</template>
<script>
import tabbar from '../../Tabbar'
import axios from 'axios'
import qs from 'qs'
export default {

  // beforeRouteEnter (to, from, next) {
  //   next(vm => vm.setData())
  //   console.log('before-route-enter')
  // },

  computed: {

  },
  components:
    {
      tabbar
    },

  mounted () {
    setTimeout(() => {
      let that = this
      this.websocket = that.global.ws
      console.log('get ws in chat page.', that.global.ws)
      if (this.websocket.readyState === 1) {
        this.websocket.send(JSON.stringify(this.content))
      }
      this.websocket.onmessage = this.websocketonmessage
    }, 500)
  },

  created () {
    this.content.msg = ''
    this.content.frommsg = ''
    this.content.tomsg = 'chatlist'
    this.content.text = ''
    // console.log('store.state.token', this.$store.state.token)

    // 后台请求
    this.info.myid = sessionStorage.getItem('myid')
    axios.post(
      'api/getList', qs.stringify(this.info)
    )
      .then((res) => {
        console.log(res)
        this.setDatalist(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  methods: {

    // setData () {

    // }

    Enterroom (info) {
      console.log(info)
      this.arr.push({
        wechatid: info.wechatId,
        host: sessionStorage.getItem('myid')
      })

      // console.log(this.blcdata)
      axios.post(
        'api/setUnread'
        , qs.stringify(this.arr[0])
      )
        .catch((error) => {
          console.log(error)
        })
      this.$router.push({path: '/chatroom', query: {userinfo: info}})
    },
    websocketonmessage (e) {
      // console.log('chat', e)
      if (e.data) {
        this.jsonmsg = JSON.parse(e.data)
        console.log(this.jsonmsg)
        for (let i = 0; i < this.Getlist.length; i++) {
          if (this.jsonmsg.frommsg === this.Getlist[i].wechatId) {
            this.Getlist[i].unread += 1
            this.Getlist[i].msg = this.jsonmsg.msg
            this.Getlist[i].text = parseInt(this.jsonmsg.text)
            this.Getlist[i].time = this.jsonmsg.time
          }
        }
        // console.log(this.newMsg)
      }
    },
    setDatalist (res) {
      // console.log(res.data)
      for (let i = 0; i < res.length; i++) {
        this.Getlist.push({
          avatar: res[i].avatar,
          loginName: res[i].loginName,
          unread: res[i].datacount,
          wechatId: res[i].wechatId,
          time: res[i].time,
          msg: res[i].msg,
          text: res[i].text
        })
      }
    }

  },

  data () {
    return {

      Getlist: [],
      lists: [],
      info: {myid: ''},
      userinfo: {wechatid: ''},
      userstr: '',
      chatstr: '',
      userjson: [],
      chatjson: [],
      generateList: [],
      content: {msg: '', frommsg: '', tomsg: '', text: 0},
      jsonInfo: {},
      arr: [],
      newMsg: []

    }
  }

}
</script>

<style lang="less" scoped>
.bottom-margin{
  height: 150px;
  // background: #fff
  //  background-color:  rgba(233,233,234,1);
}

.chatt{
    // position: relative;
    height: 100vh;
    width: 100vw;
    background-color:  rgba(233,233,234,0.8);

  }
.chat-headerr{
  position: fixed;
  top:0px;
  height:100px;
  width: 100%;
  background-color:  rgba(233,233,234,1);
  z-index:999;

 }

 .chat-headerr input{
    height: 25px;
    margin-top: 30px;
    border: 0;
    border-radius: 5px;
    width: 97%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

 .chat-headerr p{
 color: black;
  text-align: center;
  font-size: 18px;
  padding-top: 14px;
  padding-left: 14px;
 }

 .chat-headerr img{
  position: absolute;
    height: 20px;
    width: 20px;
    top: 15px;
  right: 18px;

 }

    .chat-wrapperr{
    position:relative;
    height: 100%;
    overflow: hidden;
    top: 100px;
    /* z-index: 1; */

  }

  .itemm{
    width: 100%;
    margin-left: 0;
  }

 .itemm-img{
    float: left;
    margin:10px 10px 10px 10px;
    border-radius: 5px;
  }
  .wechattname{
    font-size: 15px;
    padding-top: 14px;
    padding-left: 80px;
  }
  .msgg{
    font-size: 14px;
    padding-top: 13px;
    padding-left: 80px;
    color: rgba(153,153,153,0.8);
  }
  .itemm-time{
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 12px;
    color: rgba(153,153,153,0.8);
  }

  .itemm-cell{
    position: relative;
    border-bottom: 1px solid rgba(153,153,153,0.4);
    height: 70px;
    background-color: #fff;
  }
  .img-unread{
    position: relative;
  }
  .img-unread span{
    position: absolute;
    top: 3px;
    left: 53px;
    font-size: 10px;
    line-height: 15px;
    color: #fff;
    height: 15px;
    width: 15px;
    text-align: center;
    vertical-align: middle;
    background-color: red;
    border-radius: 50%;
  }
</style>
