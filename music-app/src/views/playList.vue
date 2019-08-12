<template>
<!-- 这是歌单列表页面 -->
<div class="page">
   <div>
       <header-top>全部歌单</header-top>
       <better-scroll class="wrap-top mgtop90-wrap">
        <all-gedan :data='gedanData' @itemClick="goToPlayListInfo"></all-gedan>
       </better-scroll>
   </div>
   <router-view></router-view>
</div>
</template>
<script>
import axios from 'axios';
import headerTop from '@/components/headerTop.vue';
import allGedan from '@/components/allGedan.vue';
import betterScroll from '@/components/betterScroll.vue';

export default {
  name: 'playList',
  data() {
    return {
      gedanData: []
    };
  },
  components: {
    headerTop,
    allGedan,
    betterScroll
  },
  created() {
    this.getGedanData();
  },
  methods: {
    async getGedanData() {
      const { data } = await axios.get('/api/personalized');
      if (data.code === 200) {
        this.gedanData = data.result;
      }
    },
    goToPlayListInfo(item) {
      this.$router.push({
        name: 'playListInfo',
        params: {
          id: item.id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.wrap-top{
  margin-top: 110px;
}
</style>
