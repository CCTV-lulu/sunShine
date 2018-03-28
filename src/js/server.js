
export default {
  getAllData:function (cb) {
    var query = new AV.Query('Lesson')
    var subjects = {'song':[],'music':[],'read':[],'play':[]}
    query.equalTo('isPublished',true)
    query.find().then(function (result) {
      result.forEach(function (key) {
        var subject = key._serverData.subject.id
        if (subject == '5a8e908dac502e0032b6225d'){
            subjects.play.push({'name':key.attributes.name,'id':key.id ,'planId': key.attributes.plan.id})
        }
        else if (subject == '5a701c82d50eee00444134b2'){
          subjects.read.push({'name':key.attributes.name,'id':key.id ,'planId':key.attributes.plan.id})
        }
        else if(subject == '5a741bcb2f301e003be904ed'){
          subjects.music.push({'name':key.attributes.name,'id':key.id ,'planId':key.attributes.plan.id})
        }
        else {
          subjects.song.push({'name':key.attributes.name,'id':key.id ,'planId':key.attributes.plan.id})
        }
      })
      cb(subjects)
    },function (err) {
      console.log(err)
    })
  },
  getAllTag: function (cb) {
    var self = this
    var query = new AV.Query('Lesson')
    var tag = {'healthy':[],'language':[],'art':[],'science':[],'social':[]}
    query.equalTo('isPublished',true)
    query.find().then(function (result) {
      result.forEach(function (key) {
        var keyTags = key.attributes.tags
        var subject = key._serverData.subject.id
        keyTags.forEach(function (item) {
          if (item == "domain.语言"){
              tag.language.push({'name':key.attributes.name,'id':key.id ,'planId':key.attributes.plan.id,'subject':self.judgeSubject(subject)})
          }
          if(item =="domain.艺术" ){
            tag.art.push({'name':key.attributes.name,'id':key.id ,'planId':key.attributes.plan.id,'subject':self.judgeSubject(subject)})
          }
          if(item =="domain.科学"){
            tag.science.push({'name':key.attributes.name,'id':key.id ,'planId':key.attributes.plan.id,'subject':self.judgeSubject(subject)})
          }
          if(item =="domain.健康"){
            tag.healthy.push({'name':key.attributes.name,'id':key.id ,'planId':key.attributes.plan.id,'subject':self.judgeSubject(subject)})
          }
          if(item =="domain.社会"){
            tag.social.push({'name':key.attributes.name,'id':key.id ,'planId':key.attributes.plan.id,'subject':self.judgeSubject(subject)})
          }
        })
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
  }


}
