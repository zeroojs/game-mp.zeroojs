<template>
  <view class="list-item">
    <view class="media">
      <image src="/static/dpx.png" class="media-inner"></image>
    </view>
    <view class="content">
      <view class="title">极限竞速：地平线5 WIN10专用</view>
      <view class="brage">103 GB</view>
    </view>
    <view
      class="action add"
      :class="{ hide: actionMinus }"
      :style="style"
      @click="handleActionClick"
    >
      {{ isMinus ? '-' : '+' }}
    </view>
    <view
      v-if="actionMinus"
      class="action minus"
      @click="handleActionClick"
    >
      -
    </view>
  </view>
</template>

<script>
import { defineComponent, onBeforeMount, ref } from 'vue'

export default defineComponent({
  props: {
    isMinus: Boolean
  },
  emits: ['action'],
  setup(props, { emit }) {
    const { move, style, actionMinus } = useMove()
    const handleActionClick = (...rest) => {
      move(...rest)
      emit('action', ...rest)
    }
    return {
      style,
      actionMinus,
      handleActionClick
    }
  }
})

function useMove() {
  const style = ref('')
  const actionMinus = ref(false)
  let timer = 0
  let reTimer = 0
  const move = (event) => {
    if (actionMinus.value) {
      actionMinus.value = false
      style.value = ''
      return
    }
    const { offsetLeft: x } = event.target
    const [{ clientY }] = event.touches
    style.value = `position: fixed;left:${x}px;top:${clientY - 12}px;`
    // style.value = `position: fixed;top:483px;bottom:unset;left:180px;`
    timer = setTimeout(() => {
      style.value = `position: fixed;top:483px;bottom:unset;left:180px;`
      actionMinus.value = true
      clearTimeout(timer)
    }, 30)
  }

  onBeforeMount(() => {
    clearInterval(timer)
    clearInterval(reTimer)
  })
  return { move, style, actionMinus }
}
</script>

<style lang="less" scoped>
.list-item {
  min-height: 150upx;
  width: 100%;
  padding: 10upx;
  overflow: hidden;
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
      // color: #6C63FF;
      color: #6C63FF;
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
    background-color: #6C63FF;
    font-size: 60upx;
    font-weight: 600;
    color: #FFF;
    transition: 1s cubic-bezier(.29,.39,.94,.46);
    // transition-duration: 3s;
    box-shadow: 8upx 0 10upx #8680f8, 
                0 -8upx 10upx fade(#fff, 50);
    &.minus {
      animation: slidIn .3s forwards ease-out;
      opacity: 0;
      transform: translateX(100%) translateY(-100%);
      background-color: #F56C6C;
      box-shadow: 8upx 0 10upx #f3bdbd, 
                0 -8upx 10upx fade(#fff, 50);
    }
    // 模拟定位
    // position: absolute;
    // bottom: -40px;
    // left: 100px;
    // &.add.show {
    //   animation: slidIn .3s forwards ease-out;
    // }
    // &.add.hide {
    //   opacity: 0;
    //   display: none;
    //   transition: unset;
    //   transform: translateX(100%) translateY(-100%);
    // }
  }
}

@keyframes slidIn {
  0% {
    opacity: 0;
    transform: translateX(100%) translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
}
</style>
