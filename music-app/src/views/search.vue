<template>
<!-- 这是搜索页面 -->
   <div class="page">
     <!-- 搜索头部 -->
     <div class="search-header">
       <i class="iconfont icon-chaxun icon-search" @click="showSearchResult"></i>
       <input type="text" class="search-input" v-model.trim="searchTxt">
       <i class="iconfont icon-shanchu2 icon-del" @click="QuxiaoSearchTxt"></i>
       <span class="search-remove" @click="goBack">取消</span>
     </div>
     <!-- 搜索结果 -->
     <better-scroll class="search-history-wrap" v-if="haveSearch">
      <ul class="search-list">
        <li class="search-title" v-if="searchList.length">搜索历史</li>
        <li class="search-content" v-for="(item, index) in searchList" :key='index'
        @click="searchAngin(item)">
          <span>{{item}}</span>
          <i class="iconfont icon-shanchu1" @click.stop="delThisLines(item)"></i>
        </li>
        <li class="search-title">热门搜索</li>
        <li class="search-content" v-for="(itemHot, index) in hotWords" :key="`hot${index}`"
        @click="searchAngin(itemHot.first)">
          {{itemHot.first}}
        </li>
      </ul>
     </better-scroll>
     <div v-if="!haveSearch || searchResult.length > 0">
      <div class="search-title">共{{searchResult.length}}首歌曲</div>
      <better-scroll class="search-wrap">
        <ul class="search-list">
          <li class="search-jieguo" v-for="(item, index) in searchResult" :key="index"
          @click="addToPlay(item, index)">
            <div class="search-result-lines">
              <span class="song-name">{{item.name}}</span>
              <span class="song-singer" v-for="(itemArtists, index) in item.artists" :key="index">
                {{itemArtists.name}}
              </span>
            </div>
          </li>
        </ul>
      </better-scroll>
    </div>
   </div>
</template>
<script>
import axios from 'axios';
import { mapMutations, mapGetters } from 'vuex';
import betterScroll from '../components/betterScroll.vue';
import formatSongDetail from '@/common/js/util';

export default {
  name: 'search',
  data() {
    return {
      // 是否搜索，控制显示搜索首页或者显示搜索结果页
      haveSearch: true,
      // v-model 绑定的搜索词
      searchTxt: '',
      // 存放热门搜索关键词
      hotWords: [],
      // 存放搜索结果
      searchResult: []
    };
  },
  components: {
    betterScroll
  },
  computed: {
    ...mapGetters([
      'searchList',
      'nowPlayInfo'
    ])
  },
  watch: {
    searchTxt(newVal) {
      if (newVal === '') {
        this.haveSearch = true;
      }
    }
  },
  created() {
    this.getSearchHotWords();
  },
  methods: {
    ...mapMutations([
      'SET_SEARCH_HISTORY_LIST',
      'DEL_FORM_SEARCH_HISTORY_LIST',
      'SET_SHOWMINPLAYER',
      'SET_PLAYLIST',
      'SET_ROOTLIST',
      'SET_NOWPLAYINDEX'
    ]),
    async getSearchHotWords() {
      const { data } = await axios.get('/api/search/hot');
      if (data.code === 200) {
        this.hotWords = data.result.hots;
      }
    },
    async getSearchSongs() {
      const { data } = await axios.get(`/api/search?keywords=${this.searchTxt}`);
      if (data.code === 200) {
        this.searchResult = formatSongDetail(data.result.songs);
      }
      this.SET_SEARCH_HISTORY_LIST(this.searchTxt);
    },
    // 显示搜索结果
    showSearchResult() {
      if (this.searchTxt) {
        this.toggleSearchList(false);
        this.getSearchSongs();
      }
    },
    // 切换搜索首页和结果页。false结果页，true首页
    toggleSearchList(val) {
      this.haveSearch = val;
    },
    searchAngin(val) {
      this.searchTxt = val;
      this.showSearchResult();
    },
    addToPlay(val, index) {
      console.log(this.searchResult);
      this.SET_PLAYLIST(this.searchResult);
      this.SET_ROOTLIST(this.searchResult);
      this.SET_NOWPLAYINDEX(index);
      this.$router.go(-1);
    },
    // 搜索框点击删除图标清空输入内容
    QuxiaoSearchTxt() {
      this.searchTxt = '';
      this.haveSearch = true;
    },
    // 取消按钮返回上一页
    goBack() {
      this.$router.go(-1);
    },
    delThisLines(val) {
      this.DEL_FORM_SEARCH_HISTORY_LIST(val);
    }
  }
};
</script>
<style lang='less' scoped>
.search-header{
  width: 100%;
  height: 90px;
  padding: 15px 30px;
  background-color: red;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  .search-input{
    width: 590px;
    height: 60px;
    border: none;
    border-radius: 10px;
    padding: 0 60px;
    font-size: 28px;
    color: #999;
    &:focus{
      border: none;
    }
  }
  i{
    font-size: 32px;
    color: #999;
  }
  .icon-search{
    position: absolute;
    left: 45px;
    top: 25px;
  }
  .icon-del{
    position: absolute;
    right: 145px;
    top: 25px;
  }
  .search-remove{
    padding-left: 30px;
    color: #ffffff;
    font-size: 30px;
    letter-spacing:3px;
  }
}
.search-history-wrap{
  height: calc(100vh - 200px);
  overflow: hidden;
}
.search-wrap{
  height: calc(100vh - 280px);
  overflow: hidden;
}
.search-list{
  padding: 0;
  list-style: none;
  background-color: #ffffff;
  font-size: 30px;
  color: #333;
  .search-content{
    width: 100%;
    height: 120px;
    padding: 0 30px;
    border-bottom: 1PX solid #e6e6e6;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    i{
      font-size: 30px;
      color: #999;
    }
  }
  .search-jieguo{
    width: 100%;
    height: 100px;
    padding: 0 30px;
    border-bottom: 1PX solid #e6e6e6;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    .search-result-lines{
      width: 600px;
      height: 100px;
      line-height: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .song-name{
      font-size: 30px;
      color: black;
      margin: 0 10px 0 0;
    }
    .song-singer{
      font-size: 20px;
      color: #b2b2b2;
      margin-bottom: 0;
    }
  }
}
.search-title{
  width: 100%;
  height: 80px;
  line-height: 80px;
  padding: 0 30px;
  background-color: #f3f4f9;
  font-size: 24px;
  color: #989898;
}
</style>
