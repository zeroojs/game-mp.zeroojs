<template>
  <view class="app-page">
    <view v-if="showGroup.welcome" class="home-page welcome-page">
      <view class="section">
        <text class="title">温馨提示</text>
        <text class="content">选择游戏时，</text>
        <text class="content">总容量不能超过硬盘容量哦！</text>
        <text class="content">游戏都是中文版，基本都有修改器！</text>
        <button class="btn" @tap="showController('list')">了解硬盘容量 ></button>
      </view>
      <view class="banner">
        <image src="/static/welcome/game-large.svg" class="banner-image"></image>
      </view>
    </view>
    <view v-if="showGroup.list" class="home-page size-page">
      <view class="list">
        <view
          v-for="item in mapping"
          :key="item.rated"
          class="list-item"
          :class="{ 'is-show': showGroup.list, 'is-hide': !showGroup.list }"
        >
          <view class="rated">{{ /T/.test(item.rated) ? item.rated : `${item.rated} GB`}} 硬盘</view>
          <view> ≈ </view>
          <view class="actual">{{ `${item.actual} GB` }} 硬盘</view>
        </view>
      </view>
      <view class="section">
        <button class="btn" @tap="showController('welcome')">{{'< '}}我知道了</button>
      </view>
    </view>
  </view>
</template>

<script>
import { reactive } from 'vue'

export default {
  setup() {
    const mapping = [
      { rated: 80, actual: 74 },
      { rated: 120, actual: 111 },
      { rated: 160, actual: 140 },
      { rated: 250, actual: 232 },
      { rated: 500, actual: 465 },
      { rated: 750, actual: 698 },
      { rated: '1T', actual: 930 },
      { rated: '2T', actual: 1860 }
    ]
    return {
      mapping,
      ...useShow()
    }
  }
}

// 子页面显示
function useShow() {
  const showGroup = reactive({
    welcome: true,
    list: false
  })

  const showController = (name) => {
    showGroup.welcome = false
    showGroup.list = false
    showGroup[name] = true
  }

  return { showGroup, showController }
}
</script>

<style lang="less" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100vh - 60upx);
}
.welcome-page {
  .title,
  .content,
  .btn,
  .banner {
    opacity: 0;
    transform: translateX(-30upx);
    animation: slide .3s ease forwards;
  }
  .content {
    animation-delay: .2s;
  }
  .btn {
    animation-delay: .5s;
  }
  .banner {
    animation-delay: .6s;
  }
}
text {
  display: block;
}
.section {
  .title {
    display: block;
    font-size: 60upx;
    margin-bottom: 30upx;
  }
  .content {
    color: fade(#333, 50);
    margin-bottom: 20upx;
  }
  .btn {
    display: inline-block;
    border: unset;
    color: #FFF;
    letter-spacing: 1px;
    font-size: 30upx;
    margin-top: 30upx;
    background: linear-gradient(45deg, #6C63FF, #409EFF);
    box-shadow: 8upx 8upx 20upx #87888d, 
              -8upx -8upx 20upx fade(#6C63FF, 30);
  }
}
.banner {
  box-sizing: border-box;
  width: 100%;
  .banner-image {
    width: 100%;
  }
}

// 硬盘容量子页面
.size-page {
  display: unset;
  .section {
    width: 100%;
    text-align: right;
  }
  .btn {
    opacity: 0;
    transform: translateX(-50%);
    animation: slide .3s ease forwards;
    animation-delay: 1s;
  }
}
// 列表
.list-item {
  background-color: #FFF;
  border-radius: 40upx;
  margin-bottom: 20upx;
  padding: 20upx 40upx;
  box-shadow: 8upx 8upx 20upx #c6cdda, 
              -8upx -8upx 20upx fade(#fff, 50);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  transform: translateX(-10%);
  opacity: 0;
  &.is-show {
    animation: slide .3s ease forwards;
  }
  &.is-hide {
    transform: translateX(-10%);
    opacity: 0;
  }
  .loop(@index) when(@index < 9) {
    &:nth-child(@{index}) {
      animation-delay: @index * .1s;
    }
    .loop(@index + 1)
  }
  .loop(1);
  .actual,
  .rated {
    width: 240upx;
  }
  .actual {
    text-align: right;
  }
}

@keyframes slide {
  0% {
    transform: translateX(-10%);
    opacity: 0;
  }
  100% {
    transform: translate(0);
    opacity: 1;
  }
}
</style>
