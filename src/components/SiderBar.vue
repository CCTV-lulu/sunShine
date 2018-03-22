<template>
  <div style="height: 100%">
    <div class="header" height="8%">
      <el-row >
        <el-col :span="2">
          <img class="menu" src="@/assets/menu.png"/>
        </el-col>
          <h3 style="float: left">阳光盒子</h3>
      </el-row>
    </div>
    <div class="aside">
      <el-row class="siderBar">
        <el-col :span="20" class="first-sider">
          <el-menu class="el-menu-vertical-demo" style="border: none;width: 250px " active-text-color="#f09038"  @select="handleSelect" :default-active="this.$route.path" :router="true">
            <p>科目</p>
            <el-menu-item index="/song">
              <img :src="songUrl">
              <span slot="title">儿歌</span>
            </el-menu-item>
            <el-menu-item index="/music">
              <img :src="musicUrl"/>
              <span slot="title">音乐</span>
            </el-menu-item>
            <el-menu-item index="/read">
              <img :src="readUrl"/>
              <span slot="title">阅读</span>
            </el-menu-item>
            <el-menu-item index="/play">
              <img :src="playUrl"/>
              <span slot="title">游戏</span>
            </el-menu-item>
            <p>领域</p>
            <el-menu-item index="5">
              <img :src="healthyUrl"/>
              <span slot="title">健康</span>
            </el-menu-item>
            <el-menu-item index="6">
              <img :src="languageUrl"/>
              <span slot="title">语言</span>
            </el-menu-item>
            <el-menu-item index="7">
              <img :src="socialUrl"/>
              <span slot="title">社会</span>
            </el-menu-item>
            <el-menu-item index="8">
              <img :src="scienceUrl"/>
              <span slot="title">科学</span>
            </el-menu-item>
            <el-menu-item index="9">
              <img :src="artUrl"/>
              <span slot="title">艺术</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    export default {
      name: "sider-bar",
      data(){
          return{
            songUrl:"./static/image/songlight.svg",
            musicUrl:'./static/image/music.svg',
            readUrl:'./static/image/read.svg',
            playUrl:'./static/image/play.svg',
            healthyUrl:'./static/image/healthy.svg',
            languageUrl:'./static/image/language.svg',
            socialUrl:'./static/image/social.svg',
            scienceUrl:'./static/image/science.svg',
            artUrl:'./static/image/art.svg'
          }
      },
      methods:{
        handleSelect:function (key) {
          console.log(key)
          switch (key){
            case '/song':
              this.songUrl = "./static/image/songlight.svg";
              this.musicUrl = './static/image/music.svg';
              this.readUrl = './static/image/read.svg';
              this.playUrl = './static/image/play.svg';
              this.healthyUrl = './static/image/healthy.svg';
              this.languageUrl = './static/image/language.svg';
              this.socialUrl = './static/image/social.svg';
              this.scienceUrl = './static/image/science.svg';
              this.artUrl = './static/image/art.svg';
              break;
            case '/music':
              this.musicUrl = './static/image/musiclight.svg';
              this.songUrl = "./static/image/song.svg";
              this.readUrl = './static/image/read.svg';
              this.playUrl = './static/image/play.svg';
              this.healthyUrl = './static/image/healthy.svg';
              this.languageUrl = './static/image/language.svg';
              this.socialUrl = './static/image/social.svg';
              this.scienceUrl = './static/image/science.svg';
              this.artUrl = './static/image/art.svg';
              break;
            case '/read':
              this.readUrl = './static/image/readlight.svg';
              this.songUrl = "./static/image/song.svg";
              this.musicUrl = './static/image/music.svg';
              this.playUrl = './static/image/play.svg';
              this.healthyUrl = './static/image/healthy.svg';
              this.languageUrl = './static/image/language.svg';
              this.socialUrl = './static/image/social.svg';
              this.scienceUrl = './static/image/science.svg';
              this.artUrl = './static/image/art.svg';
              break
            case '/play':
              this.playUrl = './static/image/palylight.svg';
              this.songUrl = "./static/image/song.svg";
              this.musicUrl = './static/image/music.svg';
              this.readUrl = './static/image/read.svg';
              this.healthyUrl = './static/image/healthy.svg';
              this.languageUrl = './static/image/language.svg';
              this.socialUrl = './static/image/social.svg';
              this.scienceUrl = './static/image/science.svg';
              this.artUrl = './static/image/art.svg';
              break
          }
        }
      }
    }
</script>

<style scoped>
  .menu{
    margin-top: 16px;
  }
  .header{
    border-bottom   : darkgray solid 1px;
  }
  .aside{
    float: left;
    width: 250px !important;
    height: 92%;
  }
  .first-sider{
    margin-top: 40px;
    margin-bottom: 50px;
  }
  img{
    margin-right: 20px;
  }
  p{
    padding-right: 30px;
  }
</style>
