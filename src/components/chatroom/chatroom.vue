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

          <div class="content-chat" id = 'chatRecord' @click="unshow">
              <ul v-for="item in convertlist" :key="item.id">
                <li :class= "item.label ? 'ask' : 'reply'">
                  <div v-if="item.label">
                   <img :src="imgpath" class="askimg"/>
                  </div>
                  <div v-else>
                    <img :src="img" class="replyimg"/>
                  </div>
                  <div v-if="item.text">
                  <div v-show="item.label" class="arrow"></div>
                  <div v-show="!item.label" class="arrow1"></div>
                  <p>{{item.msg}}</p>
                  </div>
                  <div v-else>
                      <img :src="'../../../static/chatroom/' + item.msg" class="sendimg"/>
                  </div>
                </li>

              </ul>
                <div class="content-top">
                <p>---------以上是历史消息----------</p>
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
                  <div v-if="msg.text">
                  <div v-show="msg.label" class="arrow"></div>
                  <div v-show="!msg.label" class="arrow1"></div>
                  <p >{{msg.msg}}</p>
                  </div>
                  <div  v-else>
                  <img :src="msg.msg" class="sendimg"/>
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
              <input type="text" class="csText" ref="sTest2" v-model="textContent"  @keyup.enter="Sendmessage">
             <img src="../../assets/表情1.png" class="smile" @click="addGifImg"/>
             <img src="../../assets/添加.png" class="addnew" @click="addPic"/>
            </div>

            <div class="zz_file1" v-show="gifChannel">
              <div v-for="img in GIF" :key="img.id">
                <img :src="img.imgpath" @click="sendGif(img.imgpath)"/>
                <p>{{img.title}}</p>
              </div>
            </div>
            <div v-show="emojiChannel" class="zz_file2">
               <div v-for="(item,index) in faceList" :key="index" @click="getBrow(item)">
                  <div style="padding:3px">{{item.char}}</div>
              </div>
            </div>
            <div class="bottom-bar">
              <div class="split-bar">
              <img src='../../assets/加.png'/>
              </div>
              <div class="split-bar" @click="toemojiChannel">
              <img src="../../assets/表情1.png" style="height:20px; width:20px; padding-top:10px; padding-left: 10px;"/>
              </div>
              <div class="split-bar" @click="togifChannel">
              <img src="../../assets/哈哈.png" style="height:30px; width:30px; padding-top:6px; padding-left: 6px;"/>
              </div>

            </div>
            <div class="bottom-button">
              <input type="button" value="发送" @click="Sendmessage"/>
              </div>
          </div>

          </div>

          </div>

</template>

<script>
import axios from 'axios'
import qs from 'qs'
import {giflist} from '../gif'
import {facelist} from '../../emojis'
// const appData = require('../../emojis.json')
// import { mapState } from 'vuex'
export default {
  // components: {

  //   giflist

  // },
  inject: ['setGlobalWebsocket'],
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
      frompath: '',
      GIF: giflist,
      gifChannel: false,
      emojiChannel: true,
      faceList: facelist,
      getBrowString: '',
      textContent: ''
    }
  },

  beforeRouteEnter (to, from, next) {
    // console.log('from', from.path)
    next(vm => vm.setData())
    console.log('before-route-enter')
  },

  created () {
    let MYIMG = sessionStorage.getItem('myimg')
    this.imgpath = this.myimgPath + MYIMG
    this.myid = sessionStorage.getItem('myid')
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
    getBrow (item) {
      // console.log(index)
      this.getBrowString = item.char
      this.textContent += this.getBrowString
      // console.log(this.textContent)
    },
    togifChannel () {
      this.gifChannel = true
      this.emojiChannel = false
    },

    toemojiChannel () {
      this.gifChannel = false
      this.emojiChannel = true
    },

    websocketonmessage: function (e) {
      if (e.data !== '') {
        console.log('event-data', e.data)
        this.jsonmsg = JSON.parse(e.data)
        if (parseInt(this.jsonmsg.text)) {
          if (this.jsonmsg.tomsg === sessionStorage.getItem('myid') && this.jsonmsg.frommsg === this.$route.query.friendid) {
            this.newMsg.push({
              label: false,
              msg: this.jsonmsg.msg,
              text: 1,
              online: this.jsonmsg.online
            })
          } else if (this.jsonmsg.frommsg === sessionStorage.getItem('myid') && this.jsonmsg.tomsg === this.$route.query.friendid) {
            this.newMsg.push({
              label: true,
              msg: this.jsonmsg.msg,
              text: 1,
              online: this.jsonmsg.online
            })
          }
        } else {
          if (this.jsonmsg.tomsg === sessionStorage.getItem('myid') && this.jsonmsg.frommsg === this.$route.query.friendid) {
            this.newMsg.push({
              label: false,
              msg: this.jsonmsg.msg,
              text: 0,
              online: this.jsonmsg.online
            })
          } else if (this.jsonmsg.frommsg === sessionStorage.getItem('myid') && this.jsonmsg.tomsg === this.$route.query.friendid) {
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
      formData.append('tomsg', this.$route.query.friendid)
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
          this.content.tomsg = this.$route.query.friendid
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
      this.addPicture = true
      this.addGif = false
      // console.log(this.addGif)

      // console.log('add')
    },

    addGifImg () {
      this.addGif = true
      this.addPicture = false
      // console.log(this.addGif)
    },

    unshow () {
      this.addPicture = false
      this.addGif = false
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

      console.log(this.$route.query)

      this.$router.push({path: this.$route.query.frompath,
        query: {
          friendheader: this.$route.query.friendheader,
          friendname: this.$route.query.friendname,
          friendid: this.$route.query.friendid,
          friendloc: this.$route.query.friendloc}})

      this.$store.commit('cleanMsgToast')
      this.setGlobalWebsocket()
    },

    setData () {
      this.$store.commit('unshowToast')
      this.arr.push({
        wechatid: this.$route.query.friendid,
        host: sessionStorage.getItem('myid')

      })
      console.log('arr', this.arr)
      axios.post(
        '/api/getHistorylist'
        , qs.stringify(this.arr[0])
      )
        .then((res) => {
          if (res) {
            this.jsonInfo = res.data
            console.log('消息数：', res.data.length)
            this.wechatname = this.$route.query.friendname
            this.img = '../../../static/uploads/' + this.$route.query.friendheader
            // this.time = this.$route.query.time
            this.msglist = this.jsonInfo
            for (let i = 0; i < this.msglist.length; i++) {
              if (this.msglist[i].frommsg !== this.$route.query.friendid) {
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
      this.content.tomsg = this.$route.query.friendid
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
        console.log('ref2', this.$refs.sTest2.value)
        this.text = this.$refs.sTest2.value
      } else {
        this.text = this.$refs.sTest.value
      }

      if (this.text === '') {
        alert('输入不能为空')
      } else {
        this.content.msg = this.text
        this.content.frommsg = this.arr[0].host
        this.content.tomsg = this.$route.query.friendid
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
          this.textContent = ''
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
    let that = this
    this.websocket = that.global.ws
    this.websocket.onmessage = this.websocketonmessage
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
  padding-left:15px;
  padding-right:15px;
  height: 50px;
  width:50px;

}
.zz_file1 p{
   text-align: center;
   font-size: 13px;
   padding-top: 10px;
   color: rgb(85, 86, 87)

}

.zz_file2{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 27px 10px 30px 10px;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
  }

.ask{
    display: flex;
    flex-direction: row-reverse;
    padding-bottom: 10px;

  }

.arrow {
position:absolute;
top:8px;
right:33px; /* 圆角的位置需要细心调试哦 */
width:0;
height:0;
font-size:0;
border-top: 6px solid transparent;
border-left: 6px solid rgb(121, 235, 77);
border-right: 6px solid transparent;
border-bottom: 6px solid transparent;
}

.arrow1{

position:absolute;
top:8px;
left:33px; /* 圆角的位置需要细心调试哦 */
width:0;
height:0;
font-size:0;
border-top: 6px solid transparent;
border-right: 6px solid rgba(223,223,224,1);
border-left: 6px solid transparent;
border-bottom: 6px solid transparent;

}
  .ask p{
    padding: 5px 8px 5px 8px;
    max-width: 200px;
    background: rgb(121, 235, 77);
    border-radius: 5px;
    word-wrap: break-word;
display:block;
  }

  .askimg{

    width: 35px;
    height: 35px;
    border-radius: 5px;
    margin: 0px 0px 0px 10px;
    /* z-index:2; */

  }
  .reply{
    display: flex;
    padding-bottom: 10px;
    /* background-color: #ebebeb; */
  }
  .reply p{
    padding: 5px 8px 5px 8px;
    max-width: 200px;
    background: rgba(223,223,224,1);
    vertical-align:bottom;
    border-radius: 5px;
    word-wrap: break-word;
display:block;
  }

  .replyimg{
    width: 35px;
    height: 35px;
    border-radius: 5px;
    margin: 0px 10px 0px 0px;
  }

  .bottom{
    position: fixed;
    height: 55px;
    bottom: 0%;
    left: 0;
    right: 0;
    background-color: rgba(223,223,224,1);
    z-index: 99;
    /* border-bottom: 1px solid rgba(153,153,153,0.4); */
  }

.bottompop{
  position: fixed;
   bottom: 0;
  height: 280px;
  width: 100%;
  background-color: rgba(223,223,224,1);
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
  .bottom-bar{
    /* position: fixed; */
    height: 40px;
    background-color:rgba(234,234,234);
    display: flex;
    /*  */
    /* bottom: 0px; */
    /* width: 100px; */

  }

  .bottom-button{
    position: fixed;
    bottom: 0px;
    right: 0px;
    /* border: none; */
    /* -webkit-appearance:none; */

  }

  .bottom-button input{

    -webkit-appearance:none;
    width: 70px;
    height: 35px;
    margin: 3px;
    border: 0;
    border-radius: 5px;
    text-align: center;
    font-size: 15px;
    color: white;
    background-color:rgb(22, 187, 77);

  }

  .split-bar{

    height: 40px;
    width: 40px;
    /* background:gray; */
    border-right: 1px solid rgb(194,194,194);

  }

  .active-bar{

  }

  .split-bar img{
    height: 25px;
    width: 25px;
    padding: 8px ;
    /* background: gray */
  }

</style>
