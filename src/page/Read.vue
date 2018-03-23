<template>
  <div>
    <SiderBar/>
    <div class="noHave">
      <img src="@/assets/paragraph.svg"/>
      <p>暂时没有内容</p>
      <p>read</p>
    </div>
  </div>
</template>

<script>
    import Siderbar from "@/components/SiderBar.vue" ;
    export default {
        name: "read",
        data(){
          return{

          }
        },
        components: {
          sidebar: Siderbar
        },
    }
</script>

<style scoped>

</style>
