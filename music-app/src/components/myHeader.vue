<template>
<!-- 顶部歌曲模糊背景图区域 -->
   <div>
       <div class="top-wrap" :style="{'backgroundImage':`url(${imgUrl}?param=400y400)`}">
        <header-top :isRed="false">
          <p class="top-title">{{title}}</p>
        </header-top>
        <img class="singer-head" :src="`${imgUrl}?param=400y400`" alt="">
       </div>
       <div class="tips">
        {{tips}}
       </div>
   </div>
</template>
<script>

import headerTop from './headerTop.vue';

export default {
  name: 'top',
  props: {
    title: {
      type: String,
      default: ''
    },
    tips: {
      type: String,
      default: ''
    },
    imgUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    };
  },
  components: {
    headerTop
  }
};
</script>
<style lang='less' scoped>
.top-wrap{
    width: 100%;
    height: 300px;
    position: relative;
    // background-image:url('../assets/image/test.jpg');
    background-repeat: no-repeat;
    background-position: center center;
    // cover使背景图片大小完全适应容器的尺寸，两边都需满足
    // contain 使背景图表大小适应容器尺寸，一边满足即停止
    background-size: cover;
    overflow: hidden;
    box-sizing: border-box;
    // 添加伪类，让背景模糊
    &::after{
        width: calc(100% + 80px);
        height: calc(100% + 80px);
        content: '';
        position: absolute;
        top: -40px;
        left: -40px;
        background: inherit;
        filter: blur(10px);
    }
    .top-title{
      margin: 0 auto;
      width: 70%;
      height: 90px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .singer-head{
        width: 120px;
        height: 120px;
        border-radius: 50%;
        border: 10px solid #9e8d7f;
        position: absolute;
        left: 50%;
        margin-left: -60px;
        top: 40%;
        z-index: 1;
    }
}
.tips{
    height: 80px;
    width: 100%;
    padding-left: 30px;
    line-height: 80px;
    font-size: 26px;
    color: #808080;
    background-color: #f3f4f9;
}
</style>
