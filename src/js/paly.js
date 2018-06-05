import Data from "@/js/server.js"
import Analytics from "@/js/analytics.js"
export default {
  data(){
    return{
      lessons:[],
      Headlines:'阳光盒子',
      reset:true
    }
  },
  mounted:function () {
    this.getLesson()
  },
  methods:{
    burPoint: function (subject,lessonName){
      var self = this
      var actionList = ['openLessonNum','openLessonAllNum','subjectLessonNum','userOpenLessonNum']
      var userName = AV.User.current().toJSON().username
      Analytics.analytics(actionList,lessonName,userName,subject)
    },
    getLesson:function () {
      var self = this
      Data.getAllData(function (result) {
        Data.checkoutLike(function (likeLessonList) {
          self.lessons = self.handelLessonLikeStatus(result.play,likeLessonList)
        })
      })
    },
    handelLessonLikeStatus:function(lessonList,likeLessonList){
      lessonList.forEach(function (lesson) {
        lesson.like = false
        likeLessonList.forEach(function (likeLesson) {
          if(lesson.id === likeLesson){
            lesson.like = true
          }
        })
      })
      return lessonList
    },
    details:function (id,subject,name) {
      this.$router.push({
        path:'/lesson/'+id
      })
      this.burPoint(subject,name)
    },
  }

}
