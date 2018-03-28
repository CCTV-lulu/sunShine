<template>
  <div class="siderbar">
    <div class="aside">
          <el-menu class="el-menu-vertical-demo first-sider" active-text-color="#f09038" :default-active="$route.path" :router="true">
            <p>科目</p>
            <el-menu-item index="/song">
              <img :src="songUrl">
              <span slot="title">儿歌</span>
            </el-menu-item>
            <el-menu-item index="/music" >
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
            <el-menu-item index="/healthy">
              <img :src="healthyUrl"/>
              <span slot="title">健康</span>
            </el-menu-item>
            <el-menu-item index="/language">
              <img :src="languageUrl"/>
              <span slot="title">语言</span>
            </el-menu-item>
            <el-menu-item index="/social">
              <img :src="socialUrl"/>
              <span slot="title">社会</span>
            </el-menu-item>
            <el-menu-item index="/science">
              <img :src="scienceUrl"/>
              <span slot="title">科学</span>
            </el-menu-item>
            <el-menu-item index="/art">
              <img :src="artUrl"/>
              <span slot="title">艺术</span>
            </el-menu-item>
          </el-menu>
    </div>
  </div>
</template>

<script>
    export default {
      name: "sider-bar",
      data() {
        return {
          songUrl: "./static/image/song.svg",
          musicUrl: './static/image/music.svg',
          readUrl: './static/image/read.svg',
          playUrl: './static/image/play.svg',
          healthyUrl: './static/image/healthy.svg',
          languageUrl: './static/image/language.svg',
          socialUrl: './static/image/social.svg',
          scienceUrl: './static/image/science.svg',
          artUrl: './static/image/art.svg'
        }
      },
      beforeMount: function () {
        var self = this
        var path = self.$route.path
        switch (path){
          case '/song':
            self.songUrl = "./static/image/songlight.svg";
            self.musicUrl = './static/image/music.svg';
            self.readUrl = './static/image/read.svg';
            self.playUrl = './static/image/play.svg';
            self.healthyUrl = './static/image/healthy.svg';
            self.languageUrl = './static/image/language.svg';
            self.socialUrl = './static/image/social.svg';
            self.scienceUrl = './static/image/science.svg';
            self.artUrl = './static/image/art.svg';
            break;
          case '/music':
            self.musicUrl = './static/image/musiclight.svg';
            self.songUrl = "./static/image/song.svg";
            self.readUrl = './static/image/read.svg';
            self.playUrl = './static/image/play.svg';
            self.healthyUrl = './static/image/healthy.svg';
            self.languageUrl = './static/image/language.svg';
            self.socialUrl = './static/image/social.svg';
            self.scienceUrl = './static/image/science.svg';
            self.artUrl = './static/image/art.svg';
            break;
          case '/read':
            self.readUrl = './static/image/readlight.svg';
            self.songUrl = "./static/image/song.svg";
            self.musicUrl = './static/image/music.svg';
            self.playUrl = './static/image/play.svg';
            self.healthyUrl = './static/image/healthy.svg';
            self.languageUrl = './static/image/language.svg';
            self.socialUrl = './static/image/social.svg';
            self.scienceUrl = './static/image/science.svg';
            self.artUrl = './static/image/art.svg';
            break;
          case '/play':
            self.playUrl = './static/image/palylight.svg';
            self.songUrl = "./static/image/song.svg";
            self.musicUrl = './static/image/music.svg';
            self.readUrl = './static/image/read.svg';
            self.healthyUrl = './static/image/healthy.svg';
            self.languageUrl = './static/image/language.svg';
            self.socialUrl = './static/image/social.svg';
            self.scienceUrl = './static/image/science.svg';
            self.artUrl = './static/image/art.svg';
            break;
          case '/healthy':
            self.healthyUrl = './static/image/healthylight.svg';
            self.playUrl = './static/image/play.svg';
            self.songUrl = './static/image/song.svg';
            self.musicUrl = './static/image/music.svg';
            self.readUrl = './static/image/read.svg';
            self.languageUrl = './static/image/language.svg';
            self.socialUrl = './static/image/social.svg';
            self.scienceUrl = './static/image/science.svg';
            self.artUrl = './static/image/art.svg';
            break;
          case '/language':
            self.languageUrl = './static/image/languagelight.svg';
            self.healthyUrl = './static/image/healthy.svg';
            self.playUrl = './static/image/play.svg';
            self.songUrl = "./static/image/song.svg";
            self.musicUrl = './static/image/music.svg';
            self.readUrl = './static/image/read.svg';
            self.socialUrl = './static/image/social.svg';
            self.scienceUrl = './static/image/science.svg';
            self.artUrl = './static/image/art.svg';
            break;
          case '/social':
            self.socialUrl = './static/image/sociallight.svg';
            self.languageUrl = './static/image/language.svg';
            self.healthyUrl = './static/image/healthy.svg';
            self.playUrl = './static/image/play.svg';
            self.songUrl = "./static/image/song.svg";
            self.musicUrl = './static/image/music.svg';
            self.readUrl = './static/image/read.svg';
            self.scienceUrl = './static/image/science.svg';
            self.artUrl = './static/image/art.svg';
            break;
          case '/science':
            self.scienceUrl = './static/image/sciencelight.svg';
            self.socialUrl = './static/image/social.svg';
            self.languageUrl = './static/image/language.svg';
            self.healthyUrl = './static/image/healthy.svg';
            self.playUrl = './static/image/play.svg';
            self.songUrl = "./static/image/song.svg";
            self.musicUrl = './static/image/music.svg';
            self.readUrl = './static/image/read.svg';
            self.artUrl = './static/image/art.svg';
            break;
          case '/art':
            self.artUrl = './static/image/artlight.svg';
            self.scienceUrl = './static/image/science.svg';
            self.socialUrl = './static/image/social.svg';
            self.languageUrl = './static/image/language.svg';
            self.healthyUrl = './static/image/healthy.svg';
            self.playUrl = './static/image/play.svg';
            self.songUrl = "./static/image/song.svg";
            self.musicUrl = './static/image/music.svg';
            self.readUrl = './static/image/read.svg';
            break;
        }

      },
      methods: {

      }
    }
</script>

<style scoped>
  .siderbar{
    position: fixed;
    margin-top: 100px;
  }
  .aside{
    float: left;
    width: 250px;
    height: 92%;
  }
  .first-sider{
    margin-top: 40px;
    margin-bottom: 50px;
    border: none;
    width: 250px;
  }
  img{
    margin-right: 20px;
  }
  p{
    padding-right: 30px;
  }

</style>
