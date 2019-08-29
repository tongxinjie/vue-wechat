<template>
<div class="addfriend">

<div class="app-header">
        <div class="title">添加朋友</div>
       <div @click="BacktoAddress">
           <img
            class="editback"
            src="../../assets/返回2.png" />
          </div>
      </div>

      <div class="addfheader">
       <input type="text" ref="sTest" placeholder="    微信号/手机号" @keyup.enter="SearchFriend"/>
      </div>

      <div class="myid">
          <p>我的微信号： {{id}}</p>
          <img src="../../assets/add/二维码.png"/>
      </div>

      <div style="height:150px"></div>

      <div class="pay">
            <img class="pay-img"
            src="../../assets/add/雷达.png" height="25" width="25"/>
            <span class="pay-text">雷达加朋友</span>
            <div>
           <img
            class="pay-enter"
            src="../../assets/enter.png"
          />
          </div>
          </div>
          <div class="pay">
            <img class="pay-img"
            src="../../assets/add/面对面.png" height="25" width="25"/>
            <span class="pay-text">面对面建群</span>
            <div>
           <img
            class="pay-enter"
            src="../../assets/enter.png"
          />
          </div>
          </div>
           <div class="pay">
            <img class="pay-img"
            src="../../assets/add/扫一扫.png" height="25" width="25"/>
            <span class="pay-text">扫一扫</span>
            <div>
           <img
            class="pay-enter"
            src="../../assets/enter.png"
          />
          </div>
          </div>

           <div class="pay">
            <img class="pay-img"
            src="../../assets/add/手机.png" height="25" width="25"/>
            <span class="pay-text">手机联系人</span>
            <div>
           <img
            class="pay-enter"
            src="../../assets/enter.png"
          />
          </div>
          </div>
           <div class="pay">
            <img class="pay-img"
            src="../../assets/add/公众号.png" height="25" width="25"/>
            <span class="pay-text">公众号</span>
            <div>
           <img
            class="pay-enter"
            src="../../assets/enter.png"
          />
          </div>
          </div>

</div>

</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {

  data () {
    return {

      id: sessionStorage.getItem('myid')

    }
  },

  created () {
  },

  methods: {
    SearchFriend () {
      var searchId = this.$refs.sTest.value
      axios.post(
        'api/SearchFriend', qs.stringify({searchId: searchId, myid: this.id})
      )
        .then((res) => {
          if (res.data !== 404) {
            console.log('查询到好友')
            if (!res.data.exist) {
              this.$router.push({path: '/newfriendCard',
                query: {
                  friendheader: res.data.avatar,
                  friendname: res.data.username,
                  friendid: res.data.userid,
                  friendloc: res.data.userloc
                }})
            } else {
            //   alert('你们已经是好友了')
              console.log('你们已经是好友了')
              this.$router.push({path: '/addressinfo',
                query: {
                  friendheader: res.data.avatar,
                  friendname: res.data.username,
                  friendid: res.data.userid,
                  friendloc: res.data.userloc
                }})
            }
          } else {
            alert('该用户不存在')
          }
        })
    },
    BacktoAddress () {
      this.$router.push({path: '/address'})
    //   this.$router.back()
    }
  }

}
</script>

<style scoped>
.addfriend{
    height: 100vh;
    width: 100vw;
    background-color:  rgba(233,233,234,0.8);
    position: absolute;
}
.app-header{
  top:0px;
  height: 50px;
  color: black;
  position: absolute;
  width: 100%;
  text-align: center;
  /* background-color: rgba(238,233,233,1); */

/* background-color:  rgba(233,233,234,1); */
  /*z-index: 9;*/
}
.title{
  font-size: 17px;
  padding-top: 14px;
  padding-left: 14px;
}

.editback{
    position: absolute;
    height: 20px;
    width: 20px;
    top: 15px;
    left: 10px;

 }

 .addfheader input{
    height: 35px;
    margin-top: 70px;
    border: 0;
    /* border-radius: 5px; */
    width: 100%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    /* padding-left: 5px; */
    /* text-align: center; */
}

.myid{
    position: relative;
    top:100px;
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.myid p{
    font-size: 13px;
    color: gray;

}

.myid img{
    height: 15px;
    width:15px;
    padding-left: 10px;
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

</style>
