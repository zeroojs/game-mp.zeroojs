<template>
  <view class="like-list app-page">
    <view class="list">
      <view
        v-for="likeItem in list"
        :key="likeItem.id"
        class="list-item"
      >
        <view class="list-item__head">
          <view class="flex between">
            <text>编号：123456</text>
            <button class="btn text">点我复制编号</button>
          </view>
          <view class="count">
            选择了
            <text class="brage">100</text>
            个游戏共计
            <text class="brage">100 GB</text>
          </view>
          <view class="flex input-container">
            <input class="input" placeholder="粘贴您的淘宝编号" />
            <button class="btn">保存</button>
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
        <view class="list-ite__footer">
          <cover-view class="expand-btn">
            <!-- <cover-view>∧</cover-view> -->
            <cover-view>展开</cover-view>
            <cover-view>∨</cover-view>
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

export default defineComponent({
  name: 'LikeList',
  components: {
    List,
		ListItem
  },
  setup() {
    return {
      ...useList()
    }
  }
})

function useList() {
  const list = ref([])

  const getList = async () => {
    list.value = [
      {
        id: 1,
        noaid: 'abcdefg',
        vendorId: '', // 第三方平台 id
        products: [
          { id: 1, name: '极限竞速：地平线5 WIN10专用', size: 103, avatar: '/static/dpx.png' },
          { id: 2, name: '极限竞速：地平线5 WIN10专用', size: 103, avatar: '/static/dpx.png' }
        ]
      },
      {
        id: 2,
        noaid: 'abcdefg',
        vendorId: '', // 第三方平台 id
        products: [
          { id: 1, name: '极限竞速：地平线5 WIN10专用', size: 103, avatar: '/static/dpx.png' },
          { id: 2, name: '极限竞速：地平线5 WIN10专用', size: 103, avatar: '/static/dpx.png' }
        ]
      },
    ]
  }
  getList()
  return { list, getList }
}
</script>

<style lang="less" scoped>
.flex {
  display: flex;
  align-items: center;
  &.between {
    justify-content: space-between;
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

.count {
  margin: 20upx 0;
  .brage {
    font-size: 30rpx;
    color: #6C63FF;
    font-weight: 600;
    margin: 0 10upx;
  }
}
.input {
  border-bottom: 1px solid #6C63FF;
  flex: 1;
  margin-right: 50upx;
  padding: 10upx 0;
}
.like-list {
  font-size: 30upx;
  .list-item {
    position: relative;
    margin-bottom: 30px;
    background: linear-gradient(145deg, fade(#6C63FF, 30), fade(#6C63FF, 10));
    border-radius: 20upx;
    padding: 20upx;
    box-shadow: 18upx 18upx 50upx fade(#000, 20), 
              -18upx -18upx 50upx fade(#6C63FF, 20);
  }
  .list-item__body {
    padding-top: 30upx;
  }
  .expand-btn {
    height: 150upx;
    width: 100%;
    background: linear-gradient(to top, #6C63FF, transparent);
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 20upx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #FFF;
    font-weight: 600;
    letter-spacing: 2px;
  }
}
</style>