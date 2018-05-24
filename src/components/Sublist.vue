<template>
  <div class="content">
    <div class="noHave" v-if="lessons.length == 0">
      <img src="@/assets/paragraph.svg"/>
      <p>暂时没有内容</p>
    </div>
    <div v-if="lessons.length > 0">
      <el-col :span="8" v-for="(item, index) in lessons" :key="index" style="margin-top: 10px">
        <div class="list">
          <img @click="details(item.id +(item.verstion || ''),item.subject,item.name)" :src="sginImg" />
          <img v-if="item.isChecked == 1? true :false" class="status" src="../../static/image/group_14.svg"/>
          <img class="heart" v-if="item.like? true:false" src="../../static/image/inversesolid.svg"/>
          <div style="padding: 14px;">
            <span>{{item.name}}</span>
          </div>
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
    export default {
      props:{
        lessons:Array,
        sginImg:String
      }
    }
</script>

<style scoped>

</style>
