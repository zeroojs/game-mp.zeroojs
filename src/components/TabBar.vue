<template>
  <cover-view class="tabbar" :style="{'padding-bottom': paddingBottomHeight + 'rpx'}">
    <cover-view class="tabbar-item"
      v-for="(item, index) in list" 
      :key="index" 
      @tap="tabbarChange(item.path)"
    >
      <cover-image v-if="isCurrent(item)" class="item-img" :src="item.iconActive"></cover-image>
      <cover-image v-else class="item-img" :src="item.icon"></cover-image>
      <!-- <cover-view
        class="item-name"
        :class="{'tabbarActive': isCurrent(item)}"
      >
        {{ item.text }}
      </cover-view> -->
    </cover-view>
</cover-view>
</template>

<script>
export default {
  props: {
    current: String,
  },
  data() {
    return {
      paddingBottomHeight: 0, //苹果X以上手机底部适配高度
      list: [
        {
          text: "首页",
          icon: "/static/tabbar/home.png", //未选中图标
          iconActive: "/static/tabbar/home-active.png", //选中图片
          path: "/pages/index/index", //页面路径
        },
        {
          text: "搜索",
          icon: "/static/tabbar/search.png",
          iconActive: "/static/tabbar/search-active.png",
          path: "/pages/search/search"
        }
      ]
    }
  },
  created() {
    let that = this;
    uni.getSystemInfo({
      success: function (res) {
        let model = ["X", "XR", "XS", "11", "12", "13", "14", "15"]
        model.forEach((item) => {
          //适配iphoneX以上的底部，给tabbar一定高度的padding-bottom
          if (
            res.model.indexOf(item) != -1 &&
            res.model.indexOf("iPhone") != -1
          ) {
            that.paddingBottomHeight = 40
          }
        })
      }
    })
  },
  methods: {
    tabbarChange(path) {
      console.log('path', path)
      uni.switchTab({
        url: path
      })
    },
    isCurrent(page) {
      const lastIndex = page.path.lastIndexOf('/')
      const key = page.path.substr(lastIndex + 1)
      return key === this.current
    }
  }
}
</script>

<style lang="less">
.tabbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #FFF;
  position: fixed;
  left: 0;
  bottom: 0;
  .tabbar-item {
    padding: 30upx;
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .item-img {
    width: 50upx;
    height: 50upx;
  }
  .item-name {
    font-size: 24upx;
  }
}
</style>
