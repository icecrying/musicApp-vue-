<template>
  <div>
    <!-- 歌手列表组件 -->
    <ul class="singer-list">
      <li v-for="(item,index) in data" :key="index" @click="handleClick(item)">
        <img v-lazy="`${item.picUrl}?param=400y400`" :alt="item.name" />
        <div>
          <p class="singer-name">{{item.name}}</p>
          <p class="singer-zhuanji">专辑第{{item.albumSize}}, 共{{item.musicSize}}首歌</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'singerList',
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  components: {},
  methods: {
    handleClick(val) {
      this.$emit('itemClick', val);
    }
  }
};
</script>
<style lang='less' scoped>
.singer-list {
  min-height: 640px;
  padding: 0 30px 0;
  border-top: 1px solid #e6e6e6;
  li {
    height: 140px;
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
    box-sizing: border-box;
  }
  img {
    width: 80px;
    height: 80px;
    margin-right: 20px;
  }
  .singer-name {
    font-size: 30px;
    color: #000;
    margin-bottom: 10px;
  }
  .singer-zhuanji {
    font-size: 24px;
    color: #b2b2b2;
    margin: 0;
  }
}
</style>
