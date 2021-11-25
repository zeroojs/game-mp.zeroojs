<template>
  <view class="tag-group">
    <slot />
  </view>
</template>

<script>
import { provide } from 'vue'
export default {
  name: 'TagGroup',
  setup(props, { emit }) {
    const handleTagClick = (data) => {
      emit('handleTagClick', data)
    }
    provide('handleTagClick', handleTagClick)
  }
}
</script>

<style lang="less" scoped>
.tag-group {
  display: flex;
  gap: 30upx;
  width: 100%;
  overflow: scroll;
  padding: 30upx 0;
  &::-webkit-scrollbar {
    height: 0;
  }
}
</style>