const getters = {
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
  },
  // 判断是否在喜爱列表存在
  isLove(state) {
    let haveLove = false;
    for (let i = 0; i < state.loveList.length; i += 1) {
      if (state.playList[state.nowPlayIndex]
        && state.playList[state.nowPlayIndex].id === state.loveList[i].id) {
        haveLove = true;
        return haveLove;
      }
    }
    return haveLove;
  },
  // 搜索历史记录列表
  searchList(state) {
    return state.searchHistoryList.slice(0, 5);
  },
  historyPlayList(state) {
    return state.historyPlayList;
  },
  loveList(state) {
    return state.loveList;
  }
};
export default getters;
