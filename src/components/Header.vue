<template>
  <div class="header">
    <el-row>
    <el-col  :span="12">
    <img class="menu" src="@/assets/menu.png" @click="showMenu"/>
    <h3 class="sunshine">{{Headlines}}</h3>
    </el-col >
    <el-col  :span="5" class="refresh" >
      <el-button v-if="reset" size="small":disabled="disabled" @click="refresh">
        <img id="image" style="vertical-align:middle" src="@/assets/refresh_69.svg"/>
        <span class="ziti">刷新</span>
      </el-button>
    </el-col >
    </el-row>
    <div class="community" v-if="community">
      <div class="titel-community">
        <el-row class="sunBoxTitel">
          <img  class="logo" src="@/assets/page_1.svg"/>
          <span class="sunBox">阳光盒子</span>
        </el-row>
        <el-row>
          <div class="block" @click="showLesson">
            <img class="listImg" :src="allLessonImg"/>
            <span :class="lesson">全部课程</span>
          </div>
          <div class="block" @click="favorite">
            <img class="listImg" :src="likeImg"/>
            <span :class="like">我的收藏</span>
          </div>
        </el-row>
        <el-row>
          <p class="author text">加入阳光“阳光创育者”</p>
          <div>
            <span class="logout text" @click="logout">登出</span>
            <span class="user">{{userId}}</span>
          </div>
        </el-row>
      </div>
    </div>
    <div class="overlay" v-if="community" @click="recovery"></div>
  </div>
</template>

<script>
    export default {
      props:{
        Headlines:String,
        reset:Boolean
      },
      data(){
          return{
            disabled: false,
            community:false,
            width:'',
            height:'',
            lesson:'height',
            allLessonImg : '../../static/image/readlight.svg',
            like: false,
            likeImg : '../../static/image/default.svg',
            userId:''
          }
      },
      mounted:function(){
        var current = AV.User.current()
        this.userId = current.toJSON().mobilePhoneNumber
        this.highlight(this.reset)
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
          window.clearInterval(useTime)
          AV.User.logOut()
          this.$router.push({path: '/'})
          document.body.parentNode.style.overflow = "scroll"
        },
        recovery:function () {
          this.community = false
          document.body.parentNode.style.overflow = "scroll"
        },
        showLesson:function () {
          this.$router.push({path:'/song'})
          this.community = false
          document.body.parentNode.style.overflow = "scroll"
        },
        favorite:function () {
          this.$router.push({path:'/collection'})
        },
        highlight:function (status) {
          if(status){
            this.lesson = 'height'
            this.like = false
            this.allLessonImg = '../../static/image/readlight.svg'
            this.likeImg = '../../static/image/default.svg'
          }else {
            this.lesson = false
            this.like = 'height'
            this.allLessonImg = '../../static/image/read.svg'
            this.likeImg = '../../static/image/highlight.svg'
          }
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
  .titel-community .sunBoxTitel{
    margin-bottom: 40px;
  }
  .titel-community .logo{
    vertical-align:middle
  }
  .titel-community .sunBox{
    font-weight:bold;
    font-size: 25px;
    margin-bottom: 20px;
  }
  .titel-community .block{
    margin-bottom: 20px;
  }
  .titel-community .height{
    color: #f09028;
  }

  .titel-community .listImg{
    margin-bottom: -6px;
    margin-right: 20px;
  }
  .titel-community .author{
    margin-bottom: 30px;
  }
  .titel-community .user{
    margin-left: 10px;
    font-size: 12px;
    color: #999999;
  }

</style>
