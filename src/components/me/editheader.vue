<template>
<div class="ehditname">
    <!-- 头部 -->
    <div class="under">
        <div class = "ehheader">
        <p>个人头像</p>
        <router-link to="/edit">
           <img
            src="../../assets/返回2.png" />
          </router-link>
          <div class="right" @click="ChangeHeader">
              <img src="../../assets/省略号.png"/>
          </div>
    </div>
    <div class="inputlist">
            <div class = "eh-input-wrapper" >
             <img :src="localpath"/>
          </div>
    </div>

    </div>

    <div class="z_mask" v-show="showmask">
        <div class="z_alert">
            <div class="takepicture">
                <p>拍照</p>
            </div>
            <div class="takepicture" >
                <div class="z_file">
                <input @change="OpenAlbum" type="file" name="imgfile" id="imgfile" accept="image/jpeg,image/png,image/jpg" />
                <p>从相册中选择</p>
                </div>
            </div>
            <div class="takepicture">
                <p>查看上一张头像</p>
            </div>
            <div class="takepicture">
                <p>保存图片</p>
            </div>
            <div class="bord">

            </div>
            <div class="takepicture"  @click="hidemask">
                <p>取消</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>

import { mapState } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      inputName: '',
      showmask: false,
      notchanged: true,
      imgpath: '',
      myimgPath: '../../../static/uploads/',
      localpath: ''

    }
  },
  methods: {
    setData () {
    //   this.imgpath = this.myimgPath + this.myimg
      this.localpath = this.myimgPath + this.myimg
    },
    ChangeHeader () {
      this.showmask = true
    },
    hidemask () {
      this.showmask = false
    },
    OpenAlbum () {
    //   let vm = this
    //   // 获取点击的文本框
      var imgfile = document.getElementById('imgfile')
      var windowURL = window.URL || window.webkitURL
      var imgUrl = windowURL.createObjectURL(imgfile.files[0])
      this.showmask = false
      this.$store.commit('changeheader', imgfile.files[0])
      this.localpath = imgUrl
      let formData = new FormData()
      formData.append('file', imgfile.files[0])
      formData.append('myid', sessionStorage.getItem('myid'))
      this.uploadImg(formData)
    },
    uploadImg (formData) {
      axios.post(
        'api/changeHeader', formData, {headers: {'Content-Type': 'multipart/form-data'}}
      )
        .then((res) => {
          console.log('modify-data:', res.data)
        })
    }
  },
  computed: {
    ...mapState(['myimg'])
  },

  //   beforeRouteEnter (to, from, next) {
  //     next(vm => vm.setData())
  //     console.log('before-route-enter')
  //   },

  created () {
    console.log('header')
    let MYIMG = sessionStorage.getItem('myimg')
    this.localpath = this.myimgPath + MYIMG
    console.log('header', this.localpath)
  }

}
</script>

<style scoped>
.ehditname{
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    /* background-color: rgba(238,233,233,0.6); */
     background-color: rgba(233,233,234,0.8);
    /* z-index: 999; */
}
.under{
    z-index: 1;
}
.ehheader{
    position: fixed;
    height:50px;
    top:0px;
    width: 100%;
    /* background-color:#fff; */
     background-color: rgba(233,233,234,0.5);
      border-bottom: 1px solid rgba(153,153,153,0.4);
    text-align: center;
}
.ehheader p{
 font-size: 18px;
 padding-top: 14px;
  padding-left: 14px;

}

.ehheader img{
    position: absolute;
    height: 20px;
    width: 20px;
    top: 15px;
    left: 10px;

}

.right{
    position: absolute;
    height: 25px;
    width: 25px;
    top: 0px;
    right: 30px;
}

.eh-input-wrapper{
    /* height: 50px; */
    position: fixed;
    top:100px;
    /* bottom: 200px; */
    width: 100%;
}

.eh-input-wrapper img{
     width: 100%;
}
.eh-sText{
    height: 30px;
    margin: 10px;
    border: 0;
    padding-left: 8px;
    font-size: 15px;

  }

.ehbtn{
 flex: 1;
    width: 65px;
    height: 30px;
    margin: 10px 10px;
    border: 0;
    float: right;
    border-radius: 5px;
    text-align: center;
    font-size: 15px;
    color: white;
    background-color: gray;
}

.z_mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  /* display: none; */
}

.z_alert {
  width: 100%;
  height: 243px;
  border-radius: 0.5rem;
  background: #fff;
  font-size: 14px;
  text-align: center;
  position: absolute;
  bottom: -10px;
}

/* .z_alert p:nth-child(1) {
  line-height: 4rem;
}

.z_alert p:nth-child(2) span {
  display: inline-block;
  width: 49%;
  height: 0.5rem;
  line-height: 0.5rem;
  border-top: 1px solid #ddd;
} */

.z_cancel {
  margin-right: 20px;
}

.takepicture{

    position: relative;
    border-bottom: 1px solid rgba(153,153,153,0.4);
    height: 45px;
    /* top: 50px; */
    /* background-color: #fff; */

}

.takepicture p{
    text-align: center;
    font-size: 14px;
    line-height: 40px;
    color: black;
}

.bord{
    height: 8px;
    background:rgba(153,153,153,0.15);
}

.z_file {
  /* width: 5rem;
  height: 5rem; */
  height: 100%;
  width:100%;
  background-size: 100% 100%;
  /* background:rgba(153,153,153,0.3); */
  /* margin-right: 0.2rem; */
}
.z_file p{
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    color: black;
}
.z_file input::-webkit-file-upload-button {
  /* width: 5rem;
  height: 5rem; */
  height: 100%;
  width:100%;
  border: none;
  position: absolute;
  outline: 0;
  opacity: 0;
   /* background:rgba(153,153,153,0.3); */
}

.z_file input#file {
  display: block;
  width: auto;
  border: 0;

}
</style>
