import SiderBar from "@/components/SiderBar.vue" ;
import Data from "@/js/server.js"
export default {
  name: "song",
  data(){
    return{
      lessons:[]

    }
  },
  components: {
    SiderBar: SiderBar
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
      console.log(id)
      this.$router.push({
        path:'/songDetails',
        query: {
          id:id
        }
      })
    }
  }

}
