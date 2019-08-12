<template>
<!-- 推荐页面 -->
   <div class="page">
     <my-header :title="title" :imgUrl="imgUrl" :tips="tips"></my-header>
     <better-scroll class="mgtop380-wrap">
      <songs-list :data="formatData" @clickItem="addToPlay"></songs-list>
     </better-scroll>
   </div>
</template>
<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
import formatSongDetail from '@/common/js/util';
import infoMixin from '@/common/js/infoMixin';

export default {
  name: 'tuijian',
  mixins: [infoMixin],
  created() {
    this.getNewSongs();
  },
  methods: {
    async getNewSongs() {
      const { data } = await axios.get('/api/personalized/newsong');
      if (data.code === 200) {
        // 执行封装公共js部分，将data里面的值格式化，再赋值给formatData
        this.formatData = formatSongDetail(data.result);
      }
    },
    ...mapMutations([
      'SET_SHOWMINPLAYER',
      'SET_PLAYLIST',
      'SET_ROOTLIST',
      'SET_NOWPLAYINDEX'
    ]),
    addToPlay(item, index) {
      // this.SET_SHOWMINPLAYER(false);
      this.SET_PLAYLIST(this.formatData);
      this.SET_ROOTLIST(this.formatData);
      this.SET_NOWPLAYINDEX(index);
    }
  }
};
</script>
<style lang='less' scoped>
</style>
