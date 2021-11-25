<template>
  <view class="tag" @click="handleClick">
    <slot />
  </view>
</template>

<script>
export default {
  name: 'Tag',
  inject: ['handleTagClick'],
  methods: {
    handleClick() {
      this.handleTagClick(this.$props)
    }
  }
}
</script>

<style lang="less" scoped>
.tag {
  color: #FFF;
  font-size: 24upx;
  background-color: #6c9ae4;
  padding: 10upx 30upx;
  border-radius: 100upx;
  display: inline-block;
  white-space: nowrap;
  box-shadow: 8upx 8upx 20upx #d1d9e6, 
              -18upx -18upx 20upx fade(#fff, 50);
}
</style>