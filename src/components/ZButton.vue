<template>
  <button class="btn">
    <slot />
  </button>
</template>

<style lang="less" scoped>
.btn {
  background-color: #6C63FF;
  color: #FFF;
  font-size: 30upx;
  min-width: 200upx;
  max-width: 300upx;
  border-radius: 50upx;
  box-shadow: 10upx 10upx 15upx fade(#000, 30), 
            -10upx -10upx 15upx fade(#000, 10);
}
</style>
