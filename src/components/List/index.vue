<template>
  <view class="list">
    <slot></slot>
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
.list {
}
</style>
