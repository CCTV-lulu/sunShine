export default {
  name: "song-details",
  data(){
    return {
      name:'',
      showVideo:false,
      audioList:{
        //音频组件地址,只能传递一个,如果需要传递多个,可以自己修改源码  换成数组或者json
        url:"",
        //这个音频文件的长度,因为一般都是异步获取到音频地址才能初始化audio的,所以这个参数父传递给子合适点
        totalTime:null,
      },
      video: {
        sources: [{
          src: 'http://covteam.u.qiniudn.com/oceans.mp4',
          type: 'video/mp4'
        }],
        options: {
          autoplay: true,
          volume: 0.6,
          poster: 'http://covteam.u.qiniudn.com/poster.png'
        }
      },
      comment:{
        body:'# 交换嗓音\n[俄]麦德维杰夫 文\n王志冲  译\n   \n&nbsp; &nbsp; &nbsp; &nbsp;这是个麻雀想出来的花样(主意),在小河边一个僻（pì)静(很安静)的角落,它对小老鼠和小蚊子说:\n\n&nbsp; &nbsp; &nbsp; &nbsp; “咱们的嗓音又轻又细,多没气派,多难听!那小狗、小猫和小熊可不一样,或者清脆(清亮好听),或者甜美,全是好嗓音！咱们去跟它们换换。”\n\n&nbsp; &nbsp; &nbsp; &nbsp; “只怕它们不肯吧?”(用“怯生生”的语气读这句话)小蚊子法(qe)生生地说。\n\n&nbsp; &nbsp; &nbsp; &nbsp; “我自有办法。”(用“很有把握”的语气读这句话)小麻雀很有把握地说。\n\n&nbsp; &nbsp; &nbsp; &nbsp;它倒没瞎吹,不知怎么说服了对方(它让那些动物同意了换嗓音),果真把小狗、小猫和小熊都带到了河边。(用佩服的语气读这句话)\n\n&nbsp; &nbsp; &nbsp; &nbsp;大家互相问好,开始交换嗓音。\n\n&nbsp; &nbsp; &nbsp; &nbsp;小麻雀跟小狗换。\n\n&nbsp; &nbsp; &nbsp; &nbsp;小蚊子跟小熊换。\n\n&nbsp; &nbsp; &nbsp; &nbsp;小老鼠跟小猫换。\n\n&nbsp; &nbsp; &nbsp; &nbsp;天快黑了,大家来不及试试新的嗓音,就各自回去了。\n\n&nbsp; &nbsp; &nbsp; &nbsp;小老鼠头一个到家,因为它家最近,住所就在地底下。它敲蔽门,里面传出妈妈的声音:“是谁呀?”\n\n&nbsp; &nbsp; &nbsp; &nbsp; “喵鸣!喵鸭!”\n\n&nbsp; &nbsp; &nbsp; &nbsp;鼠妈妈鼠爸爸听得很清楚,是它们的敌人猫在门外,它们就赶紧逃跑,一直跑到森林。\n\n&nbsp; &nbsp; &nbsp; &nbsp;小老鼠叫了半天“瞞鸣”,不见动静。它使劲儿把门推开,进屋一瞧,爸爸妈妈全不见了。\n\n&nbsp; &nbsp; &nbsp; &nbsp;这是怎么回事呢?它累极了,又叫一声“瞄鸣”,倒头就睡。它想在/爸爸妈妈跟前/夸耀(得意地展现)一下/新嗓音的愿望/没能实现。\n\n&nbsp; &nbsp; &nbsp; &nbsp;在这同时,小猫遇到的事情/更加倒霉。\n\n&nbsp; &nbsp; &nbsp; &nbsp;它跑到自己家门外,按响了门铃。\n\n&nbsp; &nbsp; &nbsp; &nbsp; “哦，小淘气,你回来啦?怎么这样晚?”猫妈妈假装生气地应着,要来开门。\n\n&nbsp; &nbsp; &nbsp; &nbsp;小猫心想:“我来让它们大吃一惊。”它用换来的噪音叫:\n\n&nbsp; &nbsp; &nbsp; &nbsp; “吱吱！吱吱吱！”\n\n&nbsp; &nbsp; &nbsp; &nbsp; “咦，奇怪!”猫妈妈感到惊喜，“小老鼠送上门来，用不着费力地去抓啦！”(用“惊喜”的语气和表情读这句话)\n\n&nbsp; &nbsp; &nbsp; &nbsp;吱吱的叫声也引起了猫爸爸的注意。于是,猫爸爸猫妈妈悄悄地过来。'
      }
    }
  },
  mounted:function () {
    this.getMaterial()
  },
  methods:{
    back:function () {
      this.$router.push('/song')
    },
    playVideo:function () {
      this.showVideo = true
    },
    getMaterial:function(){
      var self = this
      var id = self.$route.query.id
      self.name = self.$route.query.name
      var query = new AV.Query('LessonMaterial')
      var lessonId = AV.Object.createWithoutData('Lesson', id);
      query.equalTo('lesson', lessonId);
      query.find().then(function (result) {
        result.forEach(function (item) {
          var materialId = item.attributes.material.id
          self.getAudio(materialId)
        })
      })
    },
    getAudio:function (materialId) {
      var self = this
      var query = new AV.Query('Material')
      query.equalTo('objectId', materialId);
      query.find(materialId).then(function (todo) {
        todo.forEach(function (key) {
          //判断type，决定是什么音频还是视频文件
          // console.log(key._serverData.file.attributes.url)
          var url = key._serverData.file.attributes.url
          self.audioList.url = url
          // self.video.sources.src = url
        })
      })
    }
  }
}
