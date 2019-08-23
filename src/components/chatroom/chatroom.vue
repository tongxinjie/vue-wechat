<template>

        <div class = "chatroom" >
            <div class="cheader">
            <div class="chtext">{{wechatname}}</div>
          </div>
          <div @click="backToChat">
           <img
            class="cback"
            src="../../assets/返回2.png" />
          </div>

          <div class="content-chat" id = 'chatRecord'>
              <ul v-for="item in convertlist" :key="item.id">
                <li :class= "item.label ? 'ask' : 'reply'">
                  <div v-if="item.label">
                   <img :src="imgpath" class="askimg"/>
                  </div>
                  <div v-else>
                    <img :src="img" class="replyimg"/>
                  </div>
                  <div v-if="item.text">
                  <p>{{item.msg}}</p>
                  </div>
                  <div v-else>
                      <img :src="'../../../static/chatroom/' + item.msg" class="sendimg"/>
                  </div>
                </li>

              </ul>
                <div class="content-top">
                <p>------------以上是历史消息-------------</p>
            </div>
            <div style="height:10px"></div>
            <div>

              <div v-show="newMsg">
                <ul v-for="msg in newMsg" :key= msg.id>
                 <li :class= "msg.label ? 'ask' : 'reply'">
                 <div v-if="msg.label" >
                   <img :src="imgpath" class="askimg"/>
                  </div>
                  <div v-else>
                    <img :src="img" class="replyimg"/>
                  </div>
                  <div>
                  <p v-if="msg.text">{{msg.msg}}</p>
                  <img v-else :src="msg.msg" class="sendimg"/>
                  </div>
                 </li>
               </ul>
              </div>
            </div>
            <div style="height:50px "></div>
            <div v-show="addPicture">
            <div style="height:215px "></div>
            </div>
            <div v-show="addGif">
            <div style="height:215px "></div>
            </div>
            </div>

          <div class="bottom" id="bottom">
            <div class="send">
              <img src="../../assets/语音切换.png" class="convert"/>
              <input type="text" class="csText" ref="sTest" @keyup.enter="Sendmessage">
             <img src="../../assets/表情1.png" class="smile" @click="addGifImg"/>
             <img src="../../assets/添加.png" class="addnew" @click="addPic"/>
            </div>

            <div v-show="addPicture" class="bottompop">
            <div class="send">
              <img src="../../assets/语音切换.png" class="convert"/>
              <input type="text" class="csText" ref="sTest1" @keyup.enter="Sendmessage">
             <img src="../../assets/表情1.png" class="smile" @click="addGifImg"/>
             <img src="../../assets/添加.png" class="addnew" @click="addPic"/>
            </div>
            <div class="zz_file">
              <div>
                <input @change="OpenAlbum" type="file" ref="imgfile" name="imgfile" id="imgfile" accept="image/jpeg,image/png,image/jpg,image/gif" />
                <p>照片</p>
              </div>
              <div>
                <img src="../../assets/聊天室/拍摄.png"/>
                <p>拍摄</p>
              </div>
               <div>
                  <img src="../../assets/聊天室/视频.png"/>
                    <p>视频通话</p>
               </div>
               <div>
                 <img src="../../assets/聊天室/定位.png"/>
                  <p>位置</p>
               </div>
            </div>
            <div class="zz_file">
              <div>
                <img src="../../assets/聊天室/红包.png"/>
                <p>红包</p>
              </div>

              <div>
                <img src="../../assets/聊天室/转账.png"/>
                <p>转账</p>
              </div>

              <div>
                 <img src="../../assets/聊天室/语音.png"/>
                 <p>语音输入</p>
              </div>

               <div>
                 <img src="../../assets/聊天室/收藏.png"/>
                 <p>收藏</p>
               </div>

            </div>
          </div>

          <div v-show="addGif" class="bottompop">
            <div class="send">
              <img src="../../assets/语音切换.png" class="convert"/>
              <input type="text" class="csText" ref="sTest2" @keyup.enter="Sendmessage">
             <img src="../../assets/表情1.png" class="smile" @click="addGifImg"/>
             <img src="../../assets/添加.png" class="addnew" @click="addPic"/>
            </div>

            <div class="zz_file1">
              <div v-for="img in GIF" :key="img.id">
                <img :src="img.imgpath" @click="sendGif(img.imgpath)"/>
                <p>{{img.title}}</p>
              </div>
            </div>
          </div>

          </div>

          </div>

</template>

<script>
import axios from 'axios'
import qs from 'qs'
// import { mapState } from 'vuex'
export default {
  data () {
    return {
      text: '', // 输入框的文字
      wechatname: '',
      time: '',
      img: '',
      msglist: [],
      content: {msg: '', frommsg: '', tomsg: '', text: 0, online: 0},
      newMsg: [],
      newMsglist: [],
      imgpath: '',
      myimgPath: '../../../static/uploads/',
      convertlist: [],
      arr: [],
      jsonmsg: {},
      websocket: null,
      addPicture: false,
      chatroomImgurl: '',
      addGif: false,
      GIF: [
        {
          imgpath: '../../../static/表情包/01.gif',
          title: '期待'
        },
        {
          imgpath: '../../../static/表情包/02.gif',
          title: '加油'
        },
        {
          imgpath: '../../../static/表情包/03.gif',
          title: '打哈欠'
        },
        {
          imgpath: '../../../static/表情包/04.gif',
          title: '难过'
        },
        {
          imgpath: '../../../static/表情包/05.gif',
          title: '点赞'
        },
        {
          imgpath: '../../../static/表情包/06.gif',
          title: '大哭'
        },
        {
          imgpath: '../../../static/表情包/07.gif',
          title: '洗澡'
        },
        {
          imgpath: '../../../static/表情包/01.gif',
          title: '期待'
        }

      ]
    }
  },

  beforeRouteEnter (to, from, next) {
    next(vm => vm.setData())
    console.log('before-route-enter')
  },

  created () {
    let MYIMG = sessionStorage.getItem('myimg')
    this.imgpath = this.myimgPath + MYIMG
    this.myid = sessionStorage.getItem('myid')
    let that = this
    this.websocket = that.global.ws
    this.websocket.onmessage = this.websocketonmessage
    console.log('ws:', this.websocket)
  },

  // destroyed: function () {
  //   this.websocketclose()
  // },

  // beforeDestroy () {
  //   this.onbeforeunload()
  // },
  computed: {
    // ...mapState(['newMsg'])

  },

  updated () {
    // 聊天定位到底部
    this.scrollToBottom()
  },

  methods: {

    websocketonmessage: function (e) {
      if (e.data !== '') {
        console.log('event-data', e.data)
        this.jsonmsg = JSON.parse(e.data)
        if (parseInt(this.jsonmsg.text)) {
          if (this.jsonmsg.tomsg === sessionStorage.getItem('myid') && this.jsonmsg.frommsg === this.$route.query.userinfo.wechatId) {
            this.newMsg.push({
              label: false,
              msg: this.jsonmsg.msg,
              text: 1,
              online: this.jsonmsg.online
            })
          } else if (this.jsonmsg.frommsg === sessionStorage.getItem('myid') && this.jsonmsg.tomsg === this.$route.query.userinfo.wechatId) {
            this.newMsg.push({
              label: true,
              msg: this.jsonmsg.msg,
              text: 1,
              online: this.jsonmsg.online
            })
          }
        } else {
          if (this.jsonmsg.tomsg === sessionStorage.getItem('myid') && this.jsonmsg.frommsg === this.$route.query.userinfo.wechatId) {
            this.newMsg.push({
              label: false,
              msg: this.jsonmsg.msg,
              text: 0,
              online: this.jsonmsg.online
            })
          } else if (this.jsonmsg.frommsg === sessionStorage.getItem('myid') && this.jsonmsg.tomsg === this.$route.query.userinfo.wechatId) {
            this.newMsg.push({
              label: true,
              msg: this.jsonmsg.msg,
              text: 0,
              online: this.jsonmsg.online
            })
          }
        }
        // console.log(this.newMsg)
      }
    },

    OpenAlbum () {
      var imgfile = document.getElementById('imgfile')
      let formData = new FormData()
      formData.append('file', imgfile.files[0])
      formData.append('frommsg', sessionStorage.getItem('myid'))
      formData.append('tomsg', this.$route.query.userinfo.wechatId)
      formData.append('text', 0)
      this.uploadImg(formData)
      this.$refs.imgfile.value = ''
    },
    uploadImg (formData) {
      axios.post(
        'api/insertImg', formData, {headers: {'Content-Type': 'multipart/form-data'}}
      )
        .then((res) => {
          console.log('modify-data:', res.data)
          this.chatroomImgurl = '../../../static/chatroom/' + res.data.msg
          // console.log('modify-data:', this.chatroomImgurl)
          this.content.msg = this.chatroomImgurl
          this.content.frommsg = this.arr[0].host
          this.content.tomsg = this.$route.query.userinfo.wechatId
          this.content.text = 0
          this.content.online = 1
          this.newMsg.push({
            label: true,
            msg: this.chatroomImgurl,
            text: 0,
            online: 1
          })
          // ------------- websocket ---------------------------
          this.websocket.send(JSON.stringify(this.content))
        })
    },
    addPic () {
      this.addPicture = !this.addPicture
      this.addGif = false
      // console.log(this.addGif)

      // console.log('add')
    },

    addGifImg () {
      this.addGif = !this.addGif
      this.addPicture = false
      // console.log(this.addGif)
    },

    scrollToBottom () {
      let ele = document.getElementById('chatRecord')
      document.documentElement.scrollTop = ele.scrollHeight
    },

    backToChat () {
      axios.post(
        'api/setUnread'
        , qs.stringify(this.arr[0])
      )
      this.$router.back()
      // this.$router.push({path: '/chat'})

      // this.websock.close()
    },

    setData () {
      this.arr.push({

        wechatid: this.$route.query.userinfo.wechatId,
        host: sessionStorage.getItem('myid')

      })
      // console.log('arr', this.arr)
      axios.post(
        '/api/getHistorylist'
        , qs.stringify(this.arr[0])
      )
        .then((res) => {
          if (res) {
            this.jsonInfo = res.data
            console.log('消息数：', res.data.length)
            this.wechatname = this.$route.query.userinfo.loginName
            this.img = '../../../static/uploads/' + this.$route.query.userinfo.avatar
            this.time = this.$route.query.userinfo.time
            this.msglist = this.jsonInfo
            for (let i = 0; i < this.msglist.length; i++) {
              if (this.msglist[i].frommsg !== this.$route.query.userinfo.wechatId) {
                this.convertlist.push({
                  label: true,
                  text: this.msglist[i].text,
                  msg: this.msglist[i].msg
                })
              } else {
                this.convertlist.push({
                  label: false,
                  msg: this.msglist[i].msg,
                  text: this.msglist[i].text
                })
              }
            }
          }

          // console.log('this.convertlist', this.convertlist)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    sendGif (src) {
      console.log(src)
      this.content.msg = src
      this.content.frommsg = this.arr[0].host
      this.content.tomsg = this.$route.query.userinfo.wechatId
      this.content.text = 0
      this.content.online = 1
      this.newMsg.push({
        label: true,
        msg: src,
        text: 0,
        online: 1
      })
      // ------------- websocket ---------------------------
      this.websocket.send(JSON.stringify(this.content))
      // 后台请求
      axios.post(
        'api/insertMsg'
        , qs.stringify(this.content)
      ).then((res) => {
        // console.log(res)
      })

      // var fs = require('fs')
      // var data = fs.readFileSync(src, 'utf-8')
      console.log(this.newMsg)
    },

    Sendmessage () {
      if (this.addPicture) {
        // console.log(this.addPicture)
        this.text = this.$refs.sTest1.value
      } else if (this.addGif) {
        this.text = this.$refs.sTest2.value
      } else {
        this.text = this.$refs.sTest.value
      }

      if (this.text !== '') {
        this.content.msg = this.text
        this.content.frommsg = this.arr[0].host
        this.content.tomsg = this.$route.query.userinfo.wechatId
        this.content.text = 1
        this.content.online = 1
        this.newMsg.push({
          label: true,
          msg: this.text,
          text: 1,
          online: 1
        })
        // ------------- websocket ---------------------------
        this.websocket.send(JSON.stringify(this.content))
        // 后台请求
        axios.post(
          'api/insertMsg'
          , qs.stringify(this.content)
        )
        if (this.addPicture) {
          this.$refs.sTest1.value = ''
        } else if (this.addGif) {
          this.$refs.sTest2.value = ''
        } else {
          this.$refs.sTest.value = ''
        }
      }
    }

  },

  watch: {
    // '$route': 'setData2'
  },
  mounted () {
    this.scrollToBottom()

    // if ('WebSocket' in window) {
    //   this.initWebSocket()
    // } else {
    //   alert('当前浏览器 Not support websocket')
    // }
  }

}

</script>

<style scoped>

.chatroom{
    position: relative;
    height: 100vh;
    width: 100vw;
    background-color:#fff;
    /* background-color: rgba(233,233,234,0.5); */
}

 .cheader{
  position: fixed;
  top:0px;
  height: 50px;
  color: black;
  width: 100%;
  text-align: center;
  background-color: rgba(233,233,234,1);
  border-bottom: 0.5px solid rgba(153,153,153,0.4);
  z-index: 1000;
 }
 .chtext{

  font-size: 18px;
  padding-top: 14px;
  padding-left: 14px;
 }
 .cback{
    position: fixed;
    height: 20px;
    width: 20px;
    top: 15px;
    left: 10px;
    z-index: 1000;

 }

  .content-top{
    font-size: 14px;
    color: rgba(153,153,153,1);
    text-align: center;
    margin-top: 15px;
     /* background-color: rgba(233,233,234,1); */

  }
  .content-chat{
    position: relative;
    overflow: hidden;
    padding: 30px 10px;
    top:50px;
    /* bottom:100px; */
     /* background-color: rgba(233,233,234,0.5); */

  }
  .content-chat li {
    position: relative;
    overflow: hidden;
    margin-bottom: 15px;
    line-height: 28px;
     /* background-color: rgba(233,233,234,0.5); */
  }
  .ask {
    text-align: right;
    overflow: hidden;
    margin-bottom: 15px;
    line-height: 28px;
    }

  .reply {
    text-align: left;
    overflow: hidden;
    margin-bottom: 15px;
    line-height: 28px;

  }
  .askimg {
    float: right;
    margin-left: 15px;
    width: 35px;
    height: 35px;
    border-radius: 5px;
  }
  .replyimg {
    float: left;
    margin-right: 15px;
    width: 35px;
    height: 35px;
    border-radius: 5px;
  }

  .sendimg{

    /* width: 100px; */
    height: 100px;
    border-radius: 5px;

  }

  .zz_file{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 20px 10px 20px 10px;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
  }

  .zz_file input{

  background: url(../../assets/聊天室/图片.png) no-repeat;
  background-size: 100% 100%;
  height: 55px;
  width:55px;
}

.zz_file input::-webkit-file-upload-button {

  border: none;
  position: absolute;
  outline: 0;
  opacity: 0;
}
.zz_file img{
  /* padding-left:10px; */
  height: 55px;
  width:55px;

}
.zz_file p{
   text-align: center;
   font-size: 13px;
   padding-top: 10px;
   color: rgb(85, 86, 87)

}

 .zz_file1{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 20px 10px 20px 10px;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
  }
.zz_file1 img{
  padding-left:5px;
  padding-right:5px;
  height: 65px;
  width:65px;

}
.zz_file1 p{
   text-align: center;
   font-size: 13px;
   padding-top: 10px;
   color: rgb(85, 86, 87)

}

  .ask p {
    border-radius: 5px;
    text-align: left;
    font: 14px;
    line-height: 30px;
    float: right;
    padding: 3px 10px;
    max-width: 180px;
    background:  rgb(171, 230, 148);
    /* background:  rgb(37, 206, 35, 0.5); */
    color: black;

  }
  .reply p {
    border-radius: 5px;
    text-align: left;
    font: 14px;
    line-height: 30px;
    left: 2px;
    float: left;
    padding: 3px 10px;
    max-width: 180px;
    background: rgba(233,233,234,1);
    color: black;
  }

  .bottom{
    position: fixed;
    height: 55px;
    bottom: 0%;
    left: 0;
    right: 0;
    background-color: rgba(233,233,234,1);
    z-index: 99;
    /* border-bottom: 1px solid rgba(153,153,153,0.4); */
  }

.bottompop{
  position: fixed;
   bottom: 0;
  height: 280px;
  width: 100%;
  background-color: rgba(233,233,234,1);
  z-index: 100;

  }
  .send{
    /* position: fixed; */
    display: flex;
  }
  .send input{
    -webkit-appearance:none;
  }
  .convert{
    padding-top:13px;
    padding-left: 10px;
    height: 27px;
    width: 27px;
  }

  .smile{
    height: 27px;
    width: 27px;
    padding-top:13px;
    padding-right: 10px;
  }

  .addnew{
    height: 25px;
    width: 25px;
    padding-top:13.5px;
    padding-right: 8px;
  }
  .csText{
    flex: 6;
    height: 30px;
    margin: 10px;
    border: 0;
    padding-left: 8px;
    border-radius: 5px;
    font-size: 15px;
  }
  /* .csText.active{
    background-color: gray;
  } */
  .cbtn{
    flex: 1;
    width: 65px;
    height: 30px;
    margin: 10px 10px;
    border: 0;
    border-radius: 5px;
    text-align: center;
    font-size: 15px;
    color: white;
    background-color: gray;
  }

</style>
