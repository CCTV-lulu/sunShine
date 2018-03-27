<template>
  <div class="container">
  <Video :sources="video.sources" :options="video.options"></Video>
  </div>
</template>

<script>
    export default {
        name: "",
      data(){
          return{
            video: {
              sources: [{
                // src: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
                src:'./static/ab5b150b8886c496d59b.mp4',
                type: 'video/mp4'
              }],
              options: {
                autoplay: true,
                volume: 0.6,
                poster: ''
              }
            }

          }
      }
    }
</script>

<style scoped>

</style>
