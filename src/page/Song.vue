<template>
  <div >
    <Header :Headlines="Headlines" :reset="reset"/>
    <SiderBar/>
    <div class="content">
      <div class="noHave" v-if="lessons.length == 0">
        <img src="@/assets/paragraph.svg"/>
        <p>暂时没有内容</p>
      </div>
      <div v-if="lessons.length > 0">
          <el-col :span="8" v-for="(item, index) in lessons" :key="index" style="margin-top: 10px">
            <div class="list"  >
              <img @click="details(item.id +(item.verstion || ''),item.subject,item.name)" src="@/assets/group_5.png" />
              <img v-if="item.isChecked == 1? true :false" class="status" src="../../static/image/group_14.svg"/>
              <img class="heart" v-if="item.like? true:false" src="../../static/image/inversesolid.svg"/>
              <div style="padding: 14px;">
                <span>{{item.name}}</span>
              </div>
            </div>
          </el-col>
      </div>
    </div>
    <div class="overlay" v-if="guide">
      <div class="welcome" v-if="allHide">
        <h3 class="allname">欢迎使用阳光盒子</h3>
        <p class="info">点击图片进入课程</p>
        <p class="Iknow" @click="next">继续</p>
      </div>
      <div class="circle" v-if="leader"></div>
      <div class="leader" v-if="leader">
        <h3 class="leaderName">按科目和领域找课程</h3>
        <p class="leaderinfo">点击科目和领域可以筛选课程</p>
        <p class="leaderIknow" @click="recovery">继续</p>
      </div>
    </div>
  </div>
</template>

<script src="@/js/song.js"></script>

<style src="@/css/song.css"></style>
