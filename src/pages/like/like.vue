<template>
  <view class="app-page like-page">
    <List>
      <div class="flex like-list-item">
        <view class="select-button"></view>
			  <view class="like-list-item__content">
          <ListItem :is-minus="true" />
        </view>
      </div>
      <div class="flex like-list-item">
        <view class="select-button active"></view>
			  <view class="like-list-item__content">
          <ListItem :is-minus="true" />
        </view>
      </div>
      <div class="flex like-list-item">
        <view class="select-button"></view>
			  <view class="like-list-item__content">
          <ListItem :is-minus="true" />
        </view>
      </div>
		</List>
    <cover-view class="action-group flex bewteen">
      <cover-view class="flex">
        <cover-view class="flex select-all-btn">
          <cover-view class="select-button active"></cover-view>
          全选
        </cover-view>
        <cover-view class="del-btn">删除</cover-view>
      </cover-view>
      <cover-view class="flex">
        <cover-view class="flex">
          <cover-view class="size-text__label">总计容量:</cover-view>
          <cover-view class="size-text">0.00GB</cover-view>
        </cover-view>
        <cover-view class="primary-btn">确定</cover-view>
      </cover-view>
    </cover-view>
  </view>
</template>

<script>
import Tag from '@/components/Tag'
import TagGroup from '@/components/Tag/TagGroup'
import List from '@/components/List'
import ListItem from '@/components/List/Item'
import SearchInput from '@/components/SearchInput'

export default {
  name: 'LikePage',
  components: {
    Tag,
    TagGroup,
    List,
		ListItem,
    SearchInput
  }
}
</script>

<style lang="less" scoped>
.flex {
  display: flex;
  align-items: center;
  &.bewteen {
    justify-content: space-between;
  }
}
.like-page {
  padding-bottom: 300upx;
}
.select-button {
  width: 30upx;
  height: 30upx;
  border-radius: 50%;
  border: 2upx solid #6C63FF;
  position: relative;
  box-sizing: border-box;
  &::before {
    content: " ";
    width: 15upx;
    height: 15upx;
    background-color: transparent;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &.active::before {
    background-color: #6C63FF;
  }
}
.like-list-item {
  gap: 20upx;
  .select-button {
    margin-bottom: 40upx;
    width: 40upx;
    height: 40upx;
    &::before {
      content: " ";
      width: 25upx;
      height: 25upx;
    }
  }
  .like-list-item__content {
    width: calc(100% - 60upx);
  }
}
.action-group {
  height: 120upx;
  width: 100%;
  background: linear-gradient(to top, #DBE4F3, #fff);
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 20upx 20upx 0;
  border-radius: 40upx 40upx 0 0;
  overflow: hidden;
  box-shadow: 0 0 30upx fade(#6C63FF, 20);
  box-sizing: border-box;
  font-size: 30upx;
  letter-spacing: 1px;
  // 全选按钮
  .select-all-btn {
    margin-right: 20upx;
    .select-button {
      margin-right: 10upx;
    }
  }
  // 删除按钮
  .del-btn {
    border: 1px solid #F56C6C;
    color: #F56C6C;
    padding: 5upx 20upx;
    border-radius: 40upx;
    font-size: 24upx;
  }
  //  确认按钮
  .primary-btn {
    background-color: #6C63FF;
    color: #FFF;
    padding: 8upx 20upx;
    border-radius: 40upx;
    font-size: 24upx;
  }
  // 总计大小
  .size-text__label {
    font-size: 22upx;
    letter-spacing: unset;
  }
  .size-text {
    font-size: 36upx;
    font-weight: bold;
    letter-spacing: unset;
    margin: 0 20upx;
    color: #6C63FF;
  }
}
</style>
