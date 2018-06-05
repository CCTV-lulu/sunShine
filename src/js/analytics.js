
function checkUserRole(cb) {
  var currentUser = AV.User.current();
  if (!currentUser) return cb(false);
  currentUser.getRoles().then(function(roles){
    var isUser  = true;
    for(let i = 0; i< roles.length; i++){
      if(roles[i].toJSON().name === 'developer'){
        // isUser = false;
        isUser = true
        break
      }
    }
    if(!isUser) return cb(false);
    else return cb(true)
  }).catch(function(){
    cb(false)
  })

}
function analyticEvent(lessonName,userName,subject) {
  var  analyticEventList = {
    openLessonNum:{
      event: '单个课程被打开次数',
      attr: {
        单个课程被打开次数:lessonName
      },
    },
    openLessonAllNum:{
      event:'打开课程总数',
    },
    userUseTime:{
      event:'用户总使用时长',
      attr:{
        用户总使用时长:userName
      },
      duration:60000
    },
    appUserNum:{
      event:'用户打开应用次数',
      attr:{
        用户打开应用次数:userName
      }
    },
    sourceOpen:{
      event: '资源被打开数',
      attr: {
        资源被打开数:'资源被打开数',
      }
    },
    openLessonTime:{
      event: '浏览课程总时间',
      attr: {
        浏览课程总时间:lessonName
      },
      duration: 60000
    },
    subjectLessonNum:{
      event: '类目下课程打开数',
      attr: {
        类目下课程打开数: subject,
      }
    },
    userOpenLessonNum:{
      event: '用户打开课程数',
      attr: {
        用户打开课程数: userName,
      }
    }

  }
  return analyticEventList
}

export default {
  analytics: function (actionList,lessonName,userName,subject) {
    checkUserRole(function(status){
      if(status){
        actionList.forEach(function(actionName){
          var event = analyticEvent(lessonName,userName,subject)[actionName]
          GLOBAL.analytics.send(event, function(result) {
            if (result.type != 'error') {
              console.log('统计数据发送成功！')
            }
          })
        })
      }
    })
  }


}
