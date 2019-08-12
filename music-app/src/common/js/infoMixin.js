// 储存公共样式
import myHeader from '@/components/myHeader.vue';
import songsList from '@/components/songsList.vue';
import betterScroll from '@/components/betterScroll.vue';

export default {
  data() {
    return {
      formatData: []
    };
  },
  computed: {
    // 计算属性 当newSongs有值时才显示
    title() {
      if (this.formatData.length > 0) {
        return this.formatData[0].name;
      }
      return '暂无数据';
    },
    imgUrl() {
      if (this.formatData.length > 0) {
        return this.formatData[0].al.picUrl;
      }
      return '';
    },
    tips() {
      if (this.formatData.length > 0) {
        return `共${this.formatData.length}首歌曲`;
      }
      return '暂无数据';
    }
  },
  components: {
    myHeader,
    songsList,
    betterScroll
  }
};
