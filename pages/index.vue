<template>
  <div class="index">
    <el-carousel class="myimg">
      <el-carousel-item v-for="(item,index) in banners" :key="index" >
        <img :src="$axios.defaults.baseURL+item.url" :alt="item.desc" class="banner-image"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: [],
    };
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners",
    })
      .then((res) => {
        console.log(res);
        this.banners = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style lang="less" scoped>
.index {
   min-width:1000px;
    margin:0 auto;
    position:relative;

    /deep/ .el-carousel__container{
        height:700px;
    }

    .banner-image{
        width:100%;
        height:100%;
    }
}
</style>