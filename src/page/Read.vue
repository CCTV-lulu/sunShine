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
          <div  @click="details(item.id +(item.verstion || ''),item.subject,item.name)">
            <img src="@/assets/group_7.png" />
            <div style="padding: 14px;">
              <span>{{item.name}}</span>
            </div>
          </div>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script src="@/js/read.js"></script>

<style scoped>
  .noHave{
    margin-top: 200px;
  }
  .content{
    padding-top: 10%;
    margin-left: 300px;
    min-width: 900px;
  }
</style>
