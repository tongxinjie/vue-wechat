<template>
  <div id="app">
       <div class="bga">

      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <div class="tab">
        <router-link tag="div" class="tab-item" to="/chat">
          <div class="tab-link tab-link-1">
            <span>微信</span>
          </div>
        </router-link>
        <router-link tag="div" class="tab-item" to="/address">
          <div class="tab-link tab-link-2">
            <span>通讯录</span>
          </div>
        </router-link>
        <router-link tag="div" class="tab-item" to="/find">
          <div class="tab-link tab-link-3">
            <span>发现</span>
          </div>
        </router-link>
        <router-link tag="div" class="tab-item" to="/me">
          <div class="tab-link tab-link-4">
            <span >我</span>
          </div>
        </router-link>
      </div>
       </div>
    </div>
    <!-- <Plus :is-show="isShowPlus" @on-close="closeDialog"></Plus> -->

</template>

<script>
export default {
  name: 'App',
  data () {
    return {

    }
  },
  watch: {
  },
  methods: {

  }
}
</script>

<style lang="less">

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video  {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;

}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;

}
body {
  line-height: 1;
  font-family: 'Avenir Next','Lantinghei SC';
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

#app{
  height: 100%;
}

.title{
  font-size: 18px;
  padding-top: 14px;
  padding-left: 14px;
}

.tab{
  border-top: 1px solid rgba(153,153,153,0.4);
  display: flex;
  position: fixed;
  height: 50px;
  line-height: 44px;
  font-size: 14px;
  bottom: 0px;
  left: 0;
  right: 0;
  /*z-index: 9;*/
  // background-color:white;
  background: rgba(253,253,253,1);
}
.tab-item{
  flex: 1;
  text-align: center;
}
.tab-link{
  position: relative;
  color: #999999;
  height: 50px;
}
.tab-link span{
  position: absolute;
  font-size: 10px;
  line-height: 14px;
  height: 14px;
  width: 100%;
  bottom: 6px;
  left: 0px;
}
.tab-link-1{
  background: url('./assets/tab/微信.png') no-repeat center 7px;
  background-size: 22px 22px;
}
.tab-link-2{
  background: url('./assets/tab/通讯录.png') no-repeat center 3px;
  background-size: 28px 28px;
}
.tab-link-3{
  background: url('./assets/tab/发现.png') no-repeat center 7px;
  background-size: 19px 19px;
}
.tab-link-4{
  background: url('./assets/tab/我.png') no-repeat center 8px;
  background-size: 20px 20px;
}
.router-link-active .tab-link{
  color: rgb(37, 206, 35);
}
.router-link-active .tab-link-1{
  background: url('./assets/tab/微信1.png') no-repeat center 7px;
  background-size: 22px 22px;
}
.router-link-active .tab-link-2{
  background: url('./assets/tab/通讯录1.png') no-repeat center 3.3px;
  background-size: 28px 28px;
}
.router-link-active .tab-link-3{
  background: url('./assets/tab/发现1.png') no-repeat center 7px;
  background-size:19px 19px;
}
.router-link-active .tab-link-4{
  background: url('./assets/tab/我1.png') no-repeat center 8px;
  background-size: 20px 20px;
}

    // @import "assets/css/base.css";
    // @import "assets/css/common.css";
    // @import "assets/css/wx-header.css";
    // /*阿里 fonticon*/

    // @import "assets/css/lib/iconfont.css";
    // /*过渡效果需要的动画库*/

    // @import "assets/css/lib/animate.css";
    // /*weui 样式库 非常适合高仿微信*/

    // @import "assets/css/lib/weui.min.css";
      // @import "../../assets/css/wx-nav.css";
</style>
