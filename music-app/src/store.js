import Vue from 'vue';
import Vuex from 'vuex';
import playMode from './common/js/aliasConfig';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 是否显示迷你播放器 false为显示全屏播放器
    showMinPlayer: true,
    // 播放歌曲的列表
    playList: [],
    // 最初播放列表
    rootList: [],
    // 当前播放歌曲的位置
    nowPlayIndex: 0,
    // 播放歌曲模式
    mode: playMode.shunxuPlay
  },
  mutations: {
    // 改变vuex仓库中showMinPlayer的值，决定是否显示全屏播放器
    SET_SHOWMINPLAYER(state, val) {
      state.showMinPlayer = val;
    },
    // 设置playList的值，决定播放列表的歌曲
    SET_PLAYLIST(state, val) {
      state.playList = val;
    },
    // 设置rootList的值，决定最初的播放列表的歌曲
    SET_ROOTLIST(state, val) {
      state.rootList = val;
    },
    // 设置nowPlayIndex的值，决定播放歌曲的位置
    SET_NOWPLAYINDEX(state, val) {
      state.nowPlayIndex = val;
    },
    // 设置播放模式
    SET_MODE(state, val) {
      state.mode = val;
    },
    DEL_FROM_PLAY_LIST(state, val) {
      const index = state.playList.findIndex(item => item.id === val.delSong.id);
      state.playList.splice(index, 1);
      state.nowPlayIndex = state.playList.findIndex(item => item.id === val.curSong.id);
    }
  },
  actions: {

  },
  getters: {
    showMinPlayer(state) {
      return state.showMinPlayer;
    },
    playList(state) {
      return state.playList;
    },
    rootList(state) {
      return state.rootList;
    },
    nowPlayIndex(state) {
      return state.nowPlayIndex;
    },
    mode(state) {
      return state.mode;
    },
    // 当前播放歌曲信息
    nowPlayInfo(state) {
      return state.playList[state.nowPlayIndex];
    }
  }
});
