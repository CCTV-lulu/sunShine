<template>
  <div>
    <Header/>
    <SiderBar/>
    <div class="content">
      <div class="noHave" v-if="lessons.length == 0">
        <img src="@/assets/paragraph.svg"/>
        <p>暂时没有内容</p>
      </div>
      <div v-if="lessons.length > 0">
        <el-col :span="8" v-for="(item, index) in lessons" :key="index" style="margin-top: 10px">
          <div class="list" @click="details(item.id +(item.verstion || ''),item.subject,item.name)">
            <img v-if="item.subject == 'song'" src="@/assets/group_5.png"/>
            <img v-if="item.subject == 'music'" src="@/assets/group_6.png"/>
            <img v-if="item.subject == 'play'" src="@/assets/group_8.png"/>
            <img v-if="item.subject == 'read'" src="@/assets/group_7.png"/>
            <img v-if="item.isChecked == 1? true :false" class="status" src="../../static/image/group_14.svg"/>
            <div style="padding: 14px;">
              <span>{{item.name}}</span>
            </div>
          </div>
        </el-col>
      </div>

    </div>
  </div>
</template>

<script src="@/js/science.js"></script>

<style scoped>
  .noHave {
    margin-top: 200px;
  }
  .content {
    padding-top: 10%;
    margin-left: 300px;
    min-width: 900px;
  }
  .list{
    position: relative;
  }
  .status{
    position: absolute;
    z-index: 100;
    margin-top: 150px;
    margin-left: -276px;
  }
</style>
