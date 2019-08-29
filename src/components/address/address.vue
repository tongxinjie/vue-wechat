
<template>
  <section class="box">
    <!-- <div class="head">
      head
    </div> -->
    <div class="add-header">
        <p class="addtitle">通讯录</p>
        <img src="../../assets/添加好友.png" @click="addFriend"/>
      <input type="text" ref="sTest" placeholder="搜索">
      </div>
    <div class="content">

      <div class="right" ref="right">
        <ul>
          <ul>

             <li>
                 <div class="new-friend">
               <img src="../../assets/通讯录/新的朋友.png"/>
                <span>新的朋友</span>
                </div>
                 <div class="new-friend">
               <img src="../../assets/通讯录/群聊.png" height="40" width="40" />
                <span >群聊</span>
        </div>
              <div class="new-friend">
               <img src="../../assets/通讯录/标签.png" height="40" width="40" />
                <span >标签</span>
        </div>
              <div class="new-friend">
               <img  src="../../assets/通讯录/公众号.png" height="40" width="40" />
                <span >公众号
                </span>
        </div>
                </li>

          </ul>

          <li class="right-item right-item-hook" v-for="item in grouplist" :key="item.id">
            <h2>{{item.groups}}</h2>
            <ul>
              <li v-for="info in plist"
                            :key="info.id"
                            v-show="item.groups==info.groups"
                           >
                <div class="li-img"  @click="gotoUser(info)">
                        <img :src="'../../../static/uploads/' + info.avatar" />
                         <span>{{info.loginName}}</span>
                        </div>
              </li>
            </ul>
          </li>
          <div class="sum">
                    {{plist.length}}位联系人
                  </div>
          <div class="bottom-margin-1"></div>
        </ul>

      </div>

      <div class="left" ref="left">
        <ul>
          <li v-for="(item, index) in grouplist" :key="item.id" :class="{current: currentIndex == index}" @click="selectItem(index, $event)">
            <span class="left-item">{{item.groups}}</span>
          </li>
        </ul>
      </div>

    </div>
     <div><tabbar></tabbar></div>
  </section>
</template>
<script>
import BScroll from 'better-scroll'
import tabbar from '../../Tabbar'
import axios from 'axios'
import qs from 'qs'
// import BScroll from 'better-scroll'
export default {
  created () {
    // 后台请求

    this.info.myid = sessionStorage.getItem('myid')

    axios.post(
      'api/getAddr',
      qs.stringify(this.info)
    )
      .then((res) => {
        console.log('plist', res.data)
        this.plist = res.data
      })
      .catch((error) => {
        console.log(error)
      })

    axios.post(
      'api/getGroups',

      qs.stringify(this.info)

    )
      .then((res) => {
        // console.log(res.data)
        this.grouplist = res.data
        for (let i = 0; i < this.grouplist.length; i++) {
          this.grouplist_list[i] = this.grouplist[i].groups
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },
  components: {
    tabbar
  },
  data () {
    return {
      isSelected: '',
      address: [],
      plist: [],
      grouplist: [],
      grouplist_list: [],
      info: {myid: ''},
      active: '',
      listHeight: [],
      scrollY: 0, // 实时获取当前y轴的高度
      clickEvent: false
    }
  },
  methods: {
    addFriend () {
      this.$router.push({
        path: '/addfriend'
      })
    },
    gotoUser: function (info) {
      this.$router.push({path: '/addressinfo',
        query: {
          friendheader: info.avatar,
          friendname: info.loginName,
          friendid: info.wechatId,
          friendloc: info.location
        }})
    },
    _initScroll () {
      // better-scroll的实现原理是监听了touchStart,touchend事件，所以阻止了默认的事件（preventDefault）
      // 所以在这里做点击的话，需要在初始化的时候传递属性click,派发一个点击事件
      // 在pc网页浏览模式下，点击事件是不会阻止的，所以可能会出现2次事件，所以为了避免2次，可以在绑定事件的时候把$event传递过去
      this.lefts = new BScroll(this.$refs.left, {
        click: true
      })
      this.rights = new BScroll(this.$refs.right, {
        scrollY: true,
        scrollX: false,
        mouseWheel: true,
        click: true,
        taps: true,
        probeType: 3 // 探针的效果，实时获取滚动高度
      })
      // rights这个对象监听事件，实时获取位置pos.y
      this.rights.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y)) + 10
      })
    },
    _getHeight () {
      setTimeout(() => {
        // console.log(this.grouplist)
        let rightItems = this.$refs.right.getElementsByClassName('right-item-hook')
        // console.log('rightItems', rightItems)
        let height = 250
        this.listHeight.push(height)
        for (let i = 0; i < rightItems.length; i++) {
          let item = rightItems[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }, 500)
      // console.log('this.listheight', this.listHeight)
    },
    selectItem (index, event) {
      this.clickEvent = true
      console.log('click-index', index)
      // 在better-scroll的派发事件的event和普通浏览器的点击事件event有个属性区别_constructed
      // 浏览器原生点击事件没有_constructed所以当时浏览器监听到该属性的时候return掉
      if (!event._constructed) {

      } else {
        let rightItems = this.$refs.right.getElementsByClassName('right-item-hook')
        let el = rightItems[index]
        // console.log('el', el)
        this.rights.scrollToElement(el, 300)
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this._initScroll()
      this._getHeight()
    })
  },
  computed: {
    currentIndex () {
      // console.log('select')
      for (let i = 0; i < this.listHeight.length; i++) {
        let height = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
          return i
        }
        if (this.listHeight[this.listHeight.length - 1] - this.$refs.right.clientHeight <= this.scrollY) {
          if (this.clickTrue) {
            console.log('2', this.currentNum)
            return this.currentNum
          } else {
            console.log('3', this.listHeight.length - 1)
            return (this.listHeight.length - 1)
          }
        }
      }
      // 如果this.listHeight没有的话，就返回0
      return 0
    }
  }
}
</script>
<style scoped>
.content{
  display: flex;
  position: absolute;
  top:100px;
  bottom:0px;
  width:100%;
  overflow: hidden;
  /* background: #eee; */

background-color:  rgba(233,233,234,1);
}
.left{
  /* flex: 0 0 80px; */
  padding-top:150px;
  width:20px;
  background-color: #f3f5f7;
}
  .left li{
    width: 100%;
    height: 100%;
  }
  .current{
    /* background-color: red; */
    background-color:rgb(8, 168, 61);
    border-radius: 50%;
    color: #fff;
  }
  .left-item{
    display: block;
    width:100%;
    height:20px;
    line-height: 20px;
    text-align: center;
    font-size: 13px;
    /* border-bottom:1px solid yellow; */
  }
  .right{
    flex: 1;
  }

  .right h2{
    padding: 2px 0px 2px 5px;
    font-size: 13px;
  }
  .right-item li{
    /* position: absolute; */
    width:100%;
    /* overflow: auto; */
    background-color: #fff;
    line-height:100px;
    text-align: center;
    height: 60px;
    line-height: 50px;
    border-bottom: 0.9px solid rgba(153,153,153,0.4);
/* padding-left: 5px; */
    align-items: center;
    /* border-bottom: 1px solid yellow; */
  }
  *{
    list-style: none;
    margin: 0;
    padding: 0;
  }

.container{position:absolute;top:0;right:0;bottom:0;left:0;display:flex;overflow:auto;margin:auto}

article{display:inline-block;width:100%}article>div{width:100%;height:100%}

.green{
  /* padding-right: 2px; */
    text-align: center;
    vertical-align: middle;
    background-color:rgb(8, 168, 61);
    /* border-radius: 60%; */
    /* border: 5px solid rgb(8, 168, 61); */
    color:#fff;
    /* background-size: 100% 100%; */
    /* display: inline-block; */
    /* margin: 20px */
}
.bottom-margin-1{
  height: 50px;
  background: #fff
}
.bottom-margin-2{
  height: 100px;
  background: #fff
}
.addr{
  font-size: 15px;

}
.addlist{
    width:100%;height:100%
}
.addrlist img{
    border-radius: 5px;
}
.list{
    position: absolute;
    width:100%;
    overflow: hidden;
    top:100px;
    background-color: #fff;

}

.add-header{
  top:0px;
  height: 100px;
  position: fixed;
  width: 100%;
  text-align: center;
  background-color:  rgba(233,233,234,1);
  z-index: 999;
}
.add-header p{
  color: black;
  font-size: 18px;
  padding-top: 14px;
  padding-left: 14px;
}

.add-header img{
   position: absolute;
    height: 20px;
    width: 20px;
    top: 15px;
  right: 18px;
}

.add-header input{
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

.list_user p{
/* background: rgba(238,233,233,0.6); */
background-color:  rgba(233,233,234,0.8);
height:20px;
font-size: 13px;
line-height: 20px;
/* padding-top:2px; */
padding-left: 10px;

}

.list_user ul li{
height: 60px;
line-height: 50px;
border-bottom: 1px solid rgba(153,153,153,0.4);
/* padding-left: 5px; */
align-items: center;
}

.li-img{
    display: flex;
    left: 0;
    height: 50px;
    padding: 5px 10px;
    align-items: center;

}

 .li-img img{
    height: 40px;
    width: 40px;
    border-radius: 5px;

  }
 .li-img span{
    font-size: 14px;
    margin: 15px;
    color: black;
  }
.list_index{
position: fixed;
right:10px;
top:50%;
font-size: 12px;
line-height: 19px;
}

.list_index ul{
  margin-top:5px;
}

.list_index li{
/* margin: 5px; */
margin-top:5px;
text-align: center;
}

.new-friend{
    display: flex;
    height: 50px;
    border-bottom: 0.8px solid rgba(153,153,153,0.4);
    padding: 8px 10px;
    align-items: center; /*定义body的元素垂直居中*/
    background: #fff
    /*justify-content: center; 定义body的里的元素水平居中*/
    /* border-radius: 5px; */
  }
 .new-friend img{
    /* margin-right: 10px; */
    height: 40px;
    width: 40px;
    /* padding: 5px 10px; */
    /* padding-left: 10px; */
    border-radius: 5px;
  }

  .new-friend span{
    font-size: 16px;
    padding-left: 15px;

  }
  .sum {
    height: 30px;
     margin-top: 15px;
     font-size: 16px;
    color:gray;
    text-align: center;
    /* background: #fff */
  }

</style>
