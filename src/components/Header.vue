<template>
  <div class="header">
    <el-row>
    <el-col  :span="12">
    <img class="menu" src="@/assets/menu.png" @click="showMenu"/>
    <h3 class="sunshine">阳光盒子</h3>
    </el-col >
    <el-col  :span="5" class="refresh" >
      <el-button size="small":disabled="disabled" @click="refresh">
        <img id="image" style="vertical-align:middle" src="@/assets/refresh_69.svg"/>
        <span class="ziti">刷新</span>
      </el-button>
    </el-col >
    </el-row>
    <div class="community" v-if="community">
      <div class="titel-community">
        <img  class="logo" src="@/assets/page_1.svg"/>
        <span>阳光盒子</span>
        <p class="p1">加入教师社区</p>
        <p class="p2">微信扫描二维码加入教师社区</p>
        <p class="p2"></p>
        <img class="QR" src="@/assets/QR.png"/>
        <p class="logout" @click="logout">登出</p>
      </div>
    </div>
    <div class="overlay" v-if="community" @click="recovery"></div>
  </div>
</template>

<script>
    export default {
      data(){
          return{
            disabled: false,
            community:false,
            width:'',
            height:''
          }
      },
      methods:{
        refresh:function () {
          this.disabled = true
          location.reload()
          var img = document.getElementById('image')
          var deg = 0
          setInterval(function () {
            deg += 90;
            img.style.transform = "rotate(" + deg+ "deg)";
          },400)

        },
        showMenu:function () {
          this.community = true
          document.body.parentNode.style.overflow = "hidden"
        },
        logout:function () {
          AV.User.logOut()
          this.$router.push({path: '/'})
        },
        recovery:function () {
          this.community = false
          document.body.parentNode.style.overflow = "scroll"
        }
      }
    }
</script>

<style scoped>
  .menu{
    margin-top: 16px;
    float: left;
    margin-left: 50px;
    margin-right: 20px;
  }
  .header{
    position: fixed;
    z-index: 100;
    background-color: white;
    border-bottom   : darkgray solid 1px;
    height: 70px;
    width: 100%;
  }
  .sunshine{
    float: left
  }
  .refresh{
    float: right;
    margin-top: 10px;
  }
  .ziti{
    font-size: 20px;
    vertical-align:middle
  }
  .community{
    position: fixed;
    height: 1000px;
    width: 400px;
    background-color: white;
    margin-top: -100px;
    z-index: 1000;
  }
  .overlay{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,.8);
    z-index: 200;
  }
  .titel-community{
    margin-top: 100px;
    text-align:left;
    margin-left: 80px;
  }
  .titel-community .logo{
    vertical-align:middle
  }
  .titel-community span{
    font-weight:bold;
    font-size: 25px;
  }
  .titel-community .p1{
    font-size: 23px;
  }
  .titel-community .p2{
    font-size: 20px;
    text-align:left;
    margin-right: 40px;
  }
  .titel-community .QR{
    margin-left: -20px;
  }
  .titel-community .logout{
    margin-top: 50px;
    font-size: 20px;
    /*margin-right: 110px;*/
  }

</style>
