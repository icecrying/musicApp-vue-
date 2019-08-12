<template>
<!-- 这是歌手页面 -->
<div class="page">
   <div>
     <header-top>全部歌手</header-top>
     <better-scroll class="mgtop90-wrap">
       <singer-list :data='singerData' @itemClick="goToSingerListInfo"></singer-list>
     </better-scroll>
   </div>
   <router-view/>
</div>
</template>
<script>
import axios from 'axios';
import headerTop from '@/components/headerTop.vue';
import betterScroll from '@/components/betterScroll.vue';
import singerList from '@/components/singerList.vue';

export default {
  name: 'singer',
  data() {
    return {
      singerData: []
    };
  },
  components: {
    headerTop,
    betterScroll,
    singerList
  },
  created() {
    this.getSingerData();
  },
  methods: {
    async getSingerData() {
      const { data } = await axios.get('/api/top/artists?offset=0&limit=10');
      if (data.code === 200) {
        this.singerData = data.artists;
      }
    },
    goToSingerListInfo(item) {
      this.$router.push({
        name: 'singerListInfo',
        params: {
          id: item.id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>
