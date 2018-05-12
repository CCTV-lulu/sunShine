<template>
  <div>
    <Header :Headlines="Headlines" :reset="reset"/>
    <div class="content">
      <div class="noLike" v-if="lessons.length>0?false:true">
      <img src="../../static/image/favourite_add_29.svg"/>
      <p>还没有收藏过课程呢</p>
      <el-button  @click="lookLesson">浏览课程</el-button>
      </div>
      <div v-if="lessons.length > 0">
        <el-col :span="8" v-for="(item, index) in lessons" :key="index" style="margin-top: 10px">
          <div class="list" >
            <img @click="details(item.id +(item.verstion || ''),item.subject,item.name)" v-if="item.subject == 'song'" src="@/assets/group_5.png"/>
            <img @click="details(item.id +(item.verstion || ''),item.subject,item.name)" v-if="item.subject == 'music'" src="@/assets/group_6.png"/>
            <img @click="details(item.id +(item.verstion || ''),item.subject,item.name)" v-if="item.subject == 'play'" src="@/assets/group_8.png"/>
            <img @click="details(item.id +(item.verstion || ''),item.subject,item.name)" v-if="item.subject == 'read'" src="@/assets/group_7.png"/>
            <img @click="details(item.id +(item.verstion || ''),item.subject,item.name)" v-if="item.isChecked == 1? true :false" class="status" src="../../static/image/group_14.svg"/>
            <img class="sgin" @click="cancelLike(item.id)" src="../../static/image/inversesolid.svg"/>
            <div style="padding: 14px;">
              <span>{{item.name}}</span>
            </div>
          </div>
        </el-col>
      </div>

    </div>
  </div>

</template>

<script>
  import Data from "@/js/server.js"
    export default {
        data(){
          return{
            lessons:[],
            Headlines:'我的收藏',
            reset:false
          }
        },
      mounted:function(){
        this.getLesson()
      },
      methods:{
        lookLesson:function () {
          this.$router.push({path:'/song'})
        },
        getLesson:function () {
          var self = this
          Data.getLikeLesson(function (result) {
            self.lessons = result
          })
        },
        details:function (id,subject,name) {
          this.$router.push({
            path:'/lesson/'+id
          })
          this.burPoint(subject,name)
        },
        burPoint: function (subject,name){
          var self = this
          var eventList =[
            {
              event: '单个课程被打开次数',
              attr: {
                单个课程被打开次数:name,
              },
              duration: 2100
            },
            {
              event: '打开课程总数',
              duration: 2100
            },
            {
              event: '用户打开课程数',
              attr: {
                用户打开课程数: AV.User.current().toJSON().username,
              },
              duration: 2100
            },
            {
              event: '类目下课程打开数',
              attr: {
                类目下课程打开数: subject,
              },
              duration: 2100
            }
          ]
          analytics.send(eventList, function(result) {
            if (result) {
              console.log('统计数据发送成功！')
            }
          })
        },
        cancelLike:function (id) {
          var self = this
          var timestamp = Date.parse(new Date());
          var lessonId
          var copyid =id
          var sgin = copyid.substring(id.length-3,id.length)
          if(sgin == 'his'){
            lessonId = id.substring(0,id.length-3)
          }else {
            lessonId = id
          }
          var data ={"collectionActionArr" : [{
              "lessonId" : lessonId,
              "lastModificationTime": timestamp,
              "action" : false
            }]}
          AV.Cloud.run('collection', data).then(
            function (value) {
              self.$message({
                type: 'success',
                message: '取消收藏'
              })
              self.getLesson()
              res.send(value)
            }, function (error) {
              self.$message({
                type: 'error',
                message: '取消收藏失败'
              })
              res.send(error)
            }
          )
        }
      }
    }
</script>

<style scoped>
  .noLike {
    margin-top: 200px;
  }
  .content {
    padding-top: 10%;
    margin-left: 100px;
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
  .sgin{
    position: absolute;
    z-index: 80;
    top: 20px;
    margin-left: -50px;
  }
</style>
