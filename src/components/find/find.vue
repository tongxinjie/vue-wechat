<template>
    <div class="find">
            <div class="app-header">
        <div class="title">发现</div>
      </div>
      <div @click='gotoFriendcircle'>
      <div class="item-find">
               <img class="item-img" src="../../assets/朋友圈2.png" height="30" width="30" />
                <span class="item-text">朋友圈</span>
        </div>
        <div>
           <img
            class="find-enter"
            src="../../assets/enter.png"
          />
          </div>
          </div>

          <div class="searchf">
            <img
            src="../../assets/扫一扫2.png" height="28" width="28"/>
            <span>扫一扫</span>
            <div>
           <img
            class="searchf-enter"
            src="../../assets/enter.png"
          />
          </div>
          </div>

          <!-- <div style="height:7px"></div> -->

          <div class="searchf">
            <img
            src="../../assets/摇一摇.png" height="28" width="28"/>
            <span>摇一摇</span>
            <div>
           <img
            class="searchf-enter"
            src="../../assets/enter.png"
          />
          </div>
          </div>

          <div style="height:7px"></div>

          <div class="searchf">
            <img
            src="../../assets/看一看.png" height="28" width="28"/>
            <span>看一看</span>
            <div>
           <img
            class="searchf-enter"
            src="../../assets/enter.png"
          />
          </div>
          </div>

          <!-- <div style="height:7px"></div> -->

          <div class="searchf">
            <img
            src="../../assets/搜一搜.png" height="27" width="27"/>
            <span>搜一搜</span>
            <div>
           <img
            class="searchf-enter"
            src="../../assets/enter.png"
          />
          </div>
          </div>

          <div style="height:7px"></div>

          <div class="searchf">
            <img
            src="../../assets/购物1.png" height="26" width="26"/>
            <span>购物</span>
            <div>
           <img
            class="searchf-enter"
            src="../../assets/enter.png"
          />
          </div>
          </div>

          <div class="searchf">
            <img
            src="../../assets/游戏.png" height="28" width="28"/>
            <span>游戏</span>
            <div>
           <img
            class="searchf-enter"
            src="../../assets/enter.png"
          />
          </div>
          </div>

          <!-- <div style="height:7px"></div> -->

     <div style="height:7px"></div>

          <div class="miniprof">
            <img
            src="../../assets/小程序.png" height="26" width="26"/>
            <span>小程序</span>
            <div>
           <img
            class="miniprof-enter"
            src="../../assets/enter.png"
          />
          </div>
          </div>

          <div><tabbar></tabbar></div>
    </div>
</template>

<script>
import tabbar from '../../Tabbar'
export default {
  data: function () {
    return {
      return: {
        user: ''
      }
    }
  },
  methods: {
    gotoFriendcircle: function () {
      this.$router.push({path: '/friendcircle'})
    }
  },
  components:
    {
      tabbar
    }

}
</script>

<style scoped>
.find{
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    /* background-color: rgba(238,233,233,0.6); */
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
 border-bottom: 1px solid rgba(153,153,153,0.4);
  /*z-index: 9;*/
}
.title{
  font-size: 18px;
  padding-top: 14px;
  padding-left: 14px;
}

.item-find{
    position: relative;
    border-bottom: 1px solid rgba(153,153,153,0.4);
    height: 50px;
    top: 50px;
    background-color: #fff;
}
.item-img{
    float: left;
    margin:10px 10px 10px 10px;
}
.item-text{
    font-size: 14px;
    line-height: 50px;
    padding-top: 20px;
    padding-left: 20px;
    color: black;
}
 .find-enter{
    position: absolute;
    height: 15px;
    width: 15px;
    top: 68px;
    right: 10px;
  }

  .searchf{

    position: relative;
    border-bottom: 1px solid rgba(153,153,153,0.4);
    height: 50px;
    top: 60px;
    background-color: #fff;

  }

  .searchf img{

     float: left;
    margin:10px 10px 10px 10px;
  }

  .searchf span{
    font-size: 14px;
    line-height: 50px;
    padding-left: 20px;
    color: black;
  }

  .searchf-enter{

    position: absolute;
    height: 15px;
    width: 15px;
    top: 8px;
    right: 0px;

  }

  .miniprof{

    position: relative;
    border-bottom: 1px solid rgba(153,153,153,0.4);
    height: 50px;
    top: 60px;
    background-color: #fff;

  }

  .miniprof img{

     float: left;
    margin:10px 10px 10px 10px;

  }

  .miniprof span{
     font-size: 14px;
    line-height: 50px;
    padding-top: 20px;
    padding-left: 20px;
    color: black;
  }

  .miniprof-enter{
    position: absolute;
    height: 15px;
    width: 15px;
    top: 8px;
    right: 0px;
  }

</style>
