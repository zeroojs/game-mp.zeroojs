<template>
  <view class="profile" :class="{ 'is-login': isLogin }">
    <view v-if="isLogin" class="user-info">
      <!-- 头像 -->
      <view class="avatar">
        <view class="avatar-container">
          <image :src="user.avatarUrl" class="avatar-image"></image>
        </view>
      </view>
      <view class="username">{{ user.nickName }}</view>
    </view>
    <view class="profile-info">
      <view class="content-title">联系我们</view>
      <view class="content flex">
        <image class="service-user" src="/static/dpx.png"></image>
        <image class="service-site" src="/static/dpx.png"></image>
      </view>
      <div class="btn-group flex">
        <button v-if="isLogin" class="like-btn" @tap="toLikeList()">心愿清单</button>
        <button v-if="isLogin" class="sign-out-btn" @tap="signout()">退出登录</button>
        <button v-else class="sign-out-btn" @tap="signin()">立即登录</button>
      </div>
    </view>
  </view>
</template>

<script setup>
import { defineComponent } from 'vue'
import { useSign } from '@/utils/sign'

export default defineComponent({
  setup() {
    const { signin, signout, user, isLogin } = useSign()
    const toLikeList = () => {
      uni.navigateTo({ url: '/pages/like/list' })
    }

    return {
      user,
      isLogin,
      signin,
      signout,
      toLikeList
    }
  }
})
</script>

<style lang="less" scoped>
.flex {
  display: flex;
  align-items: center;
}
.profile {
  background: #DBE4F3;
  min-height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  &.is-login {
    display: initial
  }
  .profile-banner {
    height: 60vh;
    // filter: blur(30upx);
    .profile-banner-image {
      transform: scale(1.5);
    }
  }
  .user-info {
    width: 100%;
    box-sizing: border-box;
    padding: 40upx;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    height: 50vh;
    background: #DBE4F3;
  }
  .avatar {
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 0 5upx 20upx fade(#6C63FF, 40),
                0 0 10upx 40upx fade(#6C63FF, 30),
                0 0 30upx 100upx fade(#6C63FF, 10);
  }
  .avatar-container {
    width: 140upx;
    height: 140upx;
    border-radius: 10upx;
    overflow: hidden;
    box-shadow: 10upx 10upx 15upx fade(#000, 30), 
              -10upx -10upx 15upx fade(#000, 10);
  }
  .avatar-image {
    width: 140upx;
    height: 140upx;
  }
  .username {
    margin-top: 100upx;
    font-weight: bold;
  }
  .btn-group {
    margin-top: 40upx;
    justify-content: center;
  }
  .like-btn,
  .sign-out-btn {
    background-color: #6C63FF;
    color: #FFF;
    font-size: 30upx;
    min-width: 200upx;
    margin: 0 0 0 30upx;
    // padding: 20upx 40upx;
    border-radius: 50upx;
    box-shadow: 10upx 10upx 15upx fade(#000, 30), 
              -10upx -10upx 15upx fade(#000, 10);
              
  }
  .like-btn {
    margin-left: 0;
    margin-right: 30upx;
  }
  .profile-info {
    height: 50vh;
    width: 100%;
    padding: 80upx 40upx 40upx;
    box-sizing: border-box;
    background: #DBE4F3;
    .content-title {
      text-align: center;
      margin-bottom: 40upx;
    }
    .content {
      width: 100%;
      display: flex;
      justify-content: center;
      .service-user {
        margin-right: 25upx;
      }
      .service-site {
        margin-left: 25upx;
      }
    }
    [class*="service-"] {
      width: 200upx;
      height: 200upx;
    }
  }
}
</style>
