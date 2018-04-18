import Data from "@/js/server.js"
export default {
  data() {
    return {
      lessons: []

    }
  },
  mounted: function () {
    this.getLesson()
    this.checkLongin()
  },
  methods: {
    getLesson: function () {
      var self = this
      Data.getAllData(function (result) {
        self.lessons = result.read
      })
    },
    details: function (id) {
      this.$router.push({
        path: '/lesson/'+id
      })
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
