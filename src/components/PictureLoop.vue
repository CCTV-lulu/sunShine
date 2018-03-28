<template>
  <el-carousel :interval="4000" arrow="always" height="900px">
    <el-carousel-item v-for="(item, index) in pictures" :key="item">
      <img :src="item"/>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      pictures:Array,
    },
  }
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  img {
    width: 100%;
    height: 100%;
  }
</style>
