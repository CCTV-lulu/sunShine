import Analytics from "@/js/analytics.js"
export default {
  name: "login",
  data(){
    return{
      msg:'阳光盒子',
      telNumber:'',
      codeNumber:'',
      isDisabled:false,
      SMSCodeText:'发送验证码',
      timer:''
    }
  },
  mounted:function () {
    var self = this
    var currentUser = AV.User.current();
    if (currentUser) {
      //登录跳首页
      self.$router.push({path: '/song'})
    }
    else {
      //未登录跳登录
      self.$router.push({path:'/'})
    }
  },
  methods: {
    login:function () {
      let self = this;
      var localUser = window.localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) :[]
      AV.User.logInWithMobilePhoneSmsCode(self.telNumber,self.codeNumber).then(function (success) {
        self.sendSuccessMessage("登录成功")
        Analytics.openApp(AV.User.current().toJSON().objectId)
        localStorage.setItem('openTime',new Date().getTime())
        var user = AV.User.current().toJSON().mobilePhoneNumber
        if (localUser.indexOf(user) == -1){
          localUser.push(user)
          localStorage.setItem('userInfo',JSON.stringify(localUser))
          guideSong = true
          guideLesson = true
        }
        self.$router.push({path: '/song'})
      }, function (err) {
        var message;
        if (err.code === 603){
          message = '登录失败，无效验证码'
        }else if(err.code === 219){
          message = '登录失败频繁，15分钟后再试'
        }else if(err.code === 211){
          message = '登录失败，未发现用户'
        } else{
           message = '网络错误，请稍候再试'
        }
        self.sendErrorMessage(message)
      });
    },
    getMsCode:function () {
      let self = this;
      let maxTime = 60;
      this.isDisabled = true;
      this.timer = setInterval(function () {
        maxTime--;
        self.SMSCodeText = "(" + maxTime + "s)";
        if (maxTime === 0) {
          self.SMSCodeText = '发送验证码';
          self.isDisabled = false
        }
      }, 1000);
      AV.User.requestLoginSmsCode(self.telNumber).then(function (success) {
        self.sendSuccessMessage('发送成功');
      },function (err) {
        var message ;
        console.log(err)
        if(err.code === 213){
          message = '发送失败,检查手机号是否为用户认证手机号';
        }else if(err.code === 601){
          message = '发送短信过快，请稍后重试';
        }else{
          message = '网络错误，请稍候再试'
        }
        self.sendErrorMessage(message)
      })
    },
    sendErrorMessage(message){
      this.$message({
        type: 'error',
        message: message
      })
    },
    sendSuccessMessage(message){
      this.$message({
        type: 'success',
        message: message
      })
    }

  }
}
