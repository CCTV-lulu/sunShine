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
      <div class="titel">
        <img  class="logo" src="@/assets/page_1.svg"/>
        <span>阳光盒子</span>
        <p class="p1">加入教师社区</p>
        <p class="p2">微信扫描二维码加入教师社区</p>
        <p class="p2"></p>
        <img class="QR" src="@/assets/QR.png"/>
        <p class="logout" @click="logout">登出</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      data(){
          return{
            disabled: false,
            community:false
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
        },
        logout:function () {
          AV.User.logOut()
          this.$router.push({path: '/'})
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
    width: 300px;
    background-color: white;
    margin-top: -100px;
    z-index: 1000;
  }
  .titel{
    margin-top: 100px;
  }
  .titel .logo{
    /*margin-left: -100px;*/
    vertical-align:middle
  }
  .titel span{
    margin-left: 10px;
    font-weight:bold;
    font-size: 25px;
  }
  .titel .p1{
    font-size: 23px;
  }
  .titel .p2{
    font-size: 20px;
    margin-left: 80px;
    text-align:left;
    margin-right: 40px;
  }
  .titel .QR{
    margin-left: 50px;
  }
  .titel .logout{
    margin-top: 50px;
    font-size: 20px;
    margin-right: 110px;
  }

</style>
