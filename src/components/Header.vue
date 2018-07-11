<template>
  <div class="header">
    <el-row>
      <el-col  :span="9">
      <img class="menu" src="@/assets/menu.png" @click="showMenu"/>
      <h3 class="sunshine">{{Headlines}}</h3>
      </el-col >
    <!--<el-col  :span="5" class="refresh" >-->
      <!--<el-button v-if="reset" size="small":disabled="disabled" @click="refresh">-->
        <!--<img id="image" style="vertical-align:middle" src="@/assets/refresh_69.svg"/>-->
        <!--<span class="ziti">刷新</span>-->
      <!--</el-button>-->
    <!--</el-col >-->
      <el-col class="all-lesson" :span="10">
        <el-menu  class="el-menu-demo" mode="horizontal"
                  text-color="black"
                  active-text-color="#f09028" :default-active="$route.path" :router="true">
          <el-menu-item class="el-menu-item-demo" index="/song">全部课程</el-menu-item>
          <el-menu-item class="el-menu-item-demo" index="/special">专题</el-menu-item>
        </el-menu>
      </el-col>

    </el-row>
    <div class="community" v-if="community">
      <div class="titel-community">
        <el-row class="sunBoxTitel">
          <img  class="logo" src="../../static/image/logo.png"/>
          <span class="sunBox">阳光盒子</span>
          <p class="user">{{userId}}</p>
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
          <p class="author text" @click="See(url)">加入“阳光创育者”</p>
          <div>
            <span class="logout text" @click="logout">登出</span>
          </div>
        </el-row>
      </div>
    </div>
    <div class="overlay" v-if="community" @click="recovery"></div>
  </div>
</template>

<script>
  import Analytics from "@/js/analytics.js"
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
          AV.User.logOut()
          this.$router.push({path: '/'})
          var currentUser = AV.User.current();
          var endtime=new Date().getTime()
          Analytics.useApp(currentUser.toJSON().objectId,window.localStorage.getItem('openTime'),endtime)
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
        },
        See:function (e) {
          window.location.href = 'https://mp.weixin.qq.com/s/6_cLqHvVkZ9o2w0PBObOCw'
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
  .el-menu-demo{
    padding-left: 50px;
  }
  .el-menu-item-demo{
    margin-left: 20px;
    font-weight: 600;
    width: 100px;
    height: 69.6px;
  }
  .sunshine{
    float: left
  }

  .community{
    position: fixed;
    height: 1000px;
    width: 300px;
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
    margin-bottom: 20px;
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
    font-size: 18px;
    color: #999999;
  }

</style>
