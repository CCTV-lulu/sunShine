<template>
  <div>
    <div class="audioClassBG">
      <div class="videoTitel">
        <span>歌曲</span>
      </div>
      <div class="playBack">
        <audio v-on:play="audioPlayEvent" @timeupdate='updateTime' v-on:pause="audioPauseEvent"  v-on:ended="audioEndedEvent" ref="audioPlayer"  :src="audioList.url?audioList.url:null" autobuffer ></audio>
        <span ref="audioTimer" class="currentTime">00:00</span>
        <span class="totalTime">{{totalTime}}</span>
        <div class="btnBox">
          <img src="../assets/replay.svg" class="replay" @click="replay"/>
          <a :class="!isplay?'audioPlayBtn':'audioPauseBtn'" @click="playCurrentAudioFn"></a>
        </div>
      </div>
      <!-- 音频的按钮 -->
      <div class="audioBtnBox">

      </div>
      <!-- 音频的按钮end -->
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  //过滤器
  Vue.filter('formatFilter', function(value) {
    if(!value)
    {
      return '00:00';
    }
    var time = Math.floor(value);
    var m = Math.floor(time / 60).toString();
    m = m.length < 2 ? '0' + m : m;
    var s = (time - parseInt(m) * 60).toString();
    s = s.length < 2 ? '0' + s : s;
    return `${m}:${s}`;
  })
  const pad = (val) => {
    val = Math.floor(val)
    if (val < 10) {
      return '0' + val
    }
    return val + ''
  }
  const timeParse = (sec) => {
    let min = 0
    min = Math.floor(sec / 60)
    sec = sec - min * 60
    return pad(min) + ':' + pad(sec)
  }
  export default {
    data(){
      return{
        //是否正在播放中
        $video: null,
        isplay:false,
        //上次的音频码
        lastTime:null,
        totalTime:'00:00'
        //音频的总时长
        // totalTime:null,
      }
    },
    props: {
      /*
      *url  -- 音频路径
      *
      */
      audioList:null,
    },
    mounted :function () {
      this.test()
    },
    computed:{
      // 获得播放器时间码对象
      playTimer(){
        //返回对象
        return this.$refs.audioTimer
      },
      // 获得播放器对象
      player(){
        //返回对象
        return this.$refs.audioPlayer
      }
    },
    methods:{
      test(){
        this.$video = this.$el.getElementsByTagName('audio')[0]
        this.$video.addEventListener('timeupdate', this.timeline)
      },
      timeline () {
        // const percent = this.$video.currentTime / this.$video.duration
        this.totalTime = timeParse(this.$video.duration)
      },
      //播放器更新时间
      updateTime(){
        // $('.currentProgress').css('width', document.querySelector('audio').currentTime * $('.schedule').width() / document.querySelector('audio').duration)
      },
      //滑动条按钮的拖拽移动开始
      volume(ev){
        // this.spaceX = $('.currentProgress').offset().left;
      },
      replay(){
        this.playTimer.innerText = this.getCurrentTime('0')
        document.querySelector('audio').currentTime =0
      },
      //点击按钮播放音频
      playCurrentAudioFn(ev){
        //如果不在播放中
        if(!this.isplay)
        {
          this.player.play();
          this.isplay = true;
        }
        else
        {
          this.player.pause();
          this.isplay = false;
        }
      },
      //更新播放时间
      getCurrentTime(mtime)
      {
        var t = mtime;
        return this.formatTime(t);
      },
      //格式化时间
      formatTime(time){
        time = Math.floor(time);
        var m = Math.floor(time / 60).toString();
        m = m.length < 2 ? '0' + m : m;
        var s = (time - parseInt(m) * 60).toString();
        s = s.length < 2 ? '0' + s : s;
        return `${m}:${s}`;
      },
      //音频播放事件
      audioPlayEvent(event){
        // clearInterval(this.timer);
        var that = this;
        //更新播放码的时间
        this.timer = setInterval(function(){
          //更新播放时间码的显示
          that.playTimer.innerText = that.getCurrentTime(that.player.currentTime);
        },1000);
      },
      //音频暂停事件
      audioPauseEvent(event){
        clearInterval(this.timer);
      },
      //音频播放完事件
      audioEndedEvent(event){
        this.isplay = false;
      }
    },
  }
</script>

<style scoped>
  .audioClassBG{
    width: 100%;
    height: 100px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .videoTitel span{
    font-size: 20px;
  }
  .videoTitel{
    margin-bottom: 10px;
  }
  .playBack span{
    margin-top:32px;
    padding: 0 20px;
  }
  .playBack .audioPlayBtn{
    float: right;
    width:20px;
    height:20px;
    background: url('../../static/image/playVideo.svg') no-repeat;
    margin-right: 50px;
  }
  .playBack .audioPauseBtn{
    float: right;
    width:20px;
    height:20px;
    background: url('../../static/image/pause.svg') no-repeat;
    margin-right: 50px;
  }
  .replay{
    /*float: right;*/
    display: block;
    width:20px;
    height:20px;
    margin-left: 300px;
    margin-bottom: -50px;
  }
</style>
