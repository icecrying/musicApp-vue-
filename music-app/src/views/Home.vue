<template>
<!-- APP首页 -->
<div>
  <div class="home">
    <!-- 头部区域 -->
    <div class="header">
      <div class="my" @click="goToMyCenter">我的</div>
      <div @click="delPlayHistory">MIKO</div>
      <i class="iconfont icon-chaxun" @click="goToSearch"></i>
    </div>
    <better-scroll class="mgtop90-wrap">
      <div>
        <!-- 轮播图区域 使用vue-swipper插件 -->
        <div class="swiper-wrap">
          <swiper :options="swiperOption" v-if="newSongs.length > 0">
            <swiper-slide v-for="(item,index) in newSongs" :key="index">
              <img :src="`${item.al.picUrl}?param=400y400`" alt=""
              @click="addToPlay(item, index)">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
          <!-- 列表区域 -->
          <ul class="swiper-nav">
            <li>
              <div class="bg" @click="goTuijian"><i class="iconfont icon-date"></i></div>
              <span>每日推荐</span>
            </li>
            <li>
              <div class="bg" @click="goPlayList"><i class="iconfont icon-music-list"></i></div>
              <span>歌单</span>
            </li>
            <li>
              <div class="bg" @click="goRanks"><i class="iconfont icon-rank"></i></div>
              <span>排行榜</span>
            </li>
          </ul>
        </div>
        <!-- 第二部分：推荐歌单区域 九宫格排列 -->
        <div class="nav-wrap">
          <div class="title">
            <span class="title-name">推荐歌单</span>
            <div class="more" @click="goPlayList">
              <i class="iconfont icon-more"></i>
            </div>
          </div>
          <all-gedan :data='musicListData' @itemClick="goToPlayListInfo"></all-gedan>
        </div>
        <!-- 第三部分：热门歌手区域 竖向列表式排列 -->
        <div class="nav-wrap">
          <div class="title">
            <span class="title-name">热门歌手</span>
            <div class="more" @click="goSinger">
              <i class="iconfont icon-more"></i>
            </div>
          </div>
          <singer-list :data="HotSingerData" @itemClick="goToSingerListInfo"></singer-list>
        </div>
      </div>
    </better-scroll>
  </div>
  <transition name="toleft">
    <router-view></router-view>
  </transition>
</div>

</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import { mapMutations } from 'vuex';
import betterScroll from '@/components/betterScroll.vue';
import allGedan from '@/components/allGedan.vue';
import singerList from '@/components/singerList.vue';
import formatSongDetail from '@/common/js/util';

export default {
  name: 'home',
  data() {
    return {
      swiperOption: {
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        observer: true,
        observeParents: true
      },
      newSongs: [],
      musicListData: [],
      HotSingerData: []
    };
  },
  components: {
    betterScroll,
    allGedan,
    singerList
  },
  created() {
    this.getNewSongs();
    this.getMusicList();
    this.getHotSingerList();
  },
  methods: {
    ...mapMutations([
      'SET_SHOWMINPLAYER',
      'SET_PLAYLIST',
      'SET_ROOTLIST',
      'SET_NOWPLAYINDEX'
    ]),
    // 获取轮播图数据
    async getNewSongs() {
      const { data } = await axios.get('/api/personalized/newsong');
      if (data.code === 200) {
        this.newSongs = formatSongDetail(data.result);
      }
    },
    addToPlay(item, index) {
      this.SET_PLAYLIST(this.newSongs);
      this.SET_ROOTLIST(this.newSongs);
      this.SET_NOWPLAYINDEX(index);
    },
    // 获取推荐歌单数据
    async getMusicList() {
      const { data } = await axios.get('/api/personalized');
      if (data.code === 200) {
        this.musicListData = data.result.slice(0, 6);
      }
    },
    // 获取热门歌手数据
    async getHotSingerList() {
      const { data } = await axios.get('/api/top/artists?offset=0&limit=10');
      if (data.code === 200) {
        this.HotSingerData = data.artists;
      }
    },
    // 跳转路由
    goTuijian() {
      this.$router.push({
        name: 'tuijian'
      });
    },
    goPlayList() {
      this.$router.push({
        name: 'playList'
      });
    },
    goRanks() {
      this.$router.push({
        name: 'ranks'
      });
    },
    goSinger() {
      this.$router.push({
        name: 'singer'
      });
    },
    goToPlayListInfo(item) {
      this.$router.push({
        name: 'playListInfo',
        params: {
          id: item.id
        }
      });
    },
    goToSingerListInfo(item) {
      this.$router.push({
        name: 'singerListInfo',
        params: {
          id: item.id
        }
      });
    },
    goToSearch() {
      this.$router.push({
        name: 'search'
      });
    },
    goToMyCenter() {
      this.$router.push({
        name: 'myCenter'
      });
    },
    // 这里是测试使用，删除播放历史记录
    delPlayHistory() {
      localStorage.removeItem('playHistory');
    }
  }
};
</script>

<style lang="less" scoped>
.home{
  background-color: #f3f4f9;
}
// 头部
.header{
  height: 90px;
  width: 100%;
  padding: 0 20px;
  background-color: #f2353c;
  font-size: 36px;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 10;
  .my{
    color: #f9aeb0;
    z-index: 99;
  }
  i{
    font-size: 36px;
    z-index: inherit;
  }
}
// 轮播图
.swiper-wrap{
  background-color: #ffffff;
  padding: 20px;
  margin-top: 90px;
  .swiper-container{
    width: 100%;
    height: 340px;
  }
  img{
    height: 340px;
    width: 100%;
  }
  .swiper-nav{
    padding: 20px 30px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    li{
      list-style: none;
      text-align: center;
      .bg{
        width: 120px;
        height: 120px;
        margin: 10px 0 20px;
        background-color: red;
        border-radius: 50%;
        text-align: center;
        line-height: 120px;
        color: #ffffff;
        .iconfont{
          font-size: 70px;
        }
      }
    }
  }
}
// 歌单列表
.nav-wrap{
  margin-top: 20px;
  min-width: 750px;
  background-color: #ffffff;
  // 标题区域样式
  .title{
    padding: 20px 20px 40px;
    width: 100%;
    font-size: 34px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .title-name{
      padding-left: 20px;
      line-height:38px;
      border-left: 6px solid #f2353c;
    }
    .more{
      width: 50px;
      height: 38px;
      border: 1px solid #cccccc;
      border-radius: 25px;
      color: #bfbfbf;
      text-align: center;
      line-height: 38px;
      box-sizing: border-box;
    }
    .icon-more{
      font-size: 32px;
    }
  }
  // 热门歌手区域样式
  .singer-list{
    min-height: 640px;
    padding: 0 30px 30px;
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
    .singer-name{
      font-size: 30px;
      color: #000;
      margin-bottom: 10px;
    }
    .singer-zhuanji{
      font-size: 24px;
      color: #b2b2b2;
      margin: 0;
    }
  }
}
.toleft-enter-active, .toleft-leave-to{
  transition: all .3s;
  opacity: 1;
}
.toleft-enter,.toleft-leave-to{
  transform: translate3d(100%, 0, 0);
  opacity: 0;
}
</style>
