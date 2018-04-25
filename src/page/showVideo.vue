<template>
  <div>
    <div class="head">
      <el-row>
        <img class="menu" src="@/assets/back.png" @click="back"/>
        <h3 class="huiben">{{name}}</h3>
      </el-row>
    </div>
  <Video :sources="video.sources" :options="video.options"></Video>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          video: {
            sources: [],
            options: {
              autoplay: true,
              volume: 0.6,
              poster: ''
            }
          },
          name:''
        }
      },
      mounted:function () {
        this.getVideo()
      },
      methods:{
        back: function () {
          this.$router.back(-1)
        },
        getVideo:function () {
          var self = this
          var id = this.$route.params.id
          var query = new AV.Query('Material');
          query.get(id).then(function (todo) {
            var videoUrl = todo.attributes.file.attributes.url
            self.name = todo.attributes.file.attributes.name
            self.video.sources.push({
              src: videoUrl,
              type: 'video/mp4'
            })
          }, function (error) {
            // 异常处理
          });
        }
      }
    }
</script>

<style scoped>
  .head{
    /*position: fixed;*/
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
  .huiben{
    float: left
  }
</style>
