<template>
<!-- 最上侧菜单标题区域 -->
    <!-- class样式绑定，根据后面的布朗值isRed决定是否渲染red样式 -->
   <div class="header" :class="{'red': isRed}">
       <i class="iconfont icon-zuo" @click="goBack"></i>
       <!-- vue插槽，决定父组件标签内部内容显示的地方 -->
       <slot></slot>
   </div>
</template>
<script>
export default {
  name: 'myHeader',
  data() {
    return {
    };
  },
  components: {
  },
  props: {
    // 接收父组件的值，渲染头部组件背景是否为红色
    isRed: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang='less' scoped>
.header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 90px;
    font-size: 34px;
    color: #fefefe;
    text-align: center;
    line-height: 90px;
    z-index: 1;
    // 串联选择器 red和header在同一标签上
    &.red{
        background-color: #f2353c;
    }
    .icon-zuo{
        position: absolute;
        left: 20px;
        font-size: 50px;
    }
}
</style>
