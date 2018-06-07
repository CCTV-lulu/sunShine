<template>
  <div>
    <div class="head">
      <el-row>
        <img class="menu" src="@/assets/back.png" @click="back"/>
        <h3 class="lessonName">{{name}}</h3>
        <img class="likeImage" :src="likeImgUrl" @click="changeLike"/>
      </el-row>
    </div>
    <div class="detailBody">
      <div class="markdown">
        <VueMarkdown :source="comment.body"></VueMarkdown>
      </div>
      <div class="rightList">
        <el-row >
          <p class="titel">教学材料</p>

          <el-col v-if="Video" v-for="(item, index) in videoList" :key="index">
            <img src="@/assets/audio.png" class="materialList" @click="playVideo(item.videoId)"/>
            <p class="listText">{{item.videoName}}</p>
          </el-col>

          <el-col v-if="Audio">
            <img src="@/assets/video.png" class="materialList" @click="playAudio"/>
            <p class="listText">{{audioName}}</p>
          </el-col>
          <el-col v-if="Atlas">
            <img src="@/assets/image.png" class="materialList" @click="playImage"/>
            <p class="listText">绘本</p>
          </el-col>
          <el-col v-if="pdf">
            <img src="@/assets/pdf.png" class="materialList" @click="playPdf"/>
            <p class="listText">文档</p>
          </el-col>
        </el-row>
        <div v-if="showAudio" class="videoBox">
          <Audio :audioList = 'audioList'></Audio>
        </div>
      </div>
    </div>
    <div class="overlay" v-if="guide">
      <div class="welcomeLesson" v-if="allHide">
        <h3 class="geName" >我们帮助你丰富你的课堂</h3>
        <p>按页面左侧的教案来备课，课堂中使用的素材在右侧</p>
        <p class="IknowLesson" @click="next">继续</p>
      </div>
      <img class="circleLike" src="../../static/image/like2.png" v-if="leader"></img>
      <div class="likeLesson" v-if="leader">
        <h3 class="likeName">这课很好先记下来</h3>
        <p class="likeInfo">点击小心心收藏课程</p>
        <p class="likeIknow" @click="recovery">继续</p>
      </div>
    </div>
    <!--<div class="container">-->
    <!--<Audio :sources="video.sources" :options="video.options"></Video>-->
    <!--</div>-->
  </div>

</template>

<script src="@/js/lessonDetails.js"></script>

<style  src="@/css/lessonDetails.css"></style>
