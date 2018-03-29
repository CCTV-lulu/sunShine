<template>
  <div>
    <div class="head">
      <el-row>
        <img class="menu" src="@/assets/back.png" @click="back"/>
        <h3>绘本</h3>
      </el-row>
    </div>
    <div class="box">
      <el-carousel :interval="4000" arrow="always" height="800px">
        <el-carousel-item v-for="(item, index) in pictures" :key="item">
          <img class="picture" :src="item"/>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pictures: []
      }
    },
    mounted: function () {
      this.getPicture()
    },
    methods: {
      back: function () {
        this.$router.back(-1)
      },
      getPicture: function () {
        console.log('------------')
        var self = this
        var picturesId = this.$route.query.pictures
        var query = new AV.Query('Material')
        var todoFolder = AV.Object.createWithoutData('Material', picturesId);
        query.equalTo('parent', todoFolder);
        query.find().then(function (result) {
          result.forEach(function (item) {
            self.pictures.push(item.attributes.file.attributes.url)
          })
        })
      }
    }
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

  .picture {
    width: 100%;
    height: 100%;
  }
  .head{
    position: fixed;
    z-index: 100;
    background-color:white;
    border-bottom   : darkgray solid 1px;
    height: 70px;
    width: 100%;
    /*margin-top: -15px;*/
  }
  .menu{
    margin-top: 16px;
    float: left;
    margin-left: 50px;
    margin-right: 20px;
  }
  h3{
    float: left
  }
</style>
