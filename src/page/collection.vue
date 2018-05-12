<template>
  <div>
    <Header :Headlines="Headlines" :reset="reset"/>
    <div class="noLike" v-if="lesson.length>0?false:true">
      <img src="../../static/image/favourite_add_29.svg"/>
      <p>还没有收藏过课程呢</p>
      <el-button  @click="lookLesson">浏览课程</el-button>
    </div>
  </div>

</template>

<script>
    export default {
        data(){
          return{
            lesson:[],
            Headlines:'我的收藏',
            reset:false
          }
        },
      methods:{
        lookLesson:function () {
          this.$router.push({path:'/song'})
        }
      }
    }
</script>

<style scoped>
  .noLike{
    padding-top: 250px;
  }
</style>
