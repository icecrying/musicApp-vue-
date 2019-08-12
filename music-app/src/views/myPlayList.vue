<template>
  <div class="page">
    <header-top>播放列表</header-top>
    <div v-if="playList.length > 0">
      <p class="list-info">共{{playList.length}}首歌</p>
      <better-scroll class="list-wrap">
        <songs-list :data="playList" @clickItem="addToPlay" class="list"></songs-list>
      </better-scroll>
    </div>
    <div v-else>
      <p class="tips">小主的列表中没有歌曲（。-_-。）</p>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import headerTop from '../components/headerTop.vue';
import songsList from '@/components/songsList.vue';
import betterScroll from '@/components/betterScroll.vue';

export default {
  name: 'myPlayList',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'playList'
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
      this.SET_PLAYLIST(this.playList);
      this.SET_ROOTLIST(this.playList);
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
