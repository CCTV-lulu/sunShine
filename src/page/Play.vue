<template>
  <div>
    <Header :Headlines="Headlines" :reset="reset"/>
    <SiderBar/>
    <div class="content">
      <div class="noHave" v-if="lessons.length == 0">
        <img src="@/assets/paragraph.svg"/>
        <p>暂时没有内容</p>
      </div>
      <div v-if="lessons.length > 0">
        <el-col :span="8" v-for="(item, index) in lessons" :key="index" style="margin-top: 10px">
          <div class="list" >
            <img @click="details(item.id +(item.verstion || ''),item.subject,item.name)" src="@/assets/group_8.png" />
            <img v-if="item.isChecked == 1? true :false" class="status" src="../../static/image/group_14.svg"/>
            <img class="heart" v-if="item.like? true:false" src="../../static/image/inversesolid.svg"/>
            <div style="padding: 14px;">
              <span>{{item.name}}</span>
            </div>
          </div>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script src="@/js/paly.js"></script>

<style scoped>
  .noHave{
    margin-top: 200px;
  }
  .content{
    padding-top: 10%;
    margin-left: 300px;
    min-width: 900px;
  }
  .list{
    position: relative;
  }
  .status{
    position: absolute;
    z-index: 80;
    bottom: 70px;
    margin-left: -276px;
  }
  .heart{
    position: absolute;
    z-index: 80;
    top: 20px;
    margin-left: -50px;
  }
</style>
