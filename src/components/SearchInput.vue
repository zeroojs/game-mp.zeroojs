<template>
  <view class="search-input">
    <input v-model="content" placeholder="请输入游戏名称" class="search-inner__input" />
    <image src="/static/tabbar/search.png" class="search-icon"></image>
  </view>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  // props: {
  //   keywords: {
  //     type: String,
  //     default: ''
  //   }
  // },
  // emits: ['update:keywords'],
  setup(props, { emit }) {
    const content = ref('')

    watch(() => content.value, (val) => {
      emit('change', val)
    })
    return { content }
  }
}
</script>

<style lang="less" scoped>
.search-input {
  display: flex;
  align-items: center;
  gap: 20upx;
  background-color: #FFF;
  border-radius: 60upx;
  padding: 0 30upx;
  margin-bottom: 30upx;
  font-size: 24upx;
  box-shadow: 18upx 18upx 20upx #d1d9e6, 
              -18upx -18upx 20upx fade(#fff, 50);
  .search-icon {
    width: 40upx;
    height: 40upx;
  }
  .search-inner__input {
    flex: 1;
    height: 75upx;
  }
}
</style>