<template>
<div class="editname">
    <!-- 头部 -->
    <div class = "eheader">
        <p>设置名字</p>
        <router-link to="/edit">
           <img
            src="../../assets/返回2.png" />
          </router-link>
    </div>
    <!-- input -->
    <div class = "e-input-wrapper" >
     <input type="text" class="e-sText" :value="myname" ref="inputname">
     <input type="button" class="ebtn" value="完成" @click="ChangeName">
    </div>
</div>
</template>

<script>

// import { mapState } from 'vuex'

export default {
  data () {
    return {
      inputName: ''
      // myname: ''

    }
  },
  methods: {
    ChangeName: function () {
      this.inputName = this.$refs.inputname.value
      this.$store.commit('change', this.inputName)
    }
    // setData () {
    //   this.myname = sessionStorage.getItem('myname')
    // }
  },
  // computed: {
  //   ...mapState(['myname'])
  // },

  // beforeRouteEnter (to, from, next) {
  //   next(vm => vm.setData())
  //   console.log('before-route-enter')
  // },
  created () {
    this.myname = sessionStorage.getItem('myname')
  }

}
</script>

<style scoped>
.editname{
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;

background-color:  rgba(233,233,234,0.8);
    /* background-color: rgba(238,233,233,0.6); */
}
.eheader{
    position: fixed;
    height:50px;
    top:0px;
    width: 100%;
    border-bottom: 1px solid rgba(153,153,153,0.4);
    /* background-color:#fff; */

background-color:  rgba(233,233,234,0.5);
    text-align: center;
}
.eheader p{
 font-size: 18px;
 padding-top: 14px;
  padding-left: 14px;

}

.eheader img{
    position: absolute;
    height: 20px;
    width: 20px;
    top: 15px;
    left: 10px;

}

.e-input-wrapper{
    height: 50px;
    position: absolute;
    top:50px;
    background-color: #fff;
    width: 100%;
}

.e-sText{
    height: 30px;
    margin: 10px;
    border: 0;
    padding-left: 8px;
    font-size: 15px;

  }

.ebtn{
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
    background-color:rgb(22, 187, 77);
    /* background-color: gray; */
}

</style>
