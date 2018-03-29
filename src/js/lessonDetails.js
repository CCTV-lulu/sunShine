export default {
  data() {
    return {
      name: '',
      images:[],
      audioName:'音频',
      videoName:'视频',
      showAudio: false,
      audioList: {
        //音频组件地址,只能传递一个,如果需要传递多个,可以自己修改源码  换成数组或者json
        url: "",
        //这个音频文件的长度,因为一般都是异步获取到音频地址才能初始化audio的,所以这个参数父传递给子合适点
        audioname:''
      },
      video: {
        sources: [{
          src: 'http://covteam.u.qiniudn.com/oceans.mp4',
          type: 'video/mp4'
        }],
        options: {
          autoplay: true,
          volume: 0.6,
          poster: 'http://covteam.u.qiniudn.com/poster.png'
        }
      },
      comment: {
        body: ''
      }
    }
  },
  mounted: function () {
    this.getMaterialId()
    this.getParams()
    this.getPlan()
  },
  methods: {
    getParams: function () {
      var self = this
      self.name = self.$route.query.className
    },
    back: function () {
      this.$router.back(-1)
    },
    playVideo: function () {
      if (this.Audio == true) {
        this.showAudio = true
      }
      else {
        this.$notify({
          title: '提示',
          message: '此课程暂时没有音频材料',
          offset: 200
        });
      }
    },
    playImage: function () {
      var self = this
      if (self.Atlas == true) {
        //有图集信息则播放
        self.$router.push({
          path:'/pictureLoop',
          name:'PictureLoop',
          query:{
            pictures:self.atlasId
          }
        })
      } else {
        self.$notify({
          title: '提示',
          message: '此课程暂时没有绘本材料',
          offset: 200
        });
      }
    },
    playPdf: function () {
      if (this.pdf) {
        //展示绘本
      } else {
        this.$notify({
          title: '提示',
          message: '此课程暂时没有文档材料',
          offset: 200
        });
      }
    },
    getMaterialId: function () {
      var self = this
      var id = self.$route.query.id
      var query = new AV.Query('LessonMaterial')
      var lessonId = AV.Object.createWithoutData('Lesson', id);
      query.equalTo('lesson', lessonId);
      query.find().then(function (result) {
        result.forEach(function (item) {
          var materialId = item.attributes.material.id
          self.getMaterials(materialId)
        })
      })
    },
    getMaterials: function (materialId) {
      var self = this
      var query = new AV.Query('Material')
      query.equalTo('objectId', materialId);
      query.find().then(function (todo) {
        todo.forEach(function (key) {
          //判断type，决定是什么音频还是视频文件1 音频 2 视频 3图片 0文件夹
          // console.log(key)
          if (key.attributes.type == 2) {
            self.Video = true
            self.getVideo(key)
          }
          else if (key.attributes.type == 3) {
            self.image = true
            self.getImage(key)
            self.getPlan()
          }
          else if (key.attributes.type == 0) {
            self.Atlas = true
            self.image = true
            self.getAtlas(key)
            self.getPlan()
          }
          else if (key.attributes.type == 1) {
            self.Audio = true
            self.getAudio(key)
          }
        })
      })
    },
    getAudio: function (item) {
      var self = this
      self.audioName = item.attributes.name
      var url = item.attributes.file.attributes.url
      self.audioList.url = url
      self.audioList.audioname = item.attributes.name
    },
    getImage: function (item) {
      console.log('----------------image')
      var self = this
      self.images.push({'imageObjectId':item.id,'imageUrl':item.attributes.file.attributes.url})
    },
    getAtlas: function (item) {
      console.log('---------------图集')
      var self = this
      self.atlasId = item.id
      var query = new AV.Query('Material')
      var todoFolder = AV.Object.createWithoutData('Material', self.atlasId);
      query.equalTo('parent', todoFolder);
      query.find().then(function (result) {
        result.forEach(function (item) {
          self.images.push({'imageObjectId':item.id,'imageUrl':item.attributes.file.attributes.url})
        })
      })
    },
    getVideo: function (item) {
      console.log(item)
      this.videoName = item.attributes.name
      console.log('--------------------Video')
    },
    getPdf: function () {
      //文档信息
    },
    getPlan: function () {
      var self = this
      var planId = self.$route.query.planId
      var query = new AV.Query('LessonPlan')
      query.equalTo('objectId', planId)
      query.find().then(function (result) {
        result.forEach(function (item) {
          if (self.image == true) {
            var markdown = item.attributes.content
            self.images.forEach(function (oneImage) {
              markdown = markdown.replace(oneImage.imageObjectId, oneImage.imageUrl)
            })
            self.comment.body = markdown
          } else {
            self.comment.body = item.attributes.content
          }
        })
      })
    }

  }
}
