<template>
  <div id="app">
    <router-view/>
    <player></player>
  </div>
</template>
<script>
import player from '@/views/player.vue';

export default {
  name: 'app',
  components: {
    player
  }
};
</script>

<style lang="less">

</style>
