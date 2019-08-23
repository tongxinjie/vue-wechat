<template>
  <div class="it">

    <div class="it-wrapper">

      <div>
      <router-link
        to='/address'
        ><img class="about-back"
            src="../../assets/返回2.png"
          />
        </router-link>
      </div>
        <div class="about">
          <img
            class="about-img"
            :src="img"
          />
          <div>
            <h2>{{name}}</h2>
            <p>微信号：{{id}}</p>
            <p>地区：{{loc}}</p>
          </div>
        </div>
          <div class='moreinfo'>
          <span>标签</span>
          <div>
           <img
            src="../../assets/enter.png"
          />
          </div>
        </div>

     <div style="height:10px"></div>

        <div class='tofriend'>
          <span>
            朋友圈
          </span>
          <img src='../../assets/朋友1.jpg' height="60" width="60"/>
          <img src='../../assets/朋友2.jpg' height="60" width="60"/>
          <img src='../../assets/朋友3.jpg' height="60" width="60"/>
          <div>
           <img class="tofriend-enter"
            src="../../assets/enter.png" height="15" width="15"
          />
          </div>
        </div>

        <div class='moreinfo'>
          <span>更多信息</span>
          <div>
           <img
            src="../../assets/enter.png"
          />
          </div>
        </div>

         <div style="height:10px"></div>

          <div class="tochat" @click="toChatroom">
             <img src='../../assets/消息.png' height="20" width="20"/>
             <p>发消息</p>
          </div>
          <div class="tochat">
              <img src='../../assets/视频1.png' height="20" width="20"/>
            <p>音视频通话</p>
          </div>

    </div>
    <!-- <router-view></router-view> -->
    <!-- <div><tabbar></tabbar></div> -->
  </div>
</template>

<script >
import tabbar from '../../Tabbar'
export default {
  components:
    {
      tabbar
    },

  data () {
    return {
      id: '',
      name: '',
      img: '',
      loc: ''
    }
  },

  beforeRouteEnter (to, from, next) {
    next(vm => vm.setData())
  },
  created () {
    console.log('created.')
  },

  methods: {
    setData () {
      this.name = this.$route.query.pinfo.loginName
      this.id = this.$route.query.pinfo.wechatId
      this.img = '../../../static/uploads/' + this.$route.query.pinfo.avatar
      this.loc = this.$route.query.pinfo.location
    },
    toChatroom () {
      this.$router.push({path: '/chatroom', query: {userinfo: this.$route.query.pinfo}})
    }
  }

}

</script>

<style scoped>
  .it{
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    background-color:  rgba(233,233,234,0.5);
    /* background-color: rgba(238,233,233,0.6); */
  }
   .back{
    position: absolute;
    height: 30px;
    width: 30px;
    top: 10px;
    left: 10px;

 }
  .it-wrapper{
    /*border: 1px solid red;*/
    height: 100%;
    /* top:50px; */
    /* overflow: hidden; */
  }

  .about{
    position: relative;
    height: 130px;
    padding: 10px 10px;
    margin-top: 0px;
    background-color: #fff;

    border-bottom: 1px solid rgba(153,153,153,0.4);
    /*border: 1px solid red;*/
  }
  .about-img{
    position: absolute;
    height: 60px;
    width: 60px;
    top: 60px;
    left: 20px;
    border-radius: 10px;
  }

  .about-img img{
    /* border-radius: 55px; */
  }
   .about-back{
    position: absolute;
    height: 18px;
    width: 18px;
    z-index: 1000;
    top: 20px;
    left: 10px;

  }
  .about-enter{
    position: absolute;
    height: 30px;
    width: 30px;
    top: 195px;
    right: 10px;

  }

  .about div{
    position: absolute;
    left: 100px;
    top:50px;
  }
  .about h2{
    font-size: 20px;
    font-weight: bold;
    line-height: 30px;
    margin-bottom: 5px;
  }
  .about p{
    font-size: 12px;
    line-height: 20px;
    color:#999999;

  }
  .about-code{
    position: absolute;
    background-color: #fff;
    top: 30px;
    right: 20px;
    transition: all 0.5s;
  }

  .tochat{

    background: #fff;
    color: black;
    height: 40px;
    border-bottom: 1px solid rgba(153,153,153,0.4);
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

  }

  .tochat img{

    height: 20px;
    width:20px;
    padding-right: 10px;

  }

  .tochat p{
    font-size: 14px;
    line-height: 40px;
    color: rgba(61, 97, 175, 1);

  }

  .tofriend{

    background: #fff;
    color: black;
    height: 100px;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: space-around;
    /* margin: 20px 10px 20px 10px; */
    align-items: center;
    align-content: center;
    /* flex-wrap: wrap; */
    border-bottom: 1px solid rgba(153,153,153,0.4);

  }

  .tofriend span{

    font-size: 14px;
    /* line-height: 40px; */
    padding-left:10px;
    /* margin-right:20px; */

  }

  .tofriend img{

    /* margin: 20px 10px 20px 10px; */

  }

.moreinfo{
    position: relative;
    border-bottom: 1px solid rgba(153,153,153,0.4);
    height: 40px;
    background-color: #fff;
}

.moreinfo span{
    font-size: 14px;
    line-height: 40px;
    padding-top: 20px;
    padding-left: 20px;
    color: black;

 }

 .moreinfo img{
    position: absolute;
     height: 15px;
    width: 15px;
    top: 10px;
    right: 10px;
    z-index: 100;
 }

</style>
