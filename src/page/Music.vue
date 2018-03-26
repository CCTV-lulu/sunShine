<template>
  <div id="app">
    <SiderBar/>
    <div class="content">
      <div class="noHave">
        <img src="@/assets/paragraph.svg"/>
        <p>暂时没有内容</p>
      </div>
    </div>
  </div>
</template>

<script>
    import SiderBar from "@/components/SiderBar.vue" ;
    export default {
        name: "music",
        data(){
          return{

          }
        },
        components: {
          SiderBar: SiderBar
        },
    }
</script>

<style src="@/css/music.css"></style>
