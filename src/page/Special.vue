<template>
    <div>
      <Header :Headlines="Headlines"/>
      <div class="special">
        <p class="specialTitle titel">推荐专题</p>
        <div class="el-carousel-special">
          <el-carousel :interval="4000" type="card" height="350px">
            <el-carousel-item v-for="(item,index) in recommend" :key="index" >
              <img :src="item.picture.url" @click="toSpecialSub(item.objectId)"></img>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="allSpecial">
        <p class="allTitle titel">全部专题</p>
        <div v-for="(item) in specialLesson" class="specialList">
          <div class="oneSpecial" @click="toSpecialSub(item.objectId)">{{item.title}}</div>
        </div>
      </div>

    </div>

</template>

<script>
    import Data from "@/js/server.js"
    export default {
        data(){
          return{
            Headlines:'阳光盒子',
            specialLesson:[],
            recommend:[]
          }
        },
      mounted:function () {
        this.getLesson()
        this.checkLongin()
      },
      methods:{
          getLesson:function () {
            var self = this
            Data.getSpecial(function (result) {
                self.specialLesson = result.allSpecial
                self.recommend = result.recommend
            })
          },
          toSpecialSub:function (id) {
            this.$router.push({path:'/specialList/'+id})
          },
          checkLongin:function () {
            var self = this
            var currentUser = AV.User.current();
            if (currentUser == null) {
              self.$router.push({path:'/'})
            }
          },
      }
    }
</script>

<style scoped>
  .special{
    margin-left: 10%;
    margin-right: 10%;
    padding-top: 100px;
  }
  .titel{
    text-align: left;
    color: #6f7180;
    font-weight: bold;
  }
  .el-carousel-special{
    /*width: 90%;*/
  }
  .allSpecial{
    margin-left: 10%;
    width: 80%;
  }
  .specialList{
    /*margin-left: 10%;*/
  }
  .oneSpecial{
    float: left;
    line-height: 50px;
    margin-right:30px;
    margin-top: 30px;
    height: 50px;
    width: 130px;
    border-radius: 5px;
    border-color: #99a9bf;
    border-style: solid;
    border-width: 1px;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
