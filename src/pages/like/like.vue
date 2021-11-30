<template>
  <view class="app-page like-page">
    <List>
      <div
        v-for="item in list"
        :key="item.id"
        :class="{ 'is-remove': item.isRemove }"
        class="flex like-list-item"
        @tap="selectedLike(item)"
      >
        <view class="select-button" :class="{ active: isSelected(item) }"></view>
			  <view class="like-list-item__content">
          <ListItem
            :is-minus="true"
            :name="item.name"
            :size="item.size"
            :src="item.avatar"
            @action="handleRemove(item)"
          />
        </view>
      </div>
		</List>
    <cover-view class="action-group flex bewteen">
      <cover-view class="flex">
        <cover-view class="flex select-all-btn" @click="selectedAll()">
          <cover-view :class="{ active: isSelectedAll }" class="select-button"></cover-view>
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
import { computed, ref } from 'vue'
import List from '@/components/List'
import ListItem from '@/components/List/Item'
import SearchInput from '@/components/SearchInput'

export default {
  name: 'LikePage',
  components: {
    List,
		ListItem,
    SearchInput
  },
  setup() {
    const { isRemove, remove } = useRemove()
    const { list, delLike, isSelected, selectedLike, isSelectedAll, selectedAll } = useLike()

    const handleRemove = async (item) => {
      await remove(item)
      delLike(item)
      console.log('移除 Item')
    }
    return {
      list,
      isRemove,
      handleRemove,
      isSelected,
      selectedLike,
      isSelectedAll,
      selectedAll
    }
  }
}
// 喜欢列表
function useLike() {
  const list = ref([])
  const selected = ref([])

  // 获取喜欢列表数据
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

  // 删除某一项
  const delLike = async (item) => {
    list.value = list.value.filter(l => l.id !== item.id)
  }

  // 选中
  const selectedLike = ({ id }) => {
    if (isSelected({ id })) {
      selected.value = selected.value.filter(i => i !== id)
      return
    }
    selected.value.push(id)
  }

  // 判断是否选择项
  const isSelected = ({ id }) => selected.value.includes(id)

  // 是否已全选
  const isSelectedAll = computed(() => selected.value.length === list.value.length)

  // 全选操作
  const selectedAll = () => {
    if (isSelectedAll.value) {
      selected.value = []
      return
    }
    selected.value = list.value.map(i => i.id)
  }
  return { list, delLike, getList, selectedLike, isSelected, isSelectedAll, selectedAll }
}

// 移除动画效果
function useRemove(props) {
  const isRemove = ref(false)
  let timer = 0
  const remove = (item) => {
    // isRemove.value = true
    item.isRemove = true
    return new Promise(resolve => {
      timer = setTimeout(() => {
        // isRemove.value = false
        item.isRemove = false
        clearTimeout(timer)
        timer = 0
        resolve()
      }, 800)
    })
  }
  return { isRemove, remove }
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
  &.is-remove {
    animation: slidRemove .8s cubic-bezier(.03,.63,.84,.24);
  }
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

@keyframes slidRemove {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10%);
  }
  100% {
    opacity: 0.6;
    transform: translateX(150%);
  }
}
</style>
