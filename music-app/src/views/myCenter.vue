<template>
<!-- 这是个人中心页面 -->
  <div class="page">
    <div class="header-wrap">
      <header-top class="header-top" :isRed="false">个人中心</header-top>
      <div class="header-cont">
        <img src="../assets/image/user-test.jpg" alt="">
        <p>用户名称</p>
      </div>
    </div>
    <ul class="center-list">
      <li class="list-lines play-list-line" @click="goToList('myPlayList')">
        <div>
          <i class="iconfont icon-xiai"></i>
          <span class="title-txt">播放列表</span>
        </div>
        <i class="iconfont icon-you"></i>
      </li>
      <li class="list-lines" @click="goToList('myLoveList')">
        <div>
          <i class="iconfont icon-xiai"></i>
          <span class="title-txt">我的收藏</span>
         </div>
        <i class="iconfont icon-you"></i>
      </li>
      <li class="list-lines" @click="goToList('myPlayHistory')">
        <div>
          <i class="iconfont icon-date"></i>
          <span class="title-txt">最近听过</span>
        </div>
        <i class="iconfont icon-you"></i>
      </li>
    </ul>
    <transition name="huadong">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import headerTop from '../components/headerTop.vue';

export default {
  name: 'myCenter',
  data() {
    return {
    };
  },
  components: {
    headerTop
  },
  methods: {
    goToList(val) {
      this.$router.push({
        name: val
      });
    }
  }
};
</script>
<style lang='less' scoped>
.header-wrap{
  width: 100%;
  height: 400px;
  background-image: url('../assets/image/user-bg.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  overflow: hidden;
  box-sizing: border-box;
  .header-cont{
    height: 310px;
    width: 100%;
    margin-top: 90px;
    color: #ffffff;
    font-size: 28px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-bottom: 30px;
    }
  }
}
.center-list{
  margin: 30px 0;
  padding: 0;
  list-style: none;
  .list-lines{
    background-color: #ffffff;
    width: 100%;
    height: 110px;
    padding: 0 30px;
    font-size: 30px;
    color: #333;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1PX solid #ccc;
    box-sizing: border-box;
    i{
      font-size: 40px;
      color: #ccc;
      vertical-align: middle;
    }
    .title-txt{
      margin-left: 20px;
      vertical-align: middle;
    }
  }
  .play-list-line{
    border-bottom: none;
    margin-bottom: 20px;
  }
}
.huadong-enter-active, .huadong-leave-to{
  transition: all .3s;
}
.huadong-enter,.huadong-leave-to{
  transform: translate3d(100%, 0, 0);
}
</style>
