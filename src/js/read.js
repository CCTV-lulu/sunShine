import Data from "@/js/server.js"
export default {
  data() {
    return {
      lessons: []

    }
  },
  mounted: function () {
    this.getLesson()
  },
  methods: {
    getLesson: function () {
      var self = this
      Data.getAllData(function (result) {
        self.lessons = result.read
      })
    },
    details: function (id, name, planId) {
      this.$router.push({
        path: '/lessonDetails',
        query: {
          id: id,
          className: name,
          planId: planId
        }
      })
    }
  }
}
