
function checkUserRole(cb) {
  var currentUser = AV.User.current();
  if (!currentUser) return cb(false);
  currentUser.getRoles().then(function(roles){
    var isUser  = true;
    for(let i = 0; i< roles.length; i++){
      if(roles[i].toJSON().name === 'developer'){
        isUser = false;
        break
      }
    }
    if(!isUser) return cb(false);
    else return cb(true)
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
  // analytics: function (actionList,lessonName,userName,subject) {
  //   checkUserRole(function(status){
  //     if(status){
  //       actionList.forEach(function(actionName){
  //         var event = analyticEvent(lessonName,userName,subject)[actionName]
  //         GLOBAL.analytics.send(event, function(result) {
  //           if (result.type != 'error') {
  //             console.log('统计数据发送成功！')
  //           }
  //         })
  //       })
  //     }
  //   })
  // },
  // analyticEvent:analyticEvent
  openLesson:function (lessonId,userId) {
    checkUserRole(function (status) {
      if(status){
        var OpenLessonFolder = AV.Object.extend('UserAction');
        var accessRecord = new OpenLessonFolder();
        accessRecord.set('userId',userId);
        accessRecord.set('equipment','web');
        accessRecord.set('lessonId',lessonId);
        accessRecord.set('behaviorType','openLesson');
        accessRecord.save().then(function () {
          console.log('添加打开课程数据成功')
        },function (err) {
          console.log(err)
        })
      }
    })

  },
  openApp:function (userId) {
    checkUserRole(function (status) {
      if(status){
        var OpenLessonFolder = AV.Object.extend('UserAction');
        var accessRecord = new OpenLessonFolder();
        accessRecord.set('equipment','web');
        accessRecord.set('userId',userId);
        accessRecord.set('behaviorType','openApp');
        accessRecord.save().then(function () {
          console.log('添加打开应用数据成功')
        })
      }
    })

  },
  useApp:function (userId,startTime,endTime) {
    console.log(endTime)
    checkUserRole(function (status) {
      if(status){
        var OpenLessonFolder = AV.Object.extend('UserAction');
        var accessRecord = new OpenLessonFolder();
        accessRecord.set('equipment','web');
        accessRecord.set('userId',userId);
        accessRecord.set('behaviorType','useApp');
        accessRecord.set('usageTime',(endTime-startTime).toString())
        accessRecord.save().then(function () {
          console.log('添加使用时长数据成功')
        })
      }
    })
  },
  openRes:function (resName,userId,resType) {
    checkUserRole(function (status) {
      if(status){
        var OpenLessonFolder = AV.Object.extend('UserAction');
        var accessRecord = new OpenLessonFolder();
        accessRecord.set('equipment','web');
        accessRecord.set('userId',userId)
        accessRecord.set('resId',resName+resType)
        accessRecord.set('behaviorType','openRes')
        accessRecord.save().then(function () {
          console.log('添加打开资源数据成功')
        })
      }
    })

  }
}
