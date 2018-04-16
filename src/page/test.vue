<template>
  <Video :sources="video.sources" :options="video.options"></Video>
</template>

<script>
    export default {
        name: "test",
      data () {
        return {
          video: {
            sources: [{
              src: './static/output.mp4',
              type: 'video/mp4'
            }],
            options: {
              autoplay: true,
              volume: 0.6,
              poster: 'http://covteam.u.qiniudn.com/poster.png'
            }
          }
        }
      }
    }
</script>

<style scoped>

</style>
