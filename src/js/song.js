
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
    details:function (id,name,planId) {
      this.$router.push({
        path:'/songDetails',
        query: {
          id:id,
          name:name,
          planID:planId
        },
      })
    }
  }

}
