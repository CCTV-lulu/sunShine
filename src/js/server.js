
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
  getSongData: function () {
    // var song = []
    // this.getAllData(function (result) {
    //   return song = result.song
    // })
  }

}
