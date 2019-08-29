<template>
  <div class="chatt">
    <div class="chat-headerr">
      <img src="../../assets/添加.png" @click="showMore"/>
            <p>微信</p>
      <input type="text" ref="sTest" placeholder="搜索" >
      </div>
      <div class="showTop" v-show="showTop">
        <div class="arrow"></div>
      <div class="topText">
        <img class="topIcon" src="../../assets/chat/发起群聊.png" />
        <span>发起群聊</span>
      </div>
      <div class="topText" @click="gotoAdd">
        <img class="topIcon" src="../../assets/chat/添加好友.png" />
        <span>添加朋友</span>
      </div>
      <div class="topText">
        <img class="topIcon" src="../../assets/chat/扫一扫.png" />
        <span>扫一扫</span>
      </div>
      <div class="topText">
        <img class="topIcon" src="../../assets/chat/收付款.png" />
        <span>收付款</span>
      </div>
    </div>
          <div v-for="info in this.$store.state.Fulllist" :key="info.id">
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

  },

  created () {
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

    gotoAdd () {
      this.$router.push({
        path: '/addfriend'
      })
    },

    showMore () {
      this.showTop = !this.showTop
    },
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
      this.$router.push({path: '/chatroom',
        query: {
          friendheader: info.avatar,
          friendname: info.loginName,
          friendid: info.wechatId,
          friendloc: info.location,
          frompath: '/chat'
        }})
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
      this.$store.commit('setGetlist', this.Getlist)
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
      newMsg: [],
      showTop: false

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
  z-index:99;

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

  }

  .itemm{
    width: 100%;
    // margin-left: 0;
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
    padding-top: 12px;
    padding-left: 80px;
    padding-right: 50px;
    color: rgba(153,153,153,0.8);
    // overflow: hidden;
    // white-space: nowrap;
    // text-overflow: ellipsis;
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

  .showTop{
    position: fixed;
    top: 50px;
    right: 8px;
    width: 150px;
    background-color: rgb(63, 63, 63);
    border-radius: 6px;
    z-index: 100;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.76);
  }

  .arrow{
position:absolute;
top:-15px;
right:11px; /* 圆角的位置需要细心调试哦 */
width:0;
height:0;
font-size:0;
border-right: 8px solid transparent;
border-bottom: 8px solid rgba(63,63,63);
border-left: 8px solid transparent;
border-top: 8px solid transparent;
  }
  .topIcon{
    margin-right: 20px;
    height: 20px;
    width: 20px;
  }
  .topText{
    width: 100%;
    display: flex;
    padding: 10px 18px;
    align-items: center;
    border-bottom: 0.01mm solid #ffffff;
  }
</style>
