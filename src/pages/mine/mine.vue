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
        <image class="service-user" src="http://img-cloud.zeroojs.com/image/game-mp/my-wechat.png"></image>
        <image class="service-site" src="http://img-cloud.zeroojs.com/image/game-mp/project-url.png"></image>
      </view>
      <div class="btn-group flex">
        <z-button v-if="isLogin" class="like-btn" @tap="toLikeList()">心愿清单</z-button>
        <z-button v-if="isLogin" class="sign-out-btn" @tap="signout()">退出登录</z-button>
        <z-button v-else class="sign-out-btn" @tap="signin()">立即登录</z-button>
      </div>
    </view>
  </view>
</template>

<script setup>
import { defineComponent, watch } from 'vue'
import { useSign } from '@/utils/sign'
import ZButton from '@/components/ZButton.vue'

export default defineComponent({
  components: {
    ZButton
  },
  onShow() {
    const localUser = this.getLocaleUser()
    if (localUser) {
      this.user = JSON.parse(localUser)
    }
  },
  setup() {
    const { signin, signout, user, isLogin, getLocaleUser } = useSign()
    const toLikeList = () => {
      uni.navigateTo({ url: '/pages/like/list' })
    }

    return {
      user,
      isLogin,
      signin,
      signout,
      toLikeList,
      getLocaleUser
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
  .sign-out-btn {
    margin: 0 0 0 30upx;
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
