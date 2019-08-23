<template>
  <div class="me">
    <div class="me-wrapper" >
      <div class="camera">
        <img src="../../assets/照相.png"/>
      </div>
      <div @click="gotoEdit" class="me-content" >
        <div class="aboutme">
          <img
            class="aboutme-img"
            :src= "imgpath"
          />
          <div>
            <h2>{{myname}}</h2>
            <!-- <myname class="me-h2"></myname> -->
            <p>微信号：{{myid}}</p>

          </div>

        </div>
        <div><img src='../../assets/二维码.png' class="icon-1"/></div>
        <div>
           <img
            class="aboutme-enter"
            src="../../assets/enter.png"
          />
          </div>
          <!-- <div><img src='../../assets/二维码.png' class="icon-1"/></div> -->
      </div>
      <div style="height:10px"></div>

          <div class="pay">
            <img class="pay-img"
            src="../../assets/微信支付.png" height="28" width="28"/>
            <span class="pay-text">支付</span>
            <div>
           <img
            class="pay-enter"
            src="../../assets/enter.png"
          />
          </div>
          </div>

     <div style="height:10px"></div>

           <div class="pay">
            <img class="pay-img"
            src="../../assets/收藏2.png" height="25" width="25"/>
            <span class="pay-text">收藏</span>
            <div>
           <img
            class="pay-enter"
            src="../../assets/enter.png"
          />
          </div>
          </div>

           <div class="pay">
            <img class="pay-img"
            src="../../assets/相册2.png" height="25" width="25"/>
            <span class="pay-text">相册</span>
            <div>
           <img
            class="pay-enter"
            src="../../assets/enter.png"
          />
          </div>
          </div>

           <div class="pay">
            <img class="pay-img"
            src="../../assets/卡包2.png" height="25" width="25"/>
            <span class="pay-text">卡包</span>
            <div>
           <img
            class="pay-enter"
            src="../../assets/enter.png"
          />
          </div>
          </div>

           <div class="pay">
            <img class="pay-img"
            src="../../assets/表情.png" height="25" width="25"/>
            <span class="pay-text">表情</span>
            <div>
           <img
            class="pay-enter"
            src="../../assets/enter.png"
          />
          </div>
          </div>

     <div style="height:10px"></div>

           <div class="pay" @click="logout">
            <img class="pay-img"
            src="../../assets/设置2.png" height="25" width="25"/>
            <span class="pay-text">退出</span>
            <div>
           <img
            class="pay-enter"
            src="../../assets/enter.png"
          />
          </div>
          </div>
    </div>

    <!-- <router-view></router-view> -->
    <div><tabbar></tabbar></div>
  </div>
</template>

<script >
import tabbar from '../../Tabbar'
// import { mapState } from 'vuex'
export default {
  components:
    {
      tabbar
    },

  // computed: {
  //   ...mapState(['myimg', 'myname', 'myid'])
  // },

  data () {
    return {

      // imgurl: this.My.Myimg,
      myid: '',
      myname: '',
      imgpath: '',
      myimgPath: '../../../static/uploads/'

    }
  },

  methods: {

    // setData () {
    //   this.imgpath = this.myimgPath + this.myimg
    // },
    gotoEdit () {
      this.$router.push({path: '/edit'})
    },
    logout () {
      this.$router.push({path: '/login'})
      // this.$store.commit('islogin', false)
      let that = this
      that.global.ws.close()
      sessionStorage.setItem('token', '')
      this.$store.commit('clean')
      console.log('token:', sessionStorage.getItem('token'))
      console.log('store.state.token', this.$store.state.token)
    }

  },
  created () {
    console.log('me')
    let MYIMG = sessionStorage.getItem('myimg')
    this.imgpath = this.myimgPath + MYIMG
    console.log('me', this.imgpath)
    this.myname = sessionStorage.getItem('myname')
    this.myid = sessionStorage.getItem('myid')
  },

  // beforeRouteEnter (to, from, next) {
  //   next(vm => vm.setData())
  //   console.log('before-route-enter')
  // },
  watch: {

  }

}

</script>

<style scoped>

  .me{
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    /* background-color: rgba(238,233,233,0.6); */
    background-color:  rgba(233,233,234,0.8);

  }
  .me-wrapper{
    height: 100%;
  }

  .camera img{

    position: absolute;
    height: 25px;
    width: 25px;
    z-index: 999;
    right: 10px;
    top:15px;
    bottom:50px;

  }

  .aboutme{
    position: relative;
    height: 150px;
    padding: 10px 10px;
    margin-top: 0px;
    margin-bottom: 0px;
    background-color: #fff;
    border-bottom: 1px solid rgba(153,153,153,0.4);

    /*border: 1px solid red;*/
  }
  .aboutme-img{
    position: absolute;
    height: 60px;
    width: 60px;
    top: 80px;
    left: 20px;
    border-radius: 7px;
  }
   .aboutme-enter{
    position: absolute;
    height: 15px;
    width: 15px;
    top: 100px;
    right: 10px;
  }
  .aboutme div{
    position: absolute;
    left: 100px;
    top:80px;
  }
  .aboutme h2{
    font-size: 18px;
    font-weight: bold;
    line-height: 30px;
    margin-bottom: 5px;
  }
  .aboutme p{
    font-size: 12px;
    line-height: 35px;
    color:#999999;

  }
  .aboutme-code{
    position: absolute;
    background-color: #fff;
    top: 30px;
    right: 20px;
    transition: all 0.5s;
  }
.pay{
   background-color: #fff;
   height: 50px;
     position: relative;
    border-bottom: 1px solid rgba(153,153,153,0.4);

}
.pay-img{

    float: left;
    margin-left:20px;
    margin-top:13px;
    /* margin:10px 10px 20px 20px; */

}

.pay-text{
    font-size: 14px;
    line-height: 50px;
    padding-left: 20px;
    color: black;
}

.pay-enter{

    position: absolute;
    height: 15px;
    width: 15px;
    top: 15px;
    right: 10px;

}
.icon-1{

    position: absolute;
    top:98px;
    right: 30px;
    z-index: 100;
    height: 20px;
    width:20px;

 }
</style>
