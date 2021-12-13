<template>
  <view class="like-list">
    <app-navbar title="我喜欢" />
    <view class="list app-page">
      <view
        v-for="likeItem in list"
        :key="likeItem.id"
        class="list-item"
      >
        <view class="list-item__head">
          <view class="flex between">
            <view class="like-unique">{{ likeItem.id }}</view>
            <button class="btn text" @tap="handleClipboard(likeItem.id)">复制编号</button>
          </view>
          <view class="count">
            选择了
            <text class="brage">{{ likeItem.total }}</text>
            个游戏共计
            <text class="brage">{{ likeItem.totalSize }} GB</text>
          </view>
          <view class="flex input-container">
            <input
              v-if="likeItem.isEdit"
              v-model="likeItem.newVendorId"
              class="input"
              placeholder="粘贴您第三方平台编号"
            />
            <view v-else class="vendor-container">{{ likeItem.vendorId }}</view>
            <button class="btn" @tap="saveVendor(likeItem)">{{ likeItem.isEdit ? '保存' : '编辑' }}</button>
          </view>
        </view>
        <view class="list-item__body">
          <List>
            <ListItem
              v-for="item in likeItem.products"
              :key="item.id"
              :disabled="true"
              :name="item.name"
              :size="item.size"
              :src="item.avatar"
            />
          </List>
        </view>
        <view v-show="likeItem.total > 2" class="list-ite__footer">
          <cover-view class="expand-btn" :class="{ 'is-expand': likeItem.expand }" @tap="toggleExpand(likeItem)">
            <!-- <cover-view>∧</cover-view> -->
            <template v-if="!likeItem.loading">
              <cover-view>{{ likeItem.expand ? '折叠' : '展开' }}</cover-view>
              <cover-image v-if="!likeItem.expand" src="/static/like/expand.png" class="expand-image"></cover-image>
              <cover-image v-else src="/static/like/fold.png" class="expand-image"></cover-image>
            </template>
            <view v-if="likeItem.loading" class="loading-box">
              <view class="loading-box__inner"></view>
              <view class="loading-box__mask"></view>
            </view>
          </cover-view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { defineComponent, ref } from 'vue'
import List from '@/components/List'
import ListItem from '@/components/List/Item'
import AppNavbar from '@/components/Navbar'
import { inventoryRestful } from '@/api'
import { handleClipboard } from '@/utils/clipboard'

export default defineComponent({
  name: 'LikeList',
  components: {
    List,
		ListItem,
    AppNavbar
  },
  setup() {
    const { list, saveVendor } = useList()

    const toggleExpand = async (likeItem) => {
      if (likeItem.expand) {
        likeItem.products = likeItem.products.filter((_, index) => index < 2)
        likeItem.expand = false
        return
      }
      likeItem.loading = true
      const timer = setTimeout(() => {
        likeItem.products = likeItem.fullProducts
        likeItem.expand = true
        likeItem.loading = false
        clearTimeout(timer)
      }, 1500)
    }
    return {
      list,
      saveVendor,
      toggleExpand,
      handleClipboard
    }
  }
})

function useList() {
  const list = ref([])

  const getList = async () => {
    const result = await inventoryRestful()
    list.value = result.map(item => {
      const fullProducts = item.products
      // 显示两条数据
      item.products = item.products.filter((_, index) => index < 2)
      return {
        ...item,
        expand: false,
        fullProducts,
        loading: false,
        newVendorId: item.vendorId,
        isEdit: !item.vendorId
      }
    })
  }
  getList()

  // 保存第三方平台编号
  const saveVendor = async (likeItem) => {
    if (!likeItem.newVendorId) return
    if (!likeItem.isEdit) {
      likeItem.isEdit = true
      likeItem.newVendorId = likeItem.vendorId
      return
    }
    const params = {
      id: likeItem.id,
      vendorId: likeItem.newVendorId
    }
    await inventoryRestful(params, 'PUT')
    likeItem.isEdit = false
    likeItem.vendorId = likeItem.newVendorId
  }
  return { list, getList, saveVendor }
}

</script>

<style lang="less" scoped>
.flex {
  display: flex;
  align-items: center;
  &.between {
    justify-content: space-between;
  }
  &.top {
    align-items: flex-start;
  }
}
.btn {
  padding: 10upx 20upx;
  margin: 0;
  background-color: #6C63FF;
  color: #FFF;
  line-height: unset;
  outline: none;
  font-size: 30upx;
  &::after {
    display: none;
  }
  &.text {
    background-color: unset;
    color: #6C63FF;
    padding: 10upx 0;
  }
}

.like-unique {
  color: fade(#333333, 50);
}

.count {
  margin: 20upx 0;
  .brage {
    font-size: 30rpx;
    color: #6C63FF;
    font-weight: 600;
    margin: 0 10upx;
  }
}
.input,
.vendor-container {
  border-bottom: 1px solid #6C63FF;
  flex: 1;
  margin-right: 50upx;
  padding: 10upx 0;
  box-sizing: border-box;
}
.vendor-container {
  border-bottom: unset;
  color: #6C63FF;
}
.app-page {
  padding-top: calc(64px + 40upx);
}
.like-list {
  font-size: 30upx;
  .app-page {
    min-height: calc(100vh - 64px - 60upx);
  }
  .list-item {
    position: relative;
    margin-bottom: 30px;
    background: linear-gradient(145deg, fade(#6C63FF, 30), fade(#6C63FF, 10));
    border-radius: 20upx;
    padding: 20upx;
    // box-shadow: 18upx 18upx 50upx fade(#000, 20), 
    //           -18upx -18upx 50upx fade(#6C63FF, 20);
    box-shadow: 18upx 18upx 50upx fade(#000, 20),
                -18upx -18upx 30upx fade(#6C63FF, 15);
              
  }
  .list-item__body {
    padding-top: 30upx;
  }
  // 加载效果
  .loading-box {
    width: 100upx;
    height: 100upx;
    // border-radius: 50%;
    // border: 2px solid #6C63FF;
    box-sizing: border-box;
    background-color: #9d96fa;
    // background-color: #6C63FF;
    clip-path: circle(50upx);
    position: relative;
    .loading-box__inner {
      width: 100%;
      height: 100%;
      // border-radius: 50%;
      background-color: #6C63FF;
      // border: 5px solid seagreen;
      box-sizing: inherit;
      // clip-path: circle(40upx);
      clip-path: polygon(50% 50%, 100% 0, 150% 150%);
      animation: 1s ease roate infinite;
    }
    .loading-box__mask {
      position: absolute;
      width: 80upx;
      height: 80upx;
      background: #ceccf0; // fade(#6C63FF, 30);
      top: 10upx;
      left: 10upx;
      border-radius: 50%;
    }
  }
  .expand-btn {
    // height: 150upx;
    width: 100%;
    // background: linear-gradient(to top, #6C63FF, fade(#FFF, 10));
    // position: absolute;
    // bottom: 0;
    // left: 0;
    border-radius: 20upx;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    color: #FFF;
    font-weight: 600;
    letter-spacing: 2px;
    backdrop-filter: blur(3upx);
    transition: backdrop-filter .3s ease;
    &.is-expand {
      flex-direction: column-reverse;
      justify-content: flex-start;
      padding-bottom: 10upx;
      backdrop-filter: blur(0);
    }
  }
  .expand-image {
    width: 100upx;
    height: 80upx;
  }
}

@keyframes roate {
  0% {
    transform: rotate(0);
    clip-path: polygon(50% 50%, 100% 0, 150% 50%);
  }
  50% {
    clip-path: polygon(50% 50%, 100% 0, 350% 350%);
  }
  100% {
    transform: rotate(360deg);
    clip-path: polygon(50% 50%, 100% 0, 150% 50%);
  }
}
</style>