import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
// 歌单页面
import PlayList from './views/playList.vue';
// 排行榜页面
import Ranks from './views/ranks.vue';
// 歌手页面
import Singer from './views/singer.vue';
// 推荐页面
import Tuijian from './views/tuijian.vue';
// 歌单详情页面
import PlayListInfo from './views/playListInfo.vue';
// 歌手详情页面
import SingerListInfo from './views/singerListInfo.vue';
// 排行榜详情页面
import RankListInfo from './views/rankListInfo.vue';
// 搜索页面
import Search from './views/search.vue';
// 个人中心页面
import MyCenter from './views/myCenter.vue';
// 播放列表
import MyPlayList from './views/myPlayList.vue';
// 我的收藏
import MyLoveList from './views/myLoveList.vue';
// 最近听过
import MyPlayHistory from './views/myPlayHistory.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/playList',
          name: 'playList',
          component: PlayList,
          children: [
            {
              path: ':id',
              name: 'playListInfo',
              component: PlayListInfo
            }
          ]
        },
        {
          path: '/ranks',
          name: 'ranks',
          component: Ranks,
          children: [
            {
              path: ':id',
              name: 'rankListInfo',
              component: RankListInfo
            }
          ]
        },
        {
          path: '/singer',
          name: 'singer',
          component: Singer,
          children: [
            {
              path: ':id',
              name: 'singerListInfo',
              component: SingerListInfo
            }
          ]
        },
        {
          path: '/tuijian',
          name: 'tuijian',
          component: Tuijian
        },
        {
          path: '/search',
          name: 'search',
          component: Search
        },
        {
          path: '/myCenter',
          name: 'myCenter',
          component: MyCenter,
          children: [
            {
              path: 'myPlayList',
              name: 'myPlayList',
              component: MyPlayList
            },
            {
              path: 'myLoveList',
              name: 'myLoveList',
              component: MyLoveList
            },
            {
              path: 'myPlayHistory',
              name: 'myPlayHistory',
              component: MyPlayHistory
            }
          ]
        }
      ]
    }
  ]
});
