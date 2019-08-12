const mutations = {
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
  // 设置rootList的值，决定最初的播放列表的歌曲
  SET_MODE(state, val) {
    state.mode = val;
  },
  // 删除播放列表的某一项
  DEL_FROM_PLAY_LIST(state, val) {
    const index = state.playList.findIndex(item => item.id === val.delSong.id);
    state.playList.splice(index, 1);
    state.nowPlayIndex = state.playList.findIndex(item => item.id === val.curSong.id);
  },
  // 添加历史播放记录
  SET_HISTORY_PLAY_LIST(state, val) {
    // 播放列表是否已有，如有则不添加，没有则添加，并储存起来
    let haveRepeat = false;
    for (let index = 0; index < state.historyPlayList.length; index += 1) {
      if (state.historyPlayList[index].id === val.id) {
        haveRepeat = true;
        return;
      }
    }
    if (!haveRepeat) {
      state.historyPlayList.push(val);
    }
    localStorage.setItem('playHistory', JSON.stringify(state.historyPlayList));
  },
  // 添加喜爱列表
  SET_LOVE_LIST(state, val) {
    // 喜爱收藏列表是否已有，如有则不添加，没有则添加，并储存起来
    let haveRepeat = false;
    for (let index = 0; index < state.loveList.length; index += 1) {
      if (state.loveList[index].id === val.id) {
        haveRepeat = true;
        return;
      }
    }
    if (!haveRepeat) {
      state.loveList.push(val);
    }
    localStorage.setItem('mylove', JSON.stringify(state.loveList));
  },
  // 再次点击时将歌曲移出喜爱列表
  DEL_FORM_LOVE_LIST(state, val) {
    // 找到歌曲的位置并删除，在重新存储删除后的数据
    const songIndex = state.loveList.findIndex(item => item.id === val.id);
    state.loveList.splice(songIndex, 1);
    localStorage.setItem('mylove', JSON.stringify(state.loveList));
  },
  // 添加搜索历史记录
  SET_SEARCH_HISTORY_LIST(state, val) {
    let haveRepeat = false;
    for (let index = 0; index < state.searchHistoryList.length; index += 1) {
      if (state.searchHistoryList[index] === val) {
        haveRepeat = true;
        return;
      }
    }
    if (!haveRepeat) {
      state.searchHistoryList.unshift(val);
      state.searchHistoryList = state.searchHistoryList.slice(0, 10);
    }
    localStorage.setItem('searchHistory', JSON.stringify(state.searchHistoryList));
  },
  // 删除搜索记录
  DEL_FORM_SEARCH_HISTORY_LIST(state, val) {
    for (let i = 0; i < state.searchHistoryList.length; i += 1) {
      if (val === state.searchHistoryList[i]) {
        state.searchHistoryList.splice(i, 1);
      }
    }
    localStorage.setItem('searchHistory', JSON.stringify(state.searchHistoryList));
  }
};
export default mutations;
