<template>
<!-- 排行榜页面 -->
<div class="page">
  <div>
   <header-top>排行榜</header-top>
   <better-scroll class="list-wrap">
    <div>
      <div class="rank-wrap">
        <p class="rankname">官方榜</p>
        <ul class="guanfangrank">
          <li v-for="(item, index) in guanfangRanks" :key="index"
           @click="goToRankListInfo(item.id)">
            <img v-lazy="`${item.coverImgUrl}?param=400y400`" alt="">
            <div class="songs-list">
              <p v-for="(item, index) in item.tracks" :key="index">
                {{`${index+1}`}}.{{item.first}}-{{item.second}}
              </p>
            </div>
            <i class="iconfont icon-zanting"></i>
          </li>
        </ul>
      </div>
      <div>
        <p class="rankname">推荐榜</p>
        <ul class="tuijianrank">
          <li v-for="(item, index) in tuijianRanks" :key="index"
          @click="goToRankListInfo(item.id)">
            <img v-lazy="`${item.coverImgUrl}?param=400y400`" alt="">
            <p>{{item.name}}</p>
            <i class="iconfont icon-zanting"></i>
          </li>
        </ul>
      </div>
    </div>
   </better-scroll>
  </div>
  <router-view></router-view>
</div>
</template>
<script>
import axios from 'axios';
import headerTop from '@/components/headerTop.vue';
import betterScroll from '@/components/betterScroll.vue';

export default {
  name: 'ranks',
  data() {
    return {
      guanfangRanks: [],
      tuijianRanks: []
    };
  },
  components: {
    headerTop,
    betterScroll
  },
  created() {
    this.getRanksData();
  },
  methods: {
    async getRanksData() {
      const { data } = await axios.get('/api/toplist/detail');
      if (data.code === 200) {
        this.guanfangRanks = data.list.slice(0, 4);
        this.tuijianRanks = data.list.slice(4, data.list.length);
      }
    },
    goToRankListInfo(item) {
      this.$router.push({
        name: 'rankListInfo',
        params: {
          id: item
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.list-wrap{
  width: 100%;
  height: calc(100vh - 380px);
}
.rank-wrap{
  margin-top: 90px;
}
.rankname{
  padding: 20px;
  margin: 0;
  font-size: 26px;
  height: 80px;
  line-height: 40px;
  background-color: #f3f4f9;
}
.guanfangrank{
  min-height: 1040px;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: #ffffff;
  li{
    padding: 30px 20px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 22px;
    color: #808080;
    position: relative;
    .songs-list{
      margin-left: 50px;
    }
    .iconfont{
      font-size: 50px;
      color: #808080;
      position: absolute;
      top: 30px;
      right: 20px;
    }
    p{
      width: 100%;
    }
  }
  img{
    width: 200px;
    height: 200px;
  }
}
.tuijianrank{
  min-height:640px;
  padding: 30px 20px;
  font-size: 24px;
  color: #333;
  li{
    width: 220px;
    list-style: none;
    position: relative;
    padding-bottom: 20px;
    display: inline-block;
    vertical-align: top;
    margin-right: 25px;
    &:nth-child(3n) {
      margin-right: 0;
    }
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
