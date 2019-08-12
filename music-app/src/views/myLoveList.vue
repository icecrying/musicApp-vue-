<template>
  <div class="page">
    <header-top>我的收藏</header-top>
    <div v-if="loveList.length > 0">
      <p class="list-info">共{{loveList.length}}首歌</p>
      <better-scroll class="list-wrap">
        <songs-list :data="loveList" @clickItem="addToPlay" class="list"></songs-list>
      </better-scroll>
    </div>
    <div v-else>
      <p class="tips">快收藏一首你喜欢的歌曲吧^-^</p>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import headerTop from '../components/headerTop.vue';
import songsList from '@/components/songsList.vue';
import betterScroll from '@/components/betterScroll.vue';

export default {
  name: 'myLoveList',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'loveList',
      // 存储原始播放列表数据
      'rootList'
    ])
  },
  components: {
    headerTop,
    songsList,
    betterScroll
  },
  methods: {
    ...mapMutations([
      'SET_PLAYLIST',
      'SET_ROOTLIST',
      'SET_NOWPLAYINDEX'
    ]),
    addToPlay(item, index) {
      this.SET_PLAYLIST(this.loveList);
      this.SET_ROOTLIST(this.loveList);
      this.SET_NOWPLAYINDEX(index);
    }
  }
};
</script>
<style lang='less' scoped>
.list-info{
  margin: 0;
  padding: 0 30px;
  margin-top: 90px;
  height: 80px;
  width: 100%;
  line-height: 80px;
  font-size: 26px;
}
.tips{
  margin-top: 120px;
  font-size: 34px;
  color: #cccccc;
  text-align: center
}
.list-wrap{
  width: 100%;
  height: calc(100vh - 280px);
  overflow: hidden;
  background-color: #ffffff;
}
</style>
