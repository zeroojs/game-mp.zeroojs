<template>
  <view>
    <view v-if="loading" class="nomore-tips">加载中...</view>
    <view v-else class="nomore-tips">亲，已经到底了~</view>
  </view>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    loading: Boolean
  },
  setup() {
    return {
    }
  }
})
</script>

<style lang="less" scoped>
.nomore-tips {
  text-align: center;
  font-size: 26upx;
  color: #999;
  padding: 20upx 0;
}
</style>
