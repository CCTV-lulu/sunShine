import Data from "@/js/server.js"
import Analytics from "@/js/analytics.js"
export default {
  data() {
    return {
      name: '',
      images:[],
      audioName:'音频',
      videoList:[],
      showAudio: false,
      pdf: false,
      Audio:false,
      Atlas:false,
      Video:false,
      manifestUrl:false,
      materialHistory:false,
      lessonTime:null,
      likeImgUrl:"../../static/image/default.svg",
      likeStatus:false,
      audioList: {
        //音频组件地址,只能传递一个,如果需要传递多个,可以自己修改源码  换成数组或者json
        url: "",
        //这个音频文件的长度,因为一般都是异步获取到音频地址才能初始化audio的,所以这个参数父传递给子合适点
        audioname:''
      },
      comment: {
        body: ''
      },
      guide:false,
      allHide:false,
      leader:false
    }
  },
  mounted: function () {
    var self = this
    self.getMaterialId()
    self.getParams()
    self.inspectLike()
    self.lessonTime = setInterval(function(){
      self.burLessonTime();
    },60000)
    self.guide = guideLesson
    if(self.guide){
      this.allHide = this.guide
      document.body.parentNode.style.overflow = "hidden"
    }
  },
  methods: {
    burLessonTime:function(){
      var self = this
      var actionList = ['openLessonTime']
      Analytics.analytics(actionList,self.name)
    },
    burPoint:function(resName,resType){
      var actionList = ['sourceOpen']
      var userId = AV.User.current().toJSON().objectId
      Analytics.openRes(resName,userId,resType)
    },
    getParams: function () {
      var self = this
      var id = self.$route.params.id
      var sign = id.substring(id.length-3,id.length)
      if(sign == 'his'){
        var lessonId = id.substring(0,id.length-3)
        var startDateQuery = new AV.Query('LessonSnapshot');
        startDateQuery.equalTo('lessonId',lessonId)
        var endDateQuery = new AV.Query('LessonSnapshot');
        startDateQuery.equalTo('isChecked', 3);
        var query = AV.Query.and(startDateQuery, endDateQuery);
        query.find().then(function (result) {
          if (result.length == 1){
            self.manifestUrl = result[0].toJSON().manifest_json.url //只有一个版本的json路径
          }else if (result.length >1){
            var version = 1
            var lesson =''
            result.forEach(function (item) {
              if (item.attributes.version_code > version){
                version = item.attributes.version_code
                lesson = item.toJSON().manifest_json.url
              }
            })
            self.manifestUrl = lesson //有版本号最大的json路径
          }
          self.getHistoryJson(self.manifestUrl) //获取json内容
        })
      }else {
        var query = new AV.Query('Lesson')
        query.get(id).then(function (todo) {
          self.name = todo.attributes.name;
          self.planId = todo.attributes.plan.id
          self.getPlan()
        }, function (error) {
          // 异常处理
        })
      }
    },
    getHistoryJson:function (jsonUrl) {
      var self = this
      self.$http.get(jsonUrl).then(function (response) {
        self.comment.body = response.data.content
        self.name = response.data.name
        self.materialHistory = response.data.materials
        if(self.materialHistory){
          self.getMaterials()
        }
      })
    },
    back: function () {
      clearInterval(this.lessonTime)
      this.$router.back(-1)
    },
    playVideo:function (id,resName) {
      var self = this
      self.burPoint(resName,'视频')
      self.$router.push({
        path:'/video/'+id,
      })
    },
    playAudio: function (resName) {
      this.burPoint(resName,'音频')
      this.showAudio = true
    },
    playImage: function () {
      var self = this
      self.burPoint(self.name,'绘本')
      self.$router.push({
        path:'/pictureLoop/'+self.atlasId,
      })

    },
    playPdf: function () {
      this.burPoint()
      //todo
      //展示绘本
    },
    getMaterialId: function () {
      var self = this
      var id = self.$route.params.id
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
      if(self.materialHistory){
        self.materialHistory.forEach(function (key) {
          //判断type，决定是什么音频还是视频文件1 音频 2 视频 3图片 0文件夹
          if (key.type == 2) {
            self.Video = true
            self.getVideo(key)
          }
          else if (key.type == 3) {
            self.image = true
            self.getImage(key)
            if (self.image == true) {
              var markdown = self.comment.body
              self.images.forEach(function (oneImage) {
                markdown = markdown.replace(oneImage.imageObjectId, oneImage.imageUrl)
              })
              self.comment.body = markdown
            }
            //展示教案里面的图片
          }
          else if (key.type == 0) {
            self.Atlas = true
            self.image = true
            self.getAtlas(key)
            if (self.image == true) {
              var markdown = self.comment.body
              self.images.forEach(function (oneImage) {
                markdown = markdown.replace(oneImage.imageObjectId, oneImage.imageUrl)
              })
              self.comment.body = markdown
            }
            //展示教案里面的图片
          }
          else if (key.type == 1) {
            self.Audio = true
            self.getAudio(key)
          }
        })
      }else {
        var query = new AV.Query('Material')
        query.equalTo('objectId', materialId);
        query.find().then(function (todo) {
          todo.forEach(function (key) {
            //判断type，决定是什么音频还是视频文件1 音频 2 视频 3图片 0文件夹
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
      }

    },
    getAudio: function (item) {
      var self = this
      self.audioName = item.attributes ? item.attributes.name : item.name
      var url = item.attributes ? item.attributes.file.attributes.url : item.url
      self.audioList.url = url
      self.audioList.audioname = item.attributes ? item.attributes.name : item.name
    },
    getImage: function (item) {
      var self = this
      self.images.push({'imageObjectId':item.id,'imageUrl':item.attributes ? item.attributes.file.attributes.url:item})
    },
    getAtlas: function (item) {
      var self = this
      self.atlasId = item.id
      // var query = new AV.Query('Material')
      // var todoFolder = AV.Object.createWithoutData('Material', self.atlasId);
      // query.equalTo('parent', todoFolder);
      // query.find().then(function (result) {
      //   result.forEach(function (item) {
      //     self.images.push({'imageObjectId':item.id,'imageUrl':item.attributes.file.attributes.url})
      //   })
      // })
      //忘记了为什么写这里
    },
    getVideo: function (item) {
      this.videoList.push({'videoName':item.attributes ? item.attributes.name : item.name,'videoId':item.id})
      this.videoName = item.attributes ? item.attributes.name : item.name
    },
    getPdf: function () {
      //todo
      //文档信息
    },
    getPlan: function () {
      var self = this
      var planId = self.planId
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
    },
    changeLike:function () {
      var self = this
      if(self.likeStatus == false){
        self.likeStatus = true
        self.likeImgUrl = '../../static/image/on.svg'
        var timestamp = Date.parse(new Date());
        var lessonId = ''
        var id = self.$route.params.id
        var sgin = id.substring(id.length-3,id.length)
        if(sgin == 'his'){
          lessonId = id.substring(0,id.length-3)
        }else {
          lessonId = self.$route.params.id
        }
        var data ={"collectionActionArr" : [{
          "lessonId" : lessonId,
          "lastModificationTime": timestamp,
          "action" : self.likeStatus
        }]}
        AV.Cloud.run('collection', data).then(
          function (value) {
            self.$message({
              type: 'success',
              message: '收藏课程成功'
            })
            res.send(value)
          }, function (error) {
            self.$message({
              type: 'error',
              message: '收藏课程失败'
            })
            res.send(error)
          }
        )
      }else {
        self.likeStatus = false
        self.likeImgUrl = '../../static/image/default.svg'
        var timestamp = Date.parse(new Date());
        var id = self.$route.params.id
        var lessonId
        var id = self.$route.params.id
        var sgin = id.substring(id.length-3,id.length)
        if(sgin == 'his'){
          lessonId = id.substring(0,id.length-3)
        }else {
          lessonId = self.$route.params.id
        }
        var data ={"collectionActionArr" : [{
            "lessonId" : lessonId,
            "lastModificationTime": timestamp,
            "action" : self.likeStatus
          }]}
        AV.Cloud.run('collection', data).then(
          function (value) {
            self.$message({
              type: 'success',
              message: '取消收藏'
            })
            res.send(value)
          }, function (error) {
            self.$message({
              type: 'error',
              message: '取消收藏失败'
            })
            res.send(error)
          }
        )
      }

    },
    inspectLike:function () {
      var self = this
      var lessonId = ''
      var id = self.$route.params.id
      var sgin = id.substring(id.length-3,id.length)
      if(sgin == 'his'){
        lessonId = id.substring(0,id.length-3)
      }else {
        lessonId = self.$route.params.id
      }
      Data.checkoutLike(function (result) {
        if(result.indexOf(lessonId) != -1){
          self.likeStatus = true
          self.likeImgUrl = '../../static/image/on.svg'
        }
      })
    },
    next:function(){
      this.leader = true
      this.allHide = false
    },
    recovery:function () {
      this.guide = false
      guideLesson = false
      document.body.parentNode.style.overflow = "scroll"
    }
  }


}
