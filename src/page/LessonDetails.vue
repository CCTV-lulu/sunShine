<template>
  <div>
    <div class="head">
      <el-row>
        <img class="menu" src="@/assets/back.png" @click="back"/>
        <h3 class="lessonName">{{name}}</h3>
      </el-row>
    </div>
    <div class="detailBody">
      <div class="markdown">
        <VueMarkdown :source="comment.body"></VueMarkdown>
      </div>
      <div class="rightList">
        <el-row >
          <p class="titel">教学材料</p>
          <el-col v-if="Video" >
            <img src="@/assets/audio.png" class="list"/>
            <p class="listText">{{videoName}}</p>
          </el-col>
          <el-col v-if="Audio">
            <img src="@/assets/video.png" class="list" @click="playAudio"/>
            <p class="listText">{{audioName}}</p>
          </el-col>
          <el-col v-if="Atlas">
            <img src="@/assets/image.png" class="list" @click="playImage"/>
            <p class="listText">绘本</p>
          </el-col>
          <el-col v-if="pdf">
            <img src="@/assets/pdf.png" class="list" @click="playPdf"/>
            <p class="listText">文档</p>
          </el-col>
        </el-row>
        <div v-if="showAudio" class="videoBox">
          <Audio :audioList = 'audioList'></Audio>
        </div>
      </div>
    </div>
    <!--<div class="container">-->
    <!--<Audio :sources="video.sources" :options="video.options"></Video>-->
    <!--</div>-->
  </div>

</template>

<script src="@/js/lessonDetails.js"></script>

<style src="@/css/lessonDetails.css"></style>
