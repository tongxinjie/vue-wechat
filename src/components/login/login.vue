<template>
<div class='login'>

    <div class="login-content">
    <div class="log-logo">
        Login
        <div class = 'imgheader'>
            <img :src='imgpath' id='imgfile'/>
    </div>
    </div>

    <div class="log-content">
        <div class="input-username">
        <input type="text" placeholder="ID number" v-model="name" >
        </div>
        <div class="input-password">
        <input type="password" placeholder="Password"  v-model="password">
        </div>
        <div class="log-bottom">
        <div>
          <input type="button" value="Login" @click="Loginfc" class="log-btn">
          <!-- <div class="submit-wrapper">
            <button @click="Loginfc" type="primary">Login</button>
        </div> -->
        </div>
        <div v-if="isLogging" class="logging">正在登陆......</div>
        <toast v-model="showPositionValue" type="text" :time="1500" is-show-mask :text="toastText" :position="position"></toast>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import {Toast, XButton} from 'vux'
// import { mapState } from 'vuex'
import axios from 'axios'
import qs from 'qs'
import { setTimeout } from 'timers'
export default {

  // computed: {
  //   ...mapState(['myimg'])
  // },
  data () {
    return {

      name: '',
      password: '',
      isLogging: false,
      isErr: false,
      showPositionValue: false, // 是否显示提示
      position: 'top', // 提示信息的位置
      toastText: '', // 提示文本
      info: {name: '', password: ''},
      imgpath: '',
      myimgPath: '../../../static/uploads/'
    }
  },
  components: {
    Toast, XButton
  },
  created () {
    let MYIMG = sessionStorage.getItem('myimg')
    if (MYIMG !== null) {
      this.imgpath = this.myimgPath + MYIMG
      console.log('edit', this.imgpath)
    } else {
      this.imgpath = '../../../static/avatar/头像.png'
      console.log('edit', this.imgpath)
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   next(vm => vm.setData())
  //   console.log('before-route-enter')
  // },

  beforeDestroy () {
    // ---------定义全局的websocket-----------
    console.log('destroy login')
    this.initWebSocket()
  },
  methods: {
    // setData () {
    //   this.myname = sessionStorage.getItem('myname')
    //   this.myimg = sessionStorage.getItem('myimg')
    // },
    initWebSocket: function () {
      let that = this
      that.websock = new WebSocket('ws://localhost:8069/websocket/' + sessionStorage.getItem('myid'))
      that.websock.onopen = that.websocketonopen
      that.websock.onerror = that.websocketonerror
      // that.websock.onmessage = that.websocketonmessage
      that.websock.onclose = that.websocketclose
      window.onbeforeunload = that.onbeforeunload
      that.global.setWs(that.websock)
      console.log('login:', that.websock)
    },
    websocketonopen: function () {
      console.log('WebSocket连接成功~~~')
    },
    websocketonerror: function (e) {
      console.log('WebSocket连接发生错误')
    },

    Loginfc () {
      if (this.name !== '' && this.password !== '') {
        this.info.name = this.name
        this.info.password = this.password
        // 后台请求
        axios.post(
          'api/login'
          , qs.stringify(this.info)
        )
          .then((res) => {
            console.log('login-data:', res.data)
            this.tologin(res.data)
          })
        // console.log('info', this.name)
      } else {
        // console.log('info', this.name)
        this.showPositionValue = true
        this.toastText = '输入不能为空！'
      }
    },
    websocketclose: function (e) {
      console.log('websocket连接关闭')
    },
    onbeforeunload () {
      this.websocketclose()
    },

    websocketsend (Data) { // 数据发送
      this.websock.send(Data)
    },
    tologin (res) {
      if (res.token) {
        this.isLogging = true
        this.setimg = this.imgpath
        // this.$store.commit('islogin', true)
        this.$store.commit('init', res)
        setTimeout(() => {
          this.$router.push({path: '/chat'})
        }, 1500)
      } else {
        this.showPositionValue = true
        this.toastText = '密码或用户名错误！'
      }
    }
  }

}
</script>

<style scoped lang="less">

.login{

    position: fixed;
    height: 100%;
    width: 100%;
    background: url('../../assets/loginbg.jpg') no-repeat center;
    background-size: 100% 100%;
    display: flex;
    justify-content:center;

}

.login-content{
    z-index: 100;
}

.imgheader{

    margin-top: 20px;

}
.imgheader img{
    height: 50px;
    width: 50px;
    border: 2px solid #fff;
}
.log-logo{
     height: 80px;
     margin-top: 120px;
     margin-bottom: 50px;
     text-align: center;
     color: gray;
     font-weight: bold;
     font-size: 40px;}

.input-username{

   -webkit-appearance:none;
    text-align: center;
    margin-bottom: 20px;

}

.input-username input{

    border:0;
    border-radius: 5px;
    height: 25px;
    width: 90%;

    border-bottom: 1px solid rgba(153,153,153,0.8);
    // text-align: center;

}

.input-password{

    -webkit-appearance:none;
     text-align: center;
     margin-bottom: 20px;

}
.input-password input{

     border:0;
     border-radius: 5px;
     height: 25px;
     width: 90%;
    border-bottom: 1px solid rgba(153,153,153,0.8);

}
.log-bottom{
    text-align: center;

}

.log-btn{
    // display: -webkit-flex;
    // display: flex;
    // -webkit-align-items: center;
    // align-items: center;
    -webkit-appearance:none;
    width: 170px;
    height: 30px;
    margin: 10px 10px;
    border: 0;
    border-radius: 5px;
    text-align: center;
    font-size: 15px;
    color: black;
    background-color:rgb(155, 221, 130);
}

.logging{
    color: gray;
    margin-top: 20px;
    font-size: 14px;
}

</style>
