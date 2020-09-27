<template>
   <div class="filghts">
     机票列表
   </div>
</template>

<script>
export default {
  mounted(){
    // 获取参数
   const canshu =  this.$route.query
   console.log(canshu);
  }
}
</script>

<style>

</style>