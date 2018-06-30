import Data from "@/js/server.js"
import Analytics from "@/js/analytics.js"
export default {
  name: "song",
  data(){
    return{
      lessons:[],
      Headlines:'阳光盒子',
      reset:true,
      guide:false,
      allHide:false,
      leader:false
    }
  },
  mounted:function () {
    this.getLesson()
    this.guide = guideSong
    if(this.guide){
      this.allHide = this.guide
      document.body.parentNode.style.overflow = "hidden"
    }
  },
  methods:{
    burPoint: function (subject,lessonName){
      var self = this
      var userId = AV.User.current().toJSON().objectId
      Analytics.openLesson(lessonName,userId)
    },
    getLesson:function () {
      var self = this
      Data.getAllData(function (result) {
          Data.checkoutLike(function (likeLessonList) {
            self.lessons = self.handelLessonLikeStatus(result.song,likeLessonList)
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
      this.burPoint(subject,id)
    },
    next:function(){
      this.leader = true
      this.allHide = false
    },
    recovery:function () {
      this.leader = false
      this.guide = false
      guideSong = false
      document.body.parentNode.style.overflow = "scroll"
    },
  }

}
