export default {
  name: "login",
  data(){
    return{
      msg:'阳光盒子',
      telNumber:'',
      codeNumber:''
    }
  },
  methods: {
    login:function () {
      var self = this
      console.log(self.telNumber)
      console.log(self.codeNumber)
      self.$router.push('/song')
    }

  }
}
