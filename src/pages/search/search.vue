<template>
  <view class="app-page search-page" @click="handleClick">
    <view class="filter">
      <view class="filter-body">
        <SearchInput />
        <TagGroup>
          <Tag>竞速</Tag>
          <Tag>竞速</Tag>
          <Tag>竞速</Tag>
          <Tag>竞速</Tag>
          <Tag>竞速</Tag>
          <Tag>竞速</Tag>
          <Tag>竞速</Tag>
          <Tag>竞速</Tag>
          <Tag>竞速</Tag>
          <Tag>竞速</Tag>
          <Tag>竞速</Tag>
          <Tag>竞速</Tag>
          <Tag>竞速</Tag>
          <Tag>竞速</Tag>
          <Tag>竞速</Tag>
          <Tag>竞速</Tag>
          <Tag>竞速</Tag>
          <Tag>竞速</Tag>
          <Tag>竞速</Tag>
          <Tag>竞速</Tag>
        </TagGroup>
      </view>
      <!-- <view class="filter-bottom"></view> -->
    </view>
    <List>
			<ListItem
        v-for="item in list"
        :key="item.id"
        :name="item.name"
        :size="item.size"
        :src="item.avatar"
        @action="handleAction"
      />
		</List>
  </view>
</template>

<script>
import Tag from '@/components/Tag'
import TagGroup from '@/components/Tag/TagGroup'
import List from '@/components/List'
import ListItem from '@/components/List/Item'
import SearchInput from '@/components/SearchInput'
import { ref } from '@vue/reactivity'

export default {
  components: {
    Tag,
    TagGroup,
    List,
		ListItem,
    SearchInput
  },
  setup() {
    const list = ref([])
    const handleAction = (e) => {
      console.log('search', e)
    }
    const handleClick = (e) => {
      console.log('handleClick', e)
    }

    const getList = async () => {
      list.value = [
        { id: 1, name: '极限竞速：地平线5 WIN10专用', size: 103, avatar: '/static/dpx.png' },
        { id: 2, name: '极限竞速：地平线5 WIN10专用', size: 103, avatar: '/static/dpx.png' },
        { id: 3, name: '极限竞速：地平线5 WIN10专用', size: 103, avatar: '/static/dpx.png' },
        { id: 4, name: '极限竞速：地平线5 WIN10专用', size: 103, avatar: '/static/dpx.png' }
      ]
      list.value = list.value.map(item => ({ ...item, isRemove: false }))
    }
    getList()
    return {
      list,
      getList,
      handleAction,
      handleClick
    }
  }
}
</script>

<style lang="less" scoped>
.search-page {
  padding-top: 300upx;
  min-height: calc(100vh - 360upx);
}
.filter {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
  .filter-body {
    width: calc(100% - 80upx);
    padding: 40upx 40upx 0;
    background-color: #DBE4F3;

  }
  .filter-bottom {
    height: 60upx;
    width: 100%;
    // background: linear-gradient(to bottom, #DBE4F3, fade(#DBE4F3, 80), transparent);
    border-radius: 0 0 10upx;
  }
}
</style>
