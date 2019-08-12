<template>
<!-- 这是歌曲列表组件 竖向列表式排列 -->
   <div>
       <ul class="songs-list">
        <li v-for="(item,index) in data" :key="index" @click="clickItem(item, index)">
          <img v-lazy="`${item.al.picUrl}?param=400y400`" :alt="item.name">
          <div>
            <p class="songs-name">{{item.name}}</p>
            <p class="singer">{{item.ar[0].name}}
            </p>
          </div>
        </li>
      </ul>
   </div>
</template>
<script>
export default {
  name: 'songsList',
  data() {
    return {
    };
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
  },
  methods: {
    clickItem(item, index) {
      this.$emit('clickItem', item, index);
    }
  }
};
</script>
<style lang='less' scoped>
  .songs-list{
    min-height: 640px;
    padding: 0 30px;
    border-top: 1PX solid #e6e6e6;
    li{
      height: 140px;
      list-style: none;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1PX solid #e6e6e6;
      box-sizing: border-box;
    }
    img{
      width: 80px;
      height: 80px;
      margin-right: 20px;
    }
    .songs-name{
      font-size: 30px;
      color: #000;
      margin-bottom: 10px;
    }
    .singer{
      font-size: 24px;
      color: #b2b2b2;
      margin: 0;
      min-width: 160px;
      height: 24px;
      line-height: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
