<template>
  <div>
    <div class="head">
      <el-row>
        <img class="menu" src="@/assets/back.png" @click="back"/>
        <h3>{{name}}</h3>
      </el-row>
    </div>
    <div class="detailBody">
      <div class="markdown">
        <VueMarkdown :source="comment.body"></VueMarkdown>
      </div>
      <div class="rightList">
        <el-row>
          <p class="titel">教学材料</p>
          <el-col class="list">
            <img src="@/assets/audio.png"/>
            <span class="listText">视频</span>
          </el-col>
          <el-col class="list">
            <img src="@/assets/video.png" @click="playVideo"/>
            <span class="listText">音频</span>
          </el-col>
          <el-col class="list">
            <img src="@/assets/image.png" @click="playImage"/>
            <span class="listText">绘本</span>
          </el-col>
          <el-col class="list">
            <img src="@/assets/pdf.png" @click="playPdf"/>
            <span class="listText">文档</span>
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
