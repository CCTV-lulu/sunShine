import Data from "@/js/server.js"
export default {
  data(){
    return{
      lessons:[]

    }
  },
  mounted:function () {
    this.getLesson()
    this.checkLongin()
  },
  methods:{
    burPoint: function (subject,name){
      var self = this
      var eventList =[
        {
          event: '单个课程被打开次数',
          attr: {
            单个课程被打开次数:name,
          },
          duration: 2100
        },
        {
          event: '打开课程总数',
          duration: 2100
        },
        {
          event: '用户打开课程数',
          attr: {
            用户打开课程数: AV.User.current().toJSON().username,
          },
          duration: 2100
        },
        {
          event: '类目下课程打开数',
          attr: {
            类目下课程打开数: subject,
          },
          duration: 2100
        }
      ]
      analytics.send(eventList, function(result) {
        if (result) {
          console.log('统计数据发送成功！')
        }
      })
    },
    getLesson:function () {
      var self = this
      Data.getAllData(function (result) {
        self.lessons = result.music
      })
    },
    details:function (id,subject,name) {
      this.$router.push({
        path:'/lesson/'+id
      })
      this.burPoint(subject,name)
    },
    checkLongin:function () {
      var self = this
      var currentUser = AV.User.current();
      if (currentUser == null) {
        self.$router.push({path:'/'})
      }
    }
  }

}
