<template>
  <div>
    <div class="head">
      <el-row>
        <img class="menu" src="@/assets/back.png" @click="back"/>
        <h3 class="lessonName">{{name}}</h3>
      </el-row>
    </div>
    <div class="body">
      <div>{{describe}}</div>
    </div>
  </div>
</template>

<script>
    import Data from "@/js/server.js"
    export default {
      data(){
        return{
          name:'',
          describe:'',
          lessons:[]
        }
      },
      mounted:function () {
        this.getLesson()
      },
      methods:{
        getLesson:function(){
          var self = this
          var specialId = self.$route.params.id
          Data.getSpecialLesson(specialId,function (result) {
            self.lessons = result
          })
          Data.getOneSpection(specialId,function (result) {
            self.name = result.title
            self.describe = result.describe
          })
        },
        back: function () {
          this.$router.back(-1)
        },
      }
    }
</script>

<style scoped>
  .head{
    position: fixed;
    z-index: 100;
    background-color:white;
    border-bottom   : darkgray solid 1px;
    height: 70px;
    width: 100%;
  }
  .lessonName{
    margin-top: 23px;
    float: left
  }
  .menu{
    margin-top: 16px;
    float: left;
    margin-left: 50px;
    margin-right: 20px;
  }
  .body{
    padding-top: 130px;
  }
</style>
