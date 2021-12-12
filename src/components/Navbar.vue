<template>
  <cover-view class="navbar">
    <cover-view class="back-btn" @tap="back()">
      <cover-image src="/static/navbar/back.png" class="back-btn-img" />
    </cover-view>
    <cover-view class="title">{{ title }}</cover-view>
    <cover-view class="space-box"><!-- 占位符 --></cover-view>
  </cover-view>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    back() {
      uni.navigateBack()
    }
  }
})
</script>

<style lang="less" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  width: 100%;
  padding-top: 20px;
  padding-left: 40upx;
  padding-right: 40upx;
  position: fixed;
  box-sizing: border-box;
  background-color: #DBE4F3;
  // background-color: seagreen;
  z-index: 9;
  .back-btn-img,
  .space-box {
    width: 50upx;
    height: 50upx;
  }
}
</style>
