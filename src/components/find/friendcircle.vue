<template>
<div class = "fc">
    <!-- header -->
    <div class = "fheader">
        <p>朋友圈</p>
        <router-link to="/find">
           <img
            src="../../assets/返回1.png" />
          </router-link>
    </div>
    <scroller :on-refresh="refresh" :on-infinite="infinite" ref="myScroller" class="scroller" :noDataText="'----没有更多动态了----'">
      <ul>
        <li>

          <div  class='bg'>
        <img src = "../../assets/bg2.jpg"/>
        <div class="my">
            <span>{{myname}}</span>
            <img :src = "imgpath"/>
        </div>
        </div>
        <div style="height:100px"></div>
        <div class = 'content-body'>
        <ul>
                <li>
                    <div class="eachone" v-for="item in arrshow" :key="item.id">
                        <div class="userimg">
                            <img :src="'../../../static/avatar/'+item.avatar"  height=50 width=50/>
                        </div>
                        <div class="usersname">
                            <h2>{{item.loginName}}</h2>
                            <p>{{item.context}}</p>
                            <div v-if="item.album">
                            <!-- <div v-for="img in Convert2Json(item.album)" :key="img.id"> -->
                            <img :src="item.album" class="useralbum"/>
                            <!-- </div> -->
                        </div>

                        <div class="usertime">
                            <p>{{item.time|moment}}</p>
                        </div>

                        </div>

                        <div class="likedbtn">
                        <img src="../../assets/省略号.png" />
                        <!-- <span>{{item.num}}</span> -->
                        </div>
                    </div>
                    </li>
        </ul>
        </div>
        </li>
      </ul>

    </scroller>

      <!-- <scroller :on-refresh="refresh" :on-infinite="infinite" ref="myScroller">
      <div v-for="(item, index) in items" :key="index"
       :class="{'grey-bg': index % 2 == 0}">
        {{ item }}
      </div>
    </scroller> -->
</div>
</template>

<script>
// import { mapState } from 'vuex'
import { setTimeout } from 'timers'
import axios from 'axios'
import qs from 'qs'
export default {

  computed: {
    // ...mapState(['myname', 'myimg', 'myid']),

    // ...mapState(['myimg']),

    Convert2Json (list) {
      return function (list) {
        return JSON.parse(list)
      }
    }

  },
  // beforeRouteEnter (to, from, next) {
  //   next(vm => vm.setData())
  //   console.log('before-route-enter')
  // },

  created () {
    //  this.myname = sessionStorage.getItem('myname')
    console.log('friends')
    let MYIMG = sessionStorage.getItem('myimg')
    this.imgpath = this.myimgPath + MYIMG
    this.myname = sessionStorage.getItem('myname')
    this.myid = sessionStorage.getItem('myid')
    this.info.myid = this.myid

    axios.post(
      'api/getMoments',
      qs.stringify(this.info)
    )
      .then((res) => {
        console.log(res.data)
        if (res) {
          this.setDatalist(res.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },

  methods: {

    setDatalist (res) {
      for (let i = 0; i < res.length; i++) {
        this.Getlist.push({
          avatar: res[i].avatar,
          loginName: res[i].loginName,
          time: res[i].time,
          context: res[i].context,
          album: res[i].album
          // wechatId: this.userjson[i].wechatId
        })
        // console.log(this.userjson)
      }
      this.maxL = this.Getlist.length

      console.log(this.Getlist.length)
    },

    Like: function (item) {
      console.log(item.num)
      console.log(this.liked)
      if (!this.liked) { item.num++ } else { item.num-- }
      this.liked = !this.liked
    },

    refresh (done) {
      console.log('refresh')
    },

    infinite (done) {
      console.log('infinite')
      if (this.bottom > (this.maxL)) {
        done(true)
        return
      }
      setTimeout(
        () => {
          let start = this.bottom + 1
          for (let i = start; i < start + this.step; i++) {
            if (i < this.maxL) {
              this.arrshow.push(
                this.Getlist[i]
              )
            }
          }
          this.bottom = this.bottom + this.step
          setTimeout(() => {
            done()
          })
        }, 1500

      )
      console.log(this.arrshow)
    }
  },
  data () {
    return {
      maxL: 7,
      step: 2,
      bottom: -1,
      noData: false,
      overFlag: false,
      page: 1,
      arr: [],
      arrd: [],
      arrshow: [],
      arrp: [],
      liked: false,
      imgpath: '',
      myimgPath: '../../../static/uploads/',
      myname: '',
      myid: '',
      info: {myid: ''},
      userinfo: {wechatid: ''},
      Getlist: []

    }
  }

}
</script>

<style scoped>

.fheader{
    position: fixed;
    height:50px;
    top:0px;
    width: 100%;
    /* background-color:rgba(238,233,233,1); */

    background-color:  rgba(233,233,234,1);
    text-align: center;
    z-index: 1000;
}
.fheader p{
  font-size: 18px;
  padding-top: 14px;
  padding-left: 14px;

}

.fheader img{
    position: absolute;
    height: 20px;
    width: 20px;
    top: 15px;
    left: 10px;

}
.bg{
 position:relative;
 top:50px;
}
.bg img {
    width:100%;
}

.my{
    position: absolute;
    bottom:0px;
    right: 10px;
    display: flex;
    align-items: center;
    color: #fff;
  }
  .my span{
    font-size: 14px;
    font-weight: bold;
    padding-bottom: 0px;
    margin-right: 10px;
    color: black;
  }
  .my img{
    border: 2px solid #fff;
    height: 50px;
    width:50px;
    border-radius: 8px;
  }

  .content-body{
      position: relative;
      width:100%;

  }

  .eachone{

    position: relative;
    border-bottom: 1px solid rgba(153,153,153,0.4);
    margin: 5px 0;
    padding: 10px 10px;
    display: flex;

  }

  .userimg{
      margin-right: 10px;

  }

  .userimg img{
border-radius: 8px;
  }

  .usersname h2{
    color: gray;
    font-size: 16px;
    font-weight: bold;
    line-height: 16px;
    margin-bottom: 10px;

  }

  .usersname p{
    font-size: 14px;
    line-height: 40px;
  }

  .usertime p{
       /* font-size: 14px;
       margin-right: 10px; */
    /* position: absolute; */
    /* top: 20px; */
     /* bottom: 5px; */
     /* left:10px; */
    /* right: 10px; */
    font-size: 12px;
    color: rgba(153,153,153,0.8);
  }
.likedbtn{
    position: absolute;
    bottom: 10px;
    right: 20px;
    font-size: 12px;
}
.likedbtn img{
    height: 20px;
    width: 20px;
}

.likedbtn span{
    right: 5px;
    color:gray;
}

.useralbum{

  height: 150px;
  /* top:10px; */

}

.scroller{
   overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>
