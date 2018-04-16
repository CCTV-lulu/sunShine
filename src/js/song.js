import Data from "@/js/server.js"
export default {
  name: "song",
  data(){
    return{
      lessons:[]

    }
  },
  mounted:function () {
    this.getLesson()
  },
  methods:{
    getLesson:function () {
      var self = this
      Data.getAllData(function (result) {
        self.lessons = result.song
      })
    },
    details:function (id) {
      this.$router.push({
        path:'/lesson/'+id
      })
    }
  }

}
