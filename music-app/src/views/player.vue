<template>
<!-- 这是播放器的界面 -->
<div>
  <!-- 底部迷你播放器 -->
  <div v-if="showMinPlayer" class="player-min" @click="showMin(false)">
    <div class="song-info">
      <div class="song-img rotate" :class="rotateStop">
        <img :src="songImg" alt="">
      </div>
      <div>
        <p class="song-name">{{songName}}</p>
        <p class="song-singer">{{songSinger}}</p>
      </div>
    </div>
    <div class="song-operate">
      <i class="iconfont icon-op" :class="playZhuangTai" @click.stop="qiehuanPlay"></i>
      <i class="iconfont icon-xiayiqu" @click.stop="nextSong"></i>
    </div>
    <div class="now-jindu" :style="{width: `${jindubaifenbi}`}"></div>
  </div>
  <!-- 全屏播放器 -->
  <transition name="player">
    <div v-if="!showMinPlayer" class="player" :style="{'backgroundImage': `url(${songImg})`}">
      <!-- 播放器蒙版遮罩效果 -->
      <div class="player-mask"></div>
      <!-- 全屏播放器头部歌曲信息部分 -->
      <div class="player-header">
        <i class="iconfont icon-xia" @click="showMin(true)"></i>
        <div class="player-info">
          <p class="song-name">{{songName}}</p>
          <p class="song-singer">{{songSinger}}</p>
        </div>
      </div>
      <!-- 全屏播放器中间轮播图歌词图片部分 -->
      <div class="player-swiper">
        <swiper :options="swiperOption">
          <swiper-slide class="swiper-img">
            <img :src="songImg" alt="" class="rotate" :class="rotateStop">
          </swiper-slide>
          <swiper-slide class="lrc-container">
            <better-scroll class="lrc-scroll" ref="lyricScroll">
              <div>
                <ul v-if="initLyricData.length > 0" class="lrc-txt">
                  <li v-for="(item, index) in initLyricData" :key="index"
                  class="lrc-lines" :class="{'active': index === currentIndex}" ref="lyricLines">
                    {{item.lrcTxt}}
                  </li>
                </ul>
                <div v-else>暂无歌词</div>
              </div>
            </better-scroll>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <i class="iconfont icon-xiai icon-like" :class="{'icon-xiai-red': isLove}"
        @click="toggleIsLove"></i>
      </div>
      <!-- 全屏播放器底部操作界面 -->
      <div class="player-foot">
        <div class="foot-mask"></div>
        <!-- 歌曲进度 -->
        <div class="jindu">
          <span class="time">{{songTime(nowTime)}}</span>
          <!-- touchstart：当手指触摸屏幕时触发;
          touchmove：当手指在屏幕上滑动时连续地触发;touchend：当手指从屏幕上移开时触发。-->
          <div class="jindu-bar" ref="jinduBar" @click="clickplayNowPlace">
            <div class="bar-move" :style="{width: `${jindubaifenbi}`}"></div>
            <div class="bar-btn" :style="{left: `${jindubaifenbi}`}"
            @touchmove.prevent="moveBar" @touchend.prevent="playNowWhere"></div>
          </div>
          <span class="time">{{songTime(toolTime)}}</span>
        </div>
        <!-- 操作按钮 -->
        <div class="caozuo-btn">
          <i class="iconfont" :class="modeZhuangTai" @click="changeMode"></i>
          <i class="iconfont icon-shangyiqu" @click="prevSong"></i>
          <i class="iconfont" :class="playZhuangTai" @click="qiehuanPlay"></i>
          <i class="iconfont icon-xiayiqu" @click="nextSong"></i>
          <i class="iconfont icon-more" @click="togglePlayList"></i>
        </div>
      </div>
    </div>
  </transition>
  <!-- 弹窗播放列表 -->
  <transition name="playList">
    <better-scroll class="playList-scroll" v-if="showPlayList">
      <div>
        <ul class="playList-wrap">
          <li v-for="(item, index) in playList" :key="index"
          class="playList-lines" @click="playThisSong(index)">
            <p>
              <span>{{item.name}}</span>-<span class="playList-singer">{{item.ar[0].name}}</span>
            </p>
            <i class="iconfont icon-shanchu2" @click.stop="deleteSong(item)"></i>
          </li>
        </ul>
      </div>
      <div class="closeBtn" @click="togglePlayList">关闭</div>
    </better-scroll>
  </transition>
  <div class="palyList-mask" @click="togglePlayList" v-if="showPlayList"></div>
  <!-- timeupdate播放位置改变时触发 -->
  <audio :src="songData" ref="audio" @ended="songEnd" @timeupdate="upDataTime"></audio>
</div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import axios from 'axios';
import playMode from '../common/js/aliasConfig';
import betterScroll from '../components/betterScroll.vue';

export default {
  name: 'playMusic',
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      // 储存歌曲地址信息
      songData: [],
      // 储存歌词信息
      lyricData: [],
      // 存储格式化后歌词信息
      initLyricData: [],
      // 存储播放状态，是否正在播放
      playing: false,
      // 歌曲当前时间
      nowTime: 0,
      // 歌曲的总时长
      toolTime: 0,
      // 进度条是否在移动
      barWhetherMove: true,
      // 当前歌词的位置
      currentIndex: 0,
      // 是否显示播放列表
      showPlayList: false
    };
  },
  components: {
    betterScroll
  },
  computed: {
    ...mapGetters([
      // 显示迷你播放器
      'showMinPlayer',
      // 存储播放列表歌曲数据
      'playList',
      // 存储原始播放列表数据
      'rootList',
      // 存储当前播放歌曲的位置
      'nowPlayIndex',
      // 存储播放模式
      'mode',
      // 存储当前播放歌曲的信息
      'nowPlayInfo',
      // 存储歌曲是否已经被收藏
      'isLove',
      'loveList'
    ]),
    // 计算歌曲歌名信息，有则显示
    songName() {
      return this.nowPlayInfo ? this.nowPlayInfo.name : '未知歌曲';
    },
    // 计算歌曲歌手信息，有则显示
    songSinger() {
      return this.nowPlayInfo ? this.nowPlayInfo.ar[0].name : '未知歌手';
    },
    // 计算歌曲图片，有则显示
    songImg() {
      return this.nowPlayInfo && this.nowPlayInfo.al.picUrl ? `${this.nowPlayInfo.al.picUrl}?param=400y400` : `${require('../assets/image/test.jpg')}?param=400y400`;
    },
    // 计算切换播放模式显示的图标
    playZhuangTai() {
      return this.playing ? 'icon-bofang' : 'icon-zanting';
    },
    // 计算切换播放模式显示的图标
    modeZhuangTai() {
      // return this.mode === playMode.shunxuPlay ? 'icon-liebiaoxunhuan'
      // : (this.mode === playMode.xunhuanPlay ? 'icon-danquxunhuan' : 'icon-suiji');
      if (this.mode === playMode.shunxuPlay) {
        return 'icon-liebiaoxunhuan';
      }
      if (this.mode === playMode.xunhuanPlay) {
        return 'icon-danquxunhuan';
      }
      return 'icon-suiji';
    },
    // 计算歌曲当前进度百分比
    jindubaifenbi() {
      let baifenbi = this.nowTime / this.toolTime;
      if (baifenbi === 0) {
        return 0;
      }
      baifenbi = Number(baifenbi * 100).toFixed();
      return `${baifenbi}%`;
    },
    // 歌曲没有播放时图片不旋转
    rotateStop() {
      return this.playing ? '' : 'rotate-stop';
    }
  },
  // 监听歌曲信息变化，变化时执行
  watch: {
    // 如果nowPlayInfo改变就会执行这个函数，watch里面的函数有2个参数
    // 第一个参数是改变后的值，第二个参数是改变前的值
    nowPlayInfo(newVal, oldVal) {
      if (oldVal === undefined || newVal.id !== oldVal.id) {
        this.getSongUrl(newVal.id);
        this.getLyricData(newVal.id);
      }
    }
  },
  methods: {
    ...mapMutations([
      'SET_SHOWMINPLAYER',
      'SET_NOWPLAYINDEX',
      'SET_MODE',
      'SET_PLAYLIST',
      'DEL_FROM_PLAY_LIST',
      'SET_HISTORY_PLAY_LIST',
      'SET_LOVE_LIST',
      'DEL_FORM_LOVE_LIST'
    ]),
    showMin(val) {
      this.SET_SHOWMINPLAYER(val);
    },
    // 获取歌曲地址
    async getSongUrl(val) {
      const { data } = await axios.get(`/api/song/url?id=${val}`);
      if (data.code === 200 && data.data[0].code === 200) {
        this.songData = data.data[0].url;
        // $nextTick当DOM渲染完成后才会执行这个回调函数
        this.$nextTick(() => {
          // 切换播放状态，暂停或者播放
          this.qiehuanPlay(true);
          this.SET_HISTORY_PLAY_LIST(this.nowPlayInfo);
        });
      }
    },
    // 获取歌词
    async getLyricData(val) {
      const { data } = await axios.get(`/api/lyric?id=${val}`);
      if (data.code === 200 && data.lrc.lyric) {
        this.lyricData = data.lrc.lyric;
        // 格式化歌词
        this.initLyric();
      } else this.lyricData = null;
    },
    // 点击开始暂停按钮
    qiehuanPlay(val) {
      if (!this.nowPlayInfo) return;
      if (val === true || val === false) {
        this.playing = val;
      } else {
        this.playing = !this.playing;
      }
      // 获取<audio>标签DOM元素
      const Audio = this.$refs.audio;
      if (this.playing) {
        Audio.play();
      } else {
        Audio.pause();
      }
    },
    // 上一首歌曲
    prevSong() {
      // 获取播放列表的长度
      const len = this.playList.length;
      // 获取上一首歌曲的位置：当前歌曲位置 - 1
      let prevIndex = this.nowPlayIndex - 1;
      if (prevIndex < 0) {
        prevIndex = len - 1;
      }
      this.SET_NOWPLAYINDEX(prevIndex);
    },
    // 下一首歌曲
    nextSong() {
      // 获取播放列表的长度
      const len = this.playList.length;
      // 获取下一首歌曲的位置：当前歌曲位置 + 1
      let nextIndex = this.nowPlayIndex + 1;
      if (nextIndex === len) {
        nextIndex = 0;
      }
      this.SET_NOWPLAYINDEX(nextIndex);
    },
    // 切换播放模式
    changeMode() {
      // 在vuex中定义的this.mode对应3个值 0 1 2
      // 0-顺序播放 1-单曲循环 2-随机播放
      // 点击切换模式后,重新计算状态
      const modeNumber = (this.mode + 1) % 3;
      // 重新给vuex中mode的状态赋值
      this.SET_MODE(modeNumber);
      // 根据播放模式的状态，更新播放列表
      // 定义一个新的播放列表，存储播放歌曲数据
      let newPlayList = [];
      // 当播放模式是随机播放的时候
      if (this.mode === playMode.suijiPlay) {
        // 将存储原始播放列表数据的数值rontList随机打乱
        newPlayList = this.getSuijiPlayList(this.rootList);
      } else {
        newPlayList = this.rootList;
      }
      // 当列表更新后，
      const newIndex = newPlayList.findIndex(item => item.id === this.nowPlayInfo.id);
      this.SET_NOWPLAYINDEX(newIndex);
      // 更新播放列表
      this.SET_PLAYLIST(newPlayList);
    },
    getSuijiPlayList(arr) {
      const newArr = [].concat(arr);
      return newArr.sort(() => (Math.random() - 0.5));
    },
    // 歌曲结束时,根据播放模式决定播放的下一首歌曲
    songEnd() {
      if (this.mode === playMode.xunhuanPlay) {
        this.danquxunhuan();
      } else {
        this.nextSong();
      }
    },
    danquxunhuan() {
      const Audio = this.$refs.audio;
      Audio.currentTime = 0;
      Audio.play();
    },
    // 当音频、视频播放位置改变时触发
    upDataTime(e) {
      if (this.barWhetherMove) {
        // 歌曲当前时间
        this.nowTime = e.target.currentTime;
        // 歌曲总时长
        this.toolTime = e.target.duration;
      }
      if (this.initLyricData && !this.showMinPlayer) {
        this.moveLyric();
      }
    },
    // 歌曲时间
    songTime(val) {
      if (Number.isNaN(val)) return '00:00';
      let m = Math.floor(val / 60);
      let s = Math.floor(val % 60);
      if (m < 10) {
        m = `0${m}`;
      }
      if (s < 10) {
        s = `0${s}`;
      }
      return `${m}:${s}`;
    },
    // 移动进度条时改变进度条的位置
    moveBar(e) {
      this.barWhetherMove = false;
      // 点击处距页面X轴方向的距离
      const X = e.touches[0].pageX;
      this.jisuanbaifenbi(X);
      if (this.initLyricData && !this.showMinPlayer) {
        this.moveLyric();
      }
    },
    jisuanbaifenbi(X) {
      // 进度条距离左侧的定位偏移量
      const leftOffset = this.$refs.jinduBar.offsetLeft;
      // 进度条可视区的宽度
      const widthClient = this.$refs.jinduBar.clientWidth;
      // 进度条移动的距离
      let moveFar = X - leftOffset;
      if (moveFar > widthClient) moveFar = widthClient;
      if (moveFar < 0) moveFar = 0;
      // 当前歌曲时间 = 总时长 * 进度条移动的百分比
      this.nowTime = this.toolTime * (moveFar / widthClient);
    },
    resetPlayer() {
      this.barWhetherMove = true;
      this.$refs.audio.currentTime = this.nowTime;
      // console.log(this.$refs.audio.currentTime);
      this.qiehuanPlay(true);
    },
    playNowWhere() {
      this.resetPlayer();
    },
    // 点击播放当前位置
    clickplayNowPlace(e) {
      this.barWhetherMove = false;
      // 点击处距页面X轴方向的距离
      const X = e.pageX;
      this.jisuanbaifenbi(X);
      this.resetPlayer();
    },
    // 初始化歌词
    initLyric() {
      this.initLyricData = [];
      if (this.lyricData) {
        const lines = this.lyricData.split('\n');
        for (let i = 0; i < lines.length; i += 1) {
          const line = lines[i];
          const timeExp = /\[(\d{2}):(\d{2}\.\d{2,3})\]/g;
          // test返回true或false 而exec返回匹配的数组
          const result = timeExp.exec(line);
          if (result) {
            const time = Number(result[1] * 60 * 1000) + Number(result[2] * 1000);
            const lrcTxt = line.replace(timeExp, '').trim();
            this.initLyricData.push({ time, lrcTxt });
          }
        }
      }
    },
    // 移动歌词
    moveLyric() {
      this.currentIndex = this.findCurrentIndex(this.nowTime * 1000);
      if (this.currentIndex > 6) {
        // scrollToElement(el, time, offsetX, offsetY, easing)
        this.$refs.lyricScroll.scrollToElement(this.$refs.lyricLines[this.currentIndex - 6], 1000);
      } else this.$refs.lyricScroll.scrollTo(0, 0, 1000);
      // scrollTo(x, y, time, easing)
    },
    findCurrentIndex(time) {
      for (let i = 0; i < this.initLyricData.length; i += 1) {
        if (this.initLyricData[i].time > time) {
          return i - 1;
        }
      }
      return this.initLyricData.length - 1;
    },
    togglePlayList() {
      this.showPlayList = !this.showPlayList;
    },
    playThisSong(index) {
      this.SET_NOWPLAYINDEX(index);
      this.togglePlayList();
    },
    deleteSong(item) {
      this.DEL_FROM_PLAY_LIST({
        delSong: item,
        curSong: this.nowPlayInfo
      });
    },
    toggleIsLove() {
      // 点击取消收藏，切换到其他歌曲时再从收藏列表中移除
      if (this.isLove) {
        this.DEL_FORM_LOVE_LIST(this.nowPlayInfo);
        return;
      }
      this.SET_LOVE_LIST(this.nowPlayInfo);
    }
  }
};
</script>
<style lang='less' scoped>
.player-min{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  height: 100px;
  padding: 10px 30px 10px 20px;
  background: #150a06;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #ffffff;
  .song-info{
    display: flex;
    flex-direction: row;
    .song-img{
      width: 80px;
      height: 80px;
      border: 2PX solid #695945;
      border-radius: 50%;
      margin-right: 20px;
      overflow: hidden;
      flex-shrink: 0;
      img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .song-name{
      // line-height: 30px;
      font-size: 26px;
      margin-bottom: 10px;
    }
    .song-singer{
      font-size: 20px;
      color: #b2b2b2;
      margin-bottom: 0;
    }
  }
  .song-operate{
    display: flex;
    align-items: center;
    i{
      font-size: 65px;
      color: #c9c3c1;
    }
    .icon-op{
      margin-right: 50px;
      font-size: 60px;
    }
  }
  .now-jindu{
    position: absolute;
    bottom: 0;
    left: 0;
    background: #f2353c;
    height: 6px;
  }
}
.player{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: #ccc;
  // background-image: url("../assets/image/test.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  color: #ffffff;
  // 添加模糊效果
  &::after{
    content: '';
    background: inherit;
    position: absolute;
    top: -40px;
    left: -40px;
    width: calc(100% + 80px);
    height: calc(100% + 80px);
    filter: blur(20px);
    z-index: -2;
  }
  .player-mask{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.3;
    z-index: -1;
  }
  // 全屏播放器头部
  .player-header{
    width: 100%;
    height: 120px;
    padding: 30px;
    i{
      font-size: 46px;
      position: absolute;
    }
    .player-info{
      width: 70%;
      margin: 0 auto;
      overflow: hidden;
      text-align: center;
      text-overflow: ellipsis;
      .song-name{
        font-size: 30px;
        margin-bottom: 12px;
        color: #ffffff;
      }
      .song-singer{
        font-size: 18px;
        color: #b2b2b2;
        margin-bottom: 0;
      }
    }
  }
  // 全屏播放器中间轮播图
  .player-swiper{
    width: 100%;
    height: calc(100% - 420px);
    position: relative;
    .swiper-container{
      height: 100%;
    }
    .swiper-img{
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 500px;
        height: 500px;
        border-radius: 50%;
        border: 20px solid #2b433c;
        box-sizing: border-box;
      }
    }
    .icon-like{
      position: absolute;
      left: 30px;
      bottom: 30px;
      font-size: 50px;
      color: #ccc;
      z-index: 999;
    }
    .icon-xiai-red{
      color: red;
    }
  }
  // 全屏播放器中间歌词
  .lrc-container{
    height: 100%;
    box-sizing: border-box;
    padding: 60px 30px 120px;
    overflow: hidden;
    .lrc-scroll{
      height: 100%;
      width: 100%;
      color: #ffffff;
      overflow: hidden;
      text-align: center;
      .lrc-txt{
        padding: 0;
        list-style: none;
        .lrc-lines{
          font-size: 28px;
          line-height: 1.5;
          min-height: 50px;
          opacity: .5;
          &.active{
            opacity: 1;
          }
        }
      }
    }
  }
  // 全屏播放器底部按钮区域
  .player-foot{
    width: 100%;
    height: 300px;
    position: relative;
    color:#ffffff;
    .foot-mask{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.1);
      z-index: -1;
    }
    .jindu{
      height: 100px;
      width: 100%;
      padding: 30px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-bottom: 1PX solid #7e7374;
      .jindu-bar{
        width: 560px;
        height: 4px;
        background-color: #7e7374;
        position: relative;
        margin: 0 25px;
        .bar-move{
          height: 4px;
          background-color: #f2353c;
          position: absolute;
          left: 0;
          right: 0;
        }
        .bar-btn{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          position: absolute;
          top: 0;
          background-color: #ffffff;
          border: 5px solid #5d5759;
          box-sizing: content-box;
          transform: translate3d(-50%, -50%, 0);
        }
      }
      .time{
        width: 60px;
      }
    }
    .caozuo-btn{
      height: 200px;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      i{
        font-size: 40px;
        color: #ffffff;
        &:nth-child(2),&:nth-child(4){
          font-size: 80px;
        }
        &:nth-child(3){
          font-size: 100px;
        }
      }
    }
  }
}
// 迷你-全屏播放器转化动画
.player-enter-active,.player-leave-active{
  transition: all 1.5s;
  opacity: 1;
  .player-header,.player-foot{
    transform: translate3d(0, 0, 0);
    transition: all .3 cubic-bezier(0.86, 0.18, 0.82, 1.32)
  }
}
.player-enter,.player-leave-to{
  opacity: 0;
  .player-header{
    transform: translate3d(0, -100px, 0);
  }
  .player-foot{
    transform: translate3d(0, 100px, 0);
  }
}
.palyList-mask{
  position: fixed;
  top: 0;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 999990;
  width: 100%;
  height: 100%;
}
.playList-scroll{
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 999999;
  height: 720px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 10px 10px 0 0;
  overflow: hidden;
  .playList-wrap{
    padding: 0 20px 80px;
    margin: 0;
    list-style: none;
    .playList-lines{
      height: 80px;
      border-bottom: 1PX solid #e6e6e6;
      font-size: 24px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      p{
        margin-bottom:0;
      }
      .playList-singer{
        font-size: 18px;
        color: #b2b2b2;
      }
      i{
        font-size: 24px;
        color: lightgray;
      }
    }
  }
  .closeBtn{
    height: 80px;
    width: 100%;
    line-height: 80px;
    text-align: center;
    border-top: 1px solid #e6e6e6;
    font-size: 30px;
    color: #333;
    background-color: #ffffff;
    position: absolute;
    bottom: 0;
  }
}
.playList-enter-active,.playList-leave-active{
  transition: all .3s;
}
.playList-enter,.playList-leave-to{
  transform: translate3d(0, 100%, 0);
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
}
.rotate{
  animation: rotate 30s linear infinite;
}

.rotate-stop{
  animation-play-state: paused;
}
</style>
