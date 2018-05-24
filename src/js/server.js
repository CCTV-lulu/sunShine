import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
export default {
  getRoles:function (cb) {
    var currentUser = AV.User.current();
    if (!currentUser) return cb(false);
    currentUser.getRoles().then(function(roles){

      var isAdmin  = true;
      for(let i = 0; i< roles.length; i++){
        if(roles[i].toJSON().name === 'teacher'){
          isAdmin = false;
          break
        }
      }
      if(!isAdmin) return cb(false);
      else return cb(true)
    }).catch(function(){
      cb(false)
    })
  },
    getAllData:function (cb) {
    var self = this
    this.getRoles(function (result) {
      var subjects = {'song':[],'music':[],'read':[],'play':[]}
      if (result === true){
        self.adminSubLesson(subjects,function (result) {
          cb(result)
        })
      }else {
        self.teacherSubLesson(subjects,function (result) {
          cb(result)
        })
      }
    })
  },
  adminSubLesson:function(subjects,cb){
    var self = this
    var priorityQuery = new AV.Query('Lesson');
    priorityQuery.equalTo('isPublished', true);
    var statusQuery = new AV.Query('Lesson');
    statusQuery.equalTo('isChecked', 1);
    var query = AV.Query.or(priorityQuery, statusQuery);
    query.find().then(function (result) {
      result.forEach(function (key) {
        var subject = key._serverData.subject.id
        var checkedStatus = key.attributes.isChecked
        if (subject === '5a8e908dac502e0032b6225d') {
          subjects.play.push({'name': key.attributes.name, 'id': key.id, 'isChecked': checkedStatus})
          if(checkedStatus ==1){
            self.getHistoryLesson(key.id,function (result) {
              Vue.http.get(result).then(function (response) {
                subjects.play.push({'name':response.data.name,'id':response.data.id ,'verstion':'his'})
              })
            })
          }
        }
        else if (subject === '5a701c82d50eee00444134b2') {
          subjects.read.push({'name': key.attributes.name, 'id': key.id, 'isChecked': key.attributes.isChecked})
          if(checkedStatus ==1){
            self.getHistoryLesson(key.id,function (result) {
              Vue.http.get(result).then(function (response) {
                subjects.read.push({'name':response.data.name,'id':response.data.id ,'verstion':'his'})
              })
            })
          }
        }
        else if (subject === '5a741bcb2f301e003be904ed') {
          subjects.music.push({'name': key.attributes.name, 'id': key.id, 'isChecked': key.attributes.isChecked})
          if(checkedStatus ==1){
            self.getHistoryLesson(key.id,function (result) {
              Vue.http.get(result).then(function (response) {
                subjects.music.push({'name':response.data.name,'id':response.data.id ,'verstion':'his'})
              })
            })
          }
        }
        else {
          subjects.song.push({'name': key.attributes.name, 'id': key.id,'isChecked': key.attributes.isChecked})
          if(checkedStatus ==1){
            self.getHistoryLesson(key.id,function (result) {
              Vue.http.get(result).then(function (response) {
                subjects.song.push({'name':response.data.name,'id':response.data.id ,'verstion':'his'})
              })
            })
          }
        }
      })
      cb(subjects)
    },function (err) {
      console.log(err)
    })
  },
  teacherSubLesson:function(subjects,cb){
    var self = this
    var query = new AV.Query('Lesson')
    query.equalTo('isPublished',true)
    query.find().then(function (result) {
      result.forEach(function (key) {
        if(key.attributes.isChecked ===3 || key.attributes.isChecked ===0){
          var subject = key._serverData.subject.id
          if (subject == '5a8e908dac502e0032b6225d'){
            subjects.play.push({'name':key.attributes.name,'id':key.id })
          }
          else if (subject == '5a701c82d50eee00444134b2'){
            subjects.read.push({'name':key.attributes.name,'id':key.id })
          }
          else if(subject == '5a741bcb2f301e003be904ed'){
            subjects.music.push({'name':key.attributes.name,'id':key.id })
          }
          else {
            subjects.song.push({'name':key.attributes.name,'id':key.id })
          }
        }else if (key.attributes.isChecked === 1 || key.attributes.isChecked === 2) {
          var lessonId = key.id
          self.getHistoryLesson(lessonId,function (result) {
            Vue.http.get(result).then(function (response) {
              var subject = response.data.subjectId
              if (subject == '5a8e908dac502e0032b6225d'){
                subjects.play.push({'name':response.data.name,'id':response.data.id ,'verstion':'his'})
              }
              else if (subject == '5a701c82d50eee00444134b2'){
                subjects.read.push({'name':response.data.name,'id':response.data.id ,'verstion':'his'})
              }
              else if(subject == '5a741bcb2f301e003be904ed'){
                subjects.music.push({'name':response.data.name,'id':response.data.id ,'verstion':'his'})
              }
              else {
                subjects.song.push({'name':response.data.name,'id':response.data.id ,'verstion':'his' })
              }
            },function (err) {

            })
          })

        }
      })
      cb(subjects)
    },function (err) {
      console.log(err)
    })
  },
  getAllTag: function (cb) {
    var self = this
    self.getRoles(function (result) {
      var tag = {'healthy':[],'language':[],'art':[],'science':[],'social':[]}
      if(result === true){
          self.adminTagLesson(tag,function (result) {
            cb(result)
          })
      }else {
        self.teacherTagLesson(tag,function (result) {
          cb(result)
        })
      }
    })
  },
  adminTagLesson:function(tag,cb){
    var self =this
    var priorityQuery = new AV.Query('Lesson');
    priorityQuery.equalTo('isPublished', true);
    var statusQuery = new AV.Query('Lesson');
    statusQuery.equalTo('isChecked', 1);
    var query = AV.Query.or(priorityQuery, statusQuery);
    query.find().then(function (result) {
      result.forEach(function (key) {
        var keyTags = key.attributes.tags
        var subject = key._serverData.subject.id
        var checkedStatus = key.attributes.isChecked
        keyTags.forEach(function (item) {
          if (item == "domain.语言"){
            tag.language.push({'name':key.attributes.name,'id':key.id ,'subject':self.judgeSubject(subject),'isChecked': checkedStatus})
            if(checkedStatus ==1){
              self.getHistoryLesson(key.id,function (result) {
                Vue.http.get(result).then(function (response) {
                  tag.language.push({'name':response.data.name,'id':response.data.id ,'subject':self.judgeSubject(subject),'verstion':'his'})
                })
              })
            }
          }
          if(item =="domain.艺术" ){
            tag.art.push({'name':key.attributes.name,'id':key.id ,'subject':self.judgeSubject(subject),'isChecked': checkedStatus})
            if(checkedStatus ==1){
              self.getHistoryLesson(key.id,function (result) {
                Vue.http.get(result).then(function (response) {
                  tag.art.push({'name':response.data.name,'id':response.data.id ,'subject':self.judgeSubject(subject),'verstion':'his'})
                })
              })
            }
          }
          if(item =="domain.科学"){
            tag.science.push({'name':key.attributes.name,'id':key.id ,'subject':self.judgeSubject(subject),'isChecked': checkedStatus})
            if(checkedStatus ==1){
              self.getHistoryLesson(key.id,function (result) {
                Vue.http.get(result).then(function (response) {
                  tag.science.push({'name':response.data.name,'id':response.data.id ,'subject':self.judgeSubject(subject),'verstion':'his'})
                })
              })
            }
          }
          if(item =="domain.健康"){
            tag.healthy.push({'name':key.attributes.name,'id':key.id ,'subject':self.judgeSubject(subject),'isChecked': checkedStatus})
            if(checkedStatus ==1){
              self.getHistoryLesson(key.id,function (result) {
                Vue.http.get(result).then(function (response) {
                  tag.healthy.push({'name':response.data.name,'id':response.data.id ,'subject':self.judgeSubject(subject),'verstion':'his'})
                })
              })
            }
          }
          if(item =="domain.社会"){
            tag.social.push({'name':key.attributes.name,'id':key.id ,'subject':self.judgeSubject(subject),'isChecked': checkedStatus})
            if(checkedStatus ==1){
              self.getHistoryLesson(key.id,function (result) {
                Vue.http.get(result).then(function (response) {
                  tag.social.push({'name':response.data.name,'id':response.data.id ,'subject':self.judgeSubject(subject),'verstion':'his'})
                })
              })
            }
          }
        })
      })
      cb(tag)
    },function (err) {
      console.log(err)
    })
  },
  teacherTagLesson:function(tag,cb){
    var self = this
    var query = new AV.Query('Lesson')
    query.equalTo('isPublished',true)
    query.find().then(function (result) {
      result.forEach(function (key) {
        if(key.attributes.isChecked ===3 || key.attributes.isChecked ===0){
          var keyTags = key.attributes.tags
          var subject = key._serverData.subject.id
          keyTags.forEach(function (item) {
            if (item == "domain.语言"){
              tag.language.push({'name':key.attributes.name,'id':key.id ,'subject':self.judgeSubject(subject)})
            }
            if(item =="domain.艺术" ){
              tag.art.push({'name':key.attributes.name,'id':key.id ,'subject':self.judgeSubject(subject)})
            }
            if(item =="domain.科学"){
              tag.science.push({'name':key.attributes.name,'id':key.id ,'subject':self.judgeSubject(subject)})
            }
            if(item =="domain.健康"){
              tag.healthy.push({'name':key.attributes.name,'id':key.id ,'subject':self.judgeSubject(subject)})
            }
            if(item =="domain.社会"){
              tag.social.push({'name':key.attributes.name,'id':key.id ,'subject':self.judgeSubject(subject)})
            }
          })
        }
        else if(key.attributes.isChecked === 1 || key.attributes.isChecked === 2) {
          //todo
          //获取历史版本
          var lessonId = key.id
          self.getHistoryLesson(lessonId,function (result) {
            Vue.http.get(result).then(function (response) {
              var keyTags = response.data.tags
              var subject = response.data.subjectId
              keyTags.forEach(function (item) {
                if (item == "domain.语言"){
                  tag.language.push({'name':response.data.name,'id':response.data.id ,'subject':self.judgeSubject(subject),'verstion':'his'})
                }
                if(item =="domain.艺术" ){
                  tag.art.push({'name':response.data.name,'id':response.data.id ,'subject':self.judgeSubject(subject),'verstion':'his'})
                }
                if(item =="domain.科学"){
                  tag.science.push({'name':response.data.name,'id':response.data.id ,'subject':self.judgeSubject(subject),'verstion':'his'})
                }
                if(item =="domain.健康"){
                  tag.healthy.push({'name':response.data.name,'id':response.data.id ,'subject':self.judgeSubject(subject),'verstion':'his'})
                }
                if(item =="domain.社会"){
                  tag.social.push({'name':response.data.name,'id':response.data.id ,'subject':self.judgeSubject(subject),'verstion':'his'})
                }
              })
            },function (err) {

            })
          })
        }

      })
      cb(tag)
    },function (err) {
      console.log(err)
    })
  },
  judgeSubject:function (subject) {
    if(subject == '5a8e908dac502e0032b6225d' ){
      return 'play'
    }
    if(subject == '5a701c82d50eee00444134b2'){
      return 'read'
    }
    if(subject == '5a741bcb2f301e003be904ed'){
      return 'music'
    }else {
      return 'song'
    }
  },
  getHistoryLesson:function (lessonId,cb) {
    var startDateQuery = new AV.Query('LessonSnapshot');
    startDateQuery.equalTo('lessonId',lessonId)
    var endDateQuery = new AV.Query('LessonSnapshot');
    startDateQuery.equalTo('isChecked', 3);
    var query = AV.Query.and(startDateQuery, endDateQuery);
    query.find().then(function (result) {
      if (result.length == 1){
        cb(result[0].toJSON().manifest_json.url)
      }else if (result.length >1){
        var version = 1
        var lesson =''
        result.forEach(function (item) {
          if (item.attributes.version_code > version){
            version = item.attributes.version_code
            lesson = item.toJSON().manifest_json.url
          }
        })
        cb(lesson)
      }

    })
  },
  getLikeLesson:function (cb) {
    var self = this
    var currentUser = AV.User.current()
    var userId = currentUser.id
    var lessons=[]

    var startDateQuery = new AV.Query('Favourite')
    var todoFolder = AV.Object.createWithoutData('User', userId);
    startDateQuery.equalTo('user', todoFolder)
    var endDateQuery = new AV.Query('Favourite');
    endDateQuery.equalTo('action', true)
    var query = AV.Query.and(startDateQuery, endDateQuery);
    query.find().then(function (result) {
      self.getRoles(function (role) {
        if(role){
          //admin
          self.adminLike(result,lessons,function (list) {
            cb(list)
          })
        }else {
          //teacher

          self.teacherLike(result,lessons,function (list) {
            cb(list)
          })
        }
      })
    })
  },
  adminLike:function (result,lessons,cb) {
    var self = this
    result.forEach(function (item) {
      var lessonId = item.toJSON().lessonId
      var query = new AV.Query('Lesson')
      query.get(lessonId).then(function (todo) {
        var subject = todo._serverData.subject.id
        if(todo.toJSON().isChecked == 1){
          //待审核
          self.getHistoryLesson(todo.id,function (result) {
            Vue.http.get(result).then(function (response) {
              var subject = response.data.subjectId
              lessons.push({'name':response.data.name,'id':response.data.id ,'subject':self.judgeSubject(subject),'verstion':'his'})
            })
          })
        }
        lessons.push({'name':todo.toJSON().name,'id':todo.id,'subject':self.judgeSubject(subject),'isChecked':todo.toJSON().isChecked})

      })
    })
    cb(lessons)
  },
  teacherLike:function (result,lessons,cb) {
    var self = this;
    result.forEach(function (item) {
      var lessonId = item.toJSON().lessonId
      var query = new AV.Query('Lesson')
      query.get(lessonId).then(function (todo) {
        if(todo.toJSON().isChecked == 1 || todo.toJSON().isChecked == 2){
          self.getHistoryLesson(todo.id,function (result) {
            Vue.http.get(result).then(function (response) {
              var subject = response.data.subjectId
              lessons.push({'name':response.data.name,'id':response.data.id ,'subject':self.judgeSubject(subject),'verstion':'his'})
            })
          })
        }else {
          var subject = todo._serverData.subject.id
          lessons.push({'name':todo.toJSON().name,'id':todo.id,'subject':self.judgeSubject(subject)})
        }
      })
    })
    cb(lessons)
  },
  checkoutLike:function (cb) {
    var self = this
    var currentUser = AV.User.current()
    var userId = currentUser.id
    var lessonIds=[]
    var startDateQuery = new AV.Query('Favourite')
    var todoFolder = AV.Object.createWithoutData('User', userId);
    startDateQuery.equalTo('user', todoFolder)
    var endDateQuery = new AV.Query('Favourite');
    endDateQuery.equalTo('action', true)
    var query = AV.Query.and(startDateQuery, endDateQuery);
    query.find().then(function (result) {
      result.forEach(function (item) {
        lessonIds.push(item.toJSON().lessonId)
      })
      cb(lessonIds)
    })
  },
  getSpecial:function (cb) {
    var self = this
    var specialLesson = {'allSpecial':[],'recommend':[]}
    var query = new AV.Query('SpecialSubject')
    query.equalTo('onLine', true)
    query.find().then(function (result) {
      result.forEach(function (item) {
        specialLesson.allSpecial.push(item.toJSON())
        if(item.toJSON().recommendStatus == true){
            specialLesson.recommend.push(item.toJSON())
        }
      })
      cb(specialLesson)
    })
  },
  getSpecialLesson:function (specialId,cb) {
    var self = this
    var allLesson = []
    var query = new AV.Query('LessonSpecial')
    var special = AV.Object.createWithoutData('SpecialSubject',specialId)
    query.equalTo('special', special)
    query.include('lesson')
    query.find().then(function (result) {
      result.forEach(function (item) {
        var lesson = item.toJSON().lesson
        if(lesson.isPublished === true && lesson.isChecked !== 1 && lesson.isChecked !== 2){
          allLesson.push({'name':lesson.name,'id':lesson.objectId,'subject':self.judgeSubject(lesson.subject.objectId)})
        }
        if(lesson.isPublished === true && lesson.isChecked === 1 && lesson.isChecked === 2){
          self.getHistoryLesson(lessonId,function (result) {
            Vue.http.get(result).then(function (response) {
              allLesson.push({'name':response.data.name,'id':response.data.id ,'subject':self.judgeSubject(response.data.subjectId),'verstion':'his'})
            })
          })
        }
      })
      cb(allLesson)
    })

  },
  getOneSpection:function (specialId,cb) {
    var self = this
    var query = new AV.Query('SpecialSubject')
    query.get(specialId).then(function (result) {
      cb(result.toJSON())

    })
  }
}

