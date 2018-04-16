<template>
  <div class="header">
  <el-row >
  <img class="menu" src="@/assets/menu.png"/>
  <h3 class="sunshine">阳光盒子</h3>
  </el-row>
  </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>
  .menu{
    margin-top: 16px;
    float: left;
    margin-left: 50px;
    margin-right: 20px;
  }
  .header{
    position: fixed;
    z-index: 100;
    background-color: white;
    border-bottom   : darkgray solid 1px;
    height: 70px;
    width: 100%;
  }
  .sunshine{
    float: left
  }

</style>
