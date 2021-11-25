<template>
  <view class="list-item">
    <view class="media">
      <image src="/static/dpx.png" class="media-inner"></image>
    </view>
    <view class="content">
      <view class="title">极限竞速：地平线5 WIN10专用</view>
      <view class="brage">103 GB</view>
    </view>
    <view class="action">+</view>
  </view>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
    }
  }
})
</script>

<style lang="less" scoped>
.list-item {
  min-height: 150upx;
  width: 100%;
  padding: 10upx;
  background-color: #FFF;
  border-radius: 40upx;
  margin-bottom: 40upx;
  box-shadow: 18upx 18upx 20upx #d1d9e6, 
              -18upx -18upx 20upx fade(#fff, 50);
  display: flex;
  align-items: center;
  box-sizing: border-box;
  .title {
    font-size: 30upx;
  }
  .media {
    width: 130upx;
    height: 130upx;
    margin-right: 20upx;
    border-radius: 30upx;
    overflow: hidden;
    .media-inner {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    height: 100upx;
    width: calc(100% - 250upx);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .brage {
      font-size: 30upx;
      color: #6c9ae4;
      font-weight: 600;
    }
  }
  .action {
    width: 80upx;
    height: 80upx;
    margin-left: auto;
    text-align: center;
    line-height: 75upx;
    border-radius: 50%;
    background-color: #d1d9e6;
    font-size: 60upx;
    font-weight: 600;
    color: #FFF;
    box-shadow: 8upx 0 10upx #d1d9e6, 
                0 -8upx 10upx fade(#fff, 50);
  }
}
</style>
