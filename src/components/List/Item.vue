<template>
  <view class="list-item" :class="{ 'is-disabled': disabled }">
    <view class="media">
      <image :src="src" class="media-inner"></image>
    </view>
    <view class="content">
      <view class="title">{{ name }}</view>
      <view class="brage">{{ size }} GB</view>
    </view>
    <!-- v-if="!isMinus && !disabled" -->
    <view
      v-if="!disabled && !actionMinus"
      class="action add"
      :class="{ hide: actionMinus, 'is-restart': isRestart, 'is-show': addShow && !isRestart }"
      :style="style"
      @click="handleActionClick"
    >
      +
    </view>
    <!-- v-if="(actionMinus || isMinus) && !disabled" -->
    <view
      v-if="actionMinus && !disabled"
      class="action minus"
      :class="{ 'no-animate': defActionMinus }" 
      @click.stop="handleActionClick"
    >
    <!-- :class="{ 'no-animate': isMinus }" -->
      -
    </view>
  </view>
</template>

<script>
import { defineComponent, onBeforeMount, ref, watch } from 'vue'
import { useSign } from '@/utils/sign'

export default defineComponent({
  props: {
    isMinus: Boolean,
    disabled: Boolean,
    name: String,
    src: String,
    size: String,
    isLogin: Boolean
  },
  emits: ['action'],
  setup(props, { emit }) {
    const { signin } = useSign()
    const { move, style, actionMinus, isRestart, addShow, defActionMinus } = useMove(props.isMinus)
    const handleActionClick = (...rest) => {
      if (!props.isLogin) {
        signin()
        return
      }
      move(...rest)
      emit('action', ...rest)
    }
    return {
      style,
      addShow,
      isRestart,
      actionMinus,
      defActionMinus,
      handleActionClick
    }
  }
})

function useMove(isMinus = false) {
  const style = ref('')
  const actionMinus = ref(isMinus) // 标注已加入想要列表
  const defActionMinus = ref(isMinus) // 标注已加入想要列表
  const isRestart = ref(false) // 标注回到最初位置
  const addShow = ref(false) // 添加按钮显示
  let timer = 0
  let reTimer = 0
  const move = (event) => {
    if (defActionMinus.value) {
      defActionMinus.value = false
      return
    }
    clearTimeout(timer)
    clearTimeout(reTimer)
    // if (reTimer !== 0) return // 防止过快点击，当动画结束完才能点击
    if (actionMinus.value) {
      actionMinus.value = false
      isRestart.value = false
      addShow.value = true
      return
    }
    actionMinus.value = true
    isRestart.value = true
    addShow.value = false
    // const { offsetLeft: x } = event.target
    // const [{ clientY }] = event.touches
    // const { screenWidth: winWidth, screenHeight: winHeight } = uni.getSystemInfoSync()
    // style.value = `position:fixed;left:${x}px;top:${clientY - 12}px;`
    // timer = setTimeout(() => {
    //   style.value = `position:fixed;top:${winHeight}px;bottom:unset;left:${winWidth / 2}px;`
    //   actionMinus.value = true
    //   clearTimeout(timer)
    //   timer = 0
    // }, 30)
    // reTimer = setTimeout(() => {
    //   style.value = ''
    //   isRestart.value = true
    //   addShow.value = false
    //   clearTimeout(reTimer)
    //   reTimer = 0
    // }, 800)
  }

  onBeforeMount(() => {
    clearInterval(timer)
    clearInterval(reTimer)
  })
  return { move, style, actionMinus, isRestart, addShow, defActionMinus }
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
  &.is-disabled {
    box-shadow: unset;
    .content {
      width: auto;
      flex: 1;
      padding-right: 20upx;
    }
  }
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
    display: block;
    transition: .8s cubic-bezier(.29,.39,.94,.46);
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
    &.no-animate {
      opacity: 1;
      animation: unset;
      transform: unset;
    }
    // 模拟定位
    // position: absolute;
    // bottom: -40px;
    // left: 100px;
    &.add.is-show {
      animation: slidIn .3s forwards ease-out;
    }
    // &.add.hide {
    //   opacity: 0;
    //   display: none;
    //   transition: unset;
    //   transform: translateX(100%) translateY(-100%);
    // }
    &.add.is-restart {
      display: none;
      transform: translateX(100%) translateY(-100%);
    }
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
