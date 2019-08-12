import playMode from '../common/js/aliasConfig';

const state = {
  // 是否显示迷你播放器 false为显示全屏播放器
  showMinPlayer: true,
  // 播放歌曲的列表
  playList: [],
  // 最初播放列表
  rootList: [],
  // 当前播放歌曲的位置
  nowPlayIndex: 0,
  // 播放歌曲模式
  mode: playMode.shunxuPlay,
  // localStorage用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去删除
  // sessionStorage在窗口或者标签关闭后会删除这些数据
  // localStorage.getItem("key") 读取数据语法
  // localStorage.setItem("key", "value") 保存数据语法
  // localStorage.removeItem("key") 删除数据语法
  // 存储播放历史列表
  historyPlayList: JSON.parse(localStorage.getItem('playHistory')) || [],
  // 储存喜爱列表
  loveList: JSON.parse(localStorage.getItem('mylove')) || [],
  // 储存搜索历史记录
  searchHistoryList: JSON.parse(localStorage.getItem('searchHistory')) || []
};
export default state;
