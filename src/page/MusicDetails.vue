<template>
  <!--<div class="container">-->
  <!--<Video :sources="video.sources" :options="video.options"></Video>-->
  <!--</div>-->
  <div>
    <PictureLoop :pictures="pictures"></PictureLoop>
  </div>
</template>

<script>
    // export default {
    //     name: "",
    //   data(){
    //       return{
    //         video: {
    //           sources: [{
    //             // src: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
    //             src:'./static/ab5b150b8886c496d59b.mp4',
    //             type: 'video/mp4'
    //           }],
    //           options: {
    //             autoplay: true,
    //             volume: 0.6,
    //             poster: ''
    //           }
    //         }
    //
    //       }
    //   }
    // }
    export default {
      data(){
        return{
          pictures: ['http://lc-CQBviH8f.cn-n1.lcfile.com/0851e7b0c8d6fac65a80.jpg',
            'http://lc-CQBviH8f.cn-n1.lcfile.com/0bd6b210c8db13ef7db3.jpg',
            'http://lc-CQBviH8f.cn-n1.lcfile.com/7bfc34b563ea81251f7a.jpg']
        }
      }
    }
</script>

<style scoped>

</style>
