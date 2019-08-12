<template>
<!-- 九宫格排列 -->
   <div>
       <ul class="list-wrap">
        <li v-for="(item,index) in data" :key="index" @click="handleClick(item)">
            <!-- v-lazy懒加载，没有浏览时不加载 ?param=400y400规定图片大小-->
            <img v-lazy="`${item.picUrl}?param=400y400`" :alt="item.name">
            <i class="iconfont icon-zanting"></i>
            <span>{{item.name}}</span>
        </li>
     </ul>
   </div>
</template>
<script>
export default {
  name: 'allGendan',
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
    };
  },
  components: {
  },
  methods: {
    handleClick(val) {
      // 通过emit()方法向父组件传递方法和值，在父组件上@itemClick=“方法名()”来监听
      this.$emit('itemClick', val);
    }
  }
};
</script>
<style lang='less' scoped>
.list-wrap{
  min-height:640px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 24px;
  color: #333;
  li{
    width: 220px;
    list-style: none;
    position: relative;
    padding-bottom: 25px;
    img{
      width: 220px;
      height: 220px;
      margin-bottom: 15px;
    }
    .iconfont{
      position: absolute;
      top: 170px;
      right: 10px;
      font-size: 34px;
      color: #ffffff;
    }
  }
}
</style>
