<template>
  <div>
    <div class="head">
      <el-row>
        <img class="menu" src="@/assets/back.png" @click="back"/>
        <h3 class="lessonName">{{name}}</h3>
      </el-row>
    </div>
    <div class="body">
      <div class="describe" v-if="describe">{{describe}}</div>
      <div v-if="lessons.length > 0" style="min-width: 1200px;margin-left: 15%">
        <el-col :span="6" v-for="(item, index) in lessons" :key="index">
          <div class="list" >
            <img @click="details(item.id +(item.verstion || ''),item.subject,item.name)" v-if="item.subject == 'song'" src="@/assets/group_5.png"/>
            <img @click="details(item.id +(item.verstion || ''),item.subject,item.name)" v-if="item.subject == 'music'" src="@/assets/group_6.png"/>
            <img @click="details(item.id +(item.verstion || ''),item.subject,item.name)" v-if="item.subject == 'play'" src="@/assets/group_8.png"/>
            <img @click="details(item.id +(item.verstion || ''),item.subject,item.name)" v-if="item.subject == 'read'" src="@/assets/group_7.png"/>
            <img @click="details(item.id +(item.verstion || ''),item.subject,item.name)" v-if="item.isChecked == 1? true :false" class="status" src="../../static/image/group_14.svg"/>
            <img class="heart" v-if="item.like" src="../../static/image/inversesolid.svg"/>
            <p>{{item.like}}</p>
            <div style="padding: 14px;">
              <span>{{item.name}}</span>
            </div>
          </div>
        </el-col>
      </div>
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
          Data.getSpecialLesson(specialId,function (lesson) {
            lesson.forEach(function (item) {
              Data.checkoutLike(function (result) {
                if(result.indexOf(item.id) != -1){
                  item.like = true
                }else {
                  item.like = false
                }
              })
            })
            self.lessons = lesson
          })
          Data.getOneSpection(specialId,function (result) {
            self.name = result.title
            self.describe = result.describe
          })
        },
        back: function () {
          this.$router.back(-1)
        },
        details:function (id,subject,name) {
          this.$router.push({
            path:'/lesson/'+id
          })
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
    padding-top: 70px;
  }
  .describe{
    width: 60%;
    margin-top:60px;
    position: relative;
    /*float: left;*/
    text-align: left;
    font-size: 19px;
    margin-left: 20%;
  }
  .describe:before{
    position: absolute;
    content: "";
    top: -35px;
    left: -50px;
    height: 32px;
    width: 32px;
    background-image: url('../../static/image/specialTop.png');
    background-repeat:no-repeat;
  }
  .describe:after{
    position: absolute;
    content: "";
    top: 100%;
    right: -40px;
    height: 32px;
    width: 32px;
    background-image: url('../../static/image/specialBottom.png');
    background-repeat:no-repeat;
  }
  .list{
    padding-top: 80px;
  }
  .heart{
    position: relative;
    z-index: 80;
    top: -150px;
    left: 80px;
  }
</style>
