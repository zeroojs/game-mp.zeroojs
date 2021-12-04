<template>
  <view class="profile">
    <view class="profile-banner">
      <!-- <image src="/static/logo.png" class="profile-banner-image"></image> -->
    </view>
    <cover-view class="user-info">
      <!-- 头像 -->
      <cover-view class="avatar">
        <cover-view class="avatar-container">
          <cover-image src="/static/logo.png" class="avatar-image"></cover-image>
        </cover-view>
      </cover-view>
      <cover-view class="username">哇哈哈</cover-view>
    </cover-view>
    <cover-view class="profile-info">
      <cover-view class="content-title">联系我们</cover-view>
      <cover-view class="content flex">
        <cover-image class="service-user" src="/static/dpx.png"></cover-image>
        <cover-image class="service-site" src="/static/dpx.png"></cover-image>
      </cover-view>
      <cover-button class="like-btn">心愿清单</cover-button>
      <cover-button class="sign-out-btn">退出登录</cover-button>
    </cover-view>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.profile {
  background-color: #DBE4F3;
  min-height: 100vh;
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
    position: fixed;
    top: 0;
    left: 0;
    padding: 40upx;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    height: 50vh;
  }
  .avatar {
    border-radius: 50%;
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
  .username {
    margin-top: 100upx;
    font-weight: bold;
  }
  .like-btn,
  .sign-out-btn {
    position: fixed;
    right: 50%;
    bottom: 40upx;
    transform: translateX(110%);
    background-color: #6C63FF;
    color: #FFF;
    padding: 20upx 40upx;
    border-radius: 50upx;
    box-shadow: 10upx 10upx 15upx fade(#000, 30), 
              -10upx -10upx 15upx fade(#000, 10);
              
  }
  .like-btn {
    transform: translateX(-10%);
  }
  .profile-info {
    height: 50vh;
    width: 100%;
    padding: 80upx 40upx 40upx;
    box-sizing: border-box;
    // background-color: #DBE4F3;
    // border-radius: 50upx 50upx 0 0;
    // box-shadow: 0 0 20upx fade(#000, 10);
    position: absolute;
    top: 50vh;
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
    }
  }
}
</style>
