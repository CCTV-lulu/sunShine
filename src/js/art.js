import Data from "@/js/server.js"
export default {
  data(){
    return{
      lessons:[]
    }
  },
  mounted:function () {
    this.getLesson()
  },
  methods: {
    getLesson: function () {
      var self = this
      Data.getAllTag(function (result) {
        self.lessons = result.art
      })
    },
    details:function (id) {
      this.$router.push({
        path:'/lesson/'+id
      })
    }
  }
}
