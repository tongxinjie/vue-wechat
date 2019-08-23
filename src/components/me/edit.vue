<template>
    <div class="edit">

          <!-- 头部 -->
         <div class="app-header">
        <div class="title">个人信息</div>
         <!-- 返回按钮 -->
       <div @click="BacktoMe">
           <img
            class="editback"
            src="../../assets/返回2.png" />
          </div>
      </div>
      <!-- 头像 -->
      <div>
            <div class="item-e" @click="gotoHeader()">
               <img class="item-img-e" :src= "imgpath" height="40" width="40" />
                <span class="item-text-e">头像</span>
        </div>
         <div>
           <img
            class="img-change-enter"
            src="../../assets/enter.png"
          />
          </div>
        </div>
        <!-- 修改昵称 -->
        <div>
          <div class="item-e" @click="gotoName()">
            <span class="item-text-e">名字</span>
            <span class="item-text-name">{{myname}}</span>
            <!-- <myname class="item-text-name"></myname> -->
           <img
            class="name-change-enter"
            src="../../assets/enter.png"
          />
          </div>

        </div>
        <!-- 微信号 -->
        <div>
          <div class="item-e">
            <span class="item-text-e">微信号</span>
            <span class="item-text-id">{{myid}}</span>

          </div>
        </div>
        <div class='erweima'>
          <span>二维码</span>
          <div>
            <div class="icon"><img src='../../assets/二维码.png'/></div>

           <img
            src="../../assets/enter.png"
          />
          </div>
        </div>

        <div class='erweima'>
          <span>更多</span>
          <div>
           <img
            src="../../assets/enter.png"
          />
          </div>
        </div>

     <div style="height:10px"></div>

        <div class='erweima'>
          <span>我的地址</span>
          <div>
           <img
            src="../../assets/enter.png"
          />
          </div>
        </div>
    </div>
</template>
<script>

// import { mapState } from 'vuex'
export default {
  created () {
    // console.log('created')
    let MYIMG = sessionStorage.getItem('myimg')
    console.log('edit', MYIMG)
    this.imgpath = this.myimgPath + MYIMG
    console.log('edit', this.imgpath)
    this.myname = sessionStorage.getItem('myname')
    this.myid = sessionStorage.getItem('myid')
  },
  components: {
  },
  data () {
    return {
      // myid: '',
      myname: '',
      myimg: '',
      imgpath: '',
      myimgPath: '../../../static/uploads/'
    }
  },

  // computed: {
  //   ...mapState(['myimg', 'myid', 'myname'])
  // },

  methods: {
    BacktoMe: function () {
      this.$router.push({path: '/me'})
    },

    gotoName () {
      this.$router.push({path: '/editname'})
      // console.log('edit:', this.myname)
    },
    setData () {
      this.imgpath = this.myimgPath + this.myimg
      console.log('edit', this.imgpath)
    },
    gotoHeader () {
      this.$router.push({path: '/editheader'})
    }

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
.edit{
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    /* background-color: rgba(238,233,233,0.6); */

background-color:  rgba(233,233,234,0.8);
}
.app-header{
  top:0px;
  height: 50px;
  color: black;
  position: absolute;
  width: 100%;
  text-align: center;
  /* background-color: rgba(238,233,233,1); */

background-color:  rgba(233,233,234,1);
  /*z-index: 9;*/
}
.title{
  font-size: 18px;
  padding-top: 14px;
  padding-left: 14px;
}
.item-e{
    position: relative;
    border-bottom: 1px solid rgba(153,153,153,0.4);
    height: 60px;
    top: 50px;
    background-color: #fff;
    /* border-radius: 5px; */
}
.item-img-e{
    /* float: right; */
    /* margin:10px 10px 10px 10px; */
    position: absolute;
    top: 10px;
    right: 60px;
    border-radius: 5px;
    /* right:20px; */
}
.item-text-e{
    font-size: 14px;
    line-height: 60px;
    padding-top: 20px;
    padding-left: 20px;
    color: black;

}
.item-text-id{
    position: fixed;
    right: 20px;
    top:190px;
    font-size: 13px;
    line-height: 20px;
    color:#999999;

}
.item-text-name{
    position: fixed;
    right: 50px;
    top:130px;
    font-size: 13px;
    line-height: 20px;
    color:#999999;

}
.img-change-enter{
    position: absolute;
    height: 20px;
    width: 20px;
    top: 70px;
    right: 10px;
    z-index: 100;
}
.name-change-enter{
   position: fixed;
    height: 20px;
    width: 20px;
    top: 130px;
    right: 10px;
    z-index: 100;

}
.editback{
    position: absolute;
    height: 20px;
    width: 20px;
    top: 15px;
    left: 10px;

 }

 .erweima{
   position: relative;
    border-bottom: 1px solid rgba(153,153,153,0.4);
    height: 60px;
    top: 50px;
    background-color: #fff;
 }
 .erweima span{
    font-size: 14px;
    line-height: 60px;
    padding-top: 20px;
    padding-left: 20px;
    color: black;

 }

 .erweima img{
    position: absolute;
    height: 20px;
    width: 20px;
    top: 20px;
    right: 10px;
    z-index: 100;
 }

 .icon{

    position: absolute;
    height: 25px;
    width: 25px;
    top:0px;
    right: 30px;
    z-index: 100;

 }
</style>
