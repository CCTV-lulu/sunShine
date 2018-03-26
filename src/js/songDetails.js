export default {
  name: "song-details",
  data(){
    return {

    }
  },
  mounted:function () {
    this.getMaterial()
  },
  methods:{
    getParams () {
      var  routerParams = this.$route
      console.log(routerParams)
    },
    getMaterial(){
      var self = this
      var id = self.$route.query.id
      var query = new AV.Query('LessonMaterial')
      var lessonId = AV.Object.createWithoutData('Lesson', id);
      query.equalTo('lesson', lessonId);
      query.find().then(function (result) {
        result.forEach(function (item) {
          console.log(item.attributes.material.id)
        })
      })
    }
  }
}
