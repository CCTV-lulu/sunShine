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
    console.log(currentUser)
    if (currentUser) {
      //登录跳首页
      self.$router.push({path: '/song'})
    }
    else {
      //未登录跳登录
      console.log('-----------验证登录')
      self.$router.push({path:'/'})
    }
  },
  methods: {
    login:function () {
      let self = this;
      AV.User.logInWithMobilePhoneSmsCode(self.telNumber,self.codeNumber).then(function (success) {
        self.sendSuccessMessage("登录成功")
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
      let maxTime = 30;
      this.isDisabled = true;
      clearInterval(this.timer);
      this.timer = setInterval(function () {
        maxTime--;
        self.SMSCodeText = "(" + maxTime + "s)";
        if (maxTime === 0) {
          self.SMSCodeText = '发送验证码';
          self.isDisabled = false;
          clearInterval(self.timer)
        }
      }, 1000);
      AV.User.requestLoginSmsCode(self.telNumber).then(function (success) {
        self.sendSuccessMessage('发送成功');
      },function (err) {
        var message ;
        if(err.code === 213){
          message = '发送信息频繁，请稍后再试';
        }else if(err.code === 601){
          message = '发送失败,检查手机号是否为用户认证手机号';
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
