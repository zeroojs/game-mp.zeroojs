<template>
  <view class="like-page">
    <scroll-view
      v-if="list.length"
      :scroll-y="true"
      :refresher-enabled="true"
      :refresher-triggered="pullDownLoading" 
      refresher-background="#DBE4F3"
      class="scroll"
      @scrolltolower="handleScrolltolower"
      @refresherpulling="handleRefresherpulling"
    >
      <view class="list-container">
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
                :is-login="isLogin"
                @action="handleRemove(item)"
              />
            </view>
          </div>
        </List>
        <ListBottomTips v-if="list.length > 5" :loading="pullUpLoading" />
      </view>
    </scroll-view>
    <div v-if="!list.length" class="tips-container" :class="{ 'is-login': isLogin }">
      <view v-if="!isLogin"></view>
      <view class="empty-tips">
        <view @tap="toSearch()" class="link-style">去这里 -></view>
        选择你心爱的游戏吧！
      </view>
      <view v-if="!isLogin" class="login-tips">
        <z-button @tap="signin()">立即登录</z-button>
      </view>
    </div>
    <cover-view v-if="list.length" class="action-group flex bewteen">
      <cover-view class="flex">
        <cover-view class="flex select-all-btn" @click="selectedAll()">
          <cover-view :class="{ active: isSelectedAll }" class="select-button"></cover-view>
          全选
        </cover-view>
        <cover-view class="del-btn" @tap="handleRemove()">删除</cover-view>
      </cover-view>
      <cover-view class="flex">
        <cover-view class="flex">
          <cover-view class="size-text__label">总计容量:</cover-view>
          <cover-view class="size-text">{{ countSize }}GB</cover-view>
        </cover-view>
        <cover-view class="primary-btn" @tap="addLikes()">确定</cover-view>
      </cover-view>
    </cover-view>
  </view>
</template>

<script>
import { computed, ref, toRaw, watch, reactive } from 'vue'
import List from '@/components/List'
import ListItem from '@/components/List/Item'
import SearchInput from '@/components/SearchInput'
import ZButton from '@/components/ZButton'
import ListBottomTips from '@/components/ListBottomTips'
import { productRestful, inventoryRestful } from '@/api'
import { useSign } from '@/utils/sign'
import { delay } from '@/utils'

export default {
  name: 'LikePage',
  components: {
    List,
		ListItem,
    SearchInput,
    ZButton,
    ListBottomTips
  },
  onShow() {
    this.isLogin = !!this.getLocaleUser()
    if (this.isLogin) {
      this.getList(true)
    } else {
      this.list = []
    }
  },
  setup() {
    const { isLogin: loginFlag, signin, getLocaleUser } = useSign()
    const isLogin = ref()
    const { isRemove, remove } = useRemove()
    const {
      list,
      selected,
      countSize,
      delLike,
      isSelected,
      selectedLike,
      isSelectedAll,
      selectedAll,
      addLikes,
      getList,
      pullUpLoading,
      pullDownLoading,
      handleScrolltolower,
      handleRefresherpulling
    } = useLike()

    watch(() => loginFlag.value, (val) => {
      isLogin.value = val
      getList(true)
      if (!val) {
        list.value = []
      }
    }, { immediate: true, deep: true })

    const handleRemove = async (item) => {
      await remove(item || toRaw(selected.value), list)
      delLike(item)
    }

    // 前往搜索
    const toSearch = () => {
      uni.switchTab({ url: '/pages/search/search' })
    }
    return {
      list,
      countSize,
      isRemove,
      handleRemove,
      isSelected,
      selectedLike,
      isSelectedAll,
      selectedAll,
      toSearch,
      addLikes,
      getList,
      isLogin,
      signin,
      getLocaleUser,
      pullUpLoading,
      pullDownLoading,
      handleScrolltolower,
      handleRefresherpulling
    }
  }
}
// 喜欢列表
function useLike() {
  const list = ref([])
  const selected = ref([])
  const pullUpLoading = ref(false)
  const pullDownLoading = ref(false)
  const pagination = reactive({
    limit: 6,
    offset: 0
  })
  // 总容量
  const countSize = computed(() => {
    const result = selected.value.reduce((t, p) => {
      return t + p.size
    }, 0)
    return result === 0 ? result.toFixed(2) : result
  })

  // 获取喜欢列表数据
  const getList = async (isSearch = false) => {
    // 分页
    const pageParams = {
      limit: pagination.limit,
      skip: pagination.limit * pagination.offset
    }
    const result = await productRestful({
      filter: {
        order: 'upeateAt DESC',
        where: { isLike: true },
        ...pageParams
      }
    })
    const listData = result.map(item => ({ ...item, isRemove: false }))
    if (!list.value.length || isSearch) {
      list.value = listData
      return
    }
    const tempList = toRaw(list.value)
    listData.forEach(item => {
      if (!tempList.some(l => l.id === item.id)) {
        tempList.push(item)
      }
    })
    list.value = tempList
  }

  // 上拉加载
  const handleScrolltolower = () => {
    pullUpLoading.value = true
    delay(() => {
      if (!pagination.offset) {
        pagination.offset++
      }
      getList()
        .then(() => {
          pullUpLoading.value = false
          pagination.offset++
        })
    }, 500)
  }

  // 下拉刷新
  const handleRefresherpulling = async () => {
    pullDownLoading.value = true
    delay(() => {
      pagination.offset = 0
      getList()
        .then(() => {
          pullDownLoading.value = false
        })
    }, 500)
  }

  // 批量删除
  const delLikes = async () => {
    list.value = list.value.filter(l => {
      const isDel = !selected.value.some(sl => sl.id === l.id)
      if (!isDel) {
        productRestful({ id: l.id, isLike: false }, 'PUT')
        removeSelectedLikeItem(l.id)
      }
      return isDel
    })
  }

  // 删除某一项
  const delLike = async (item) => {
    if (!item) {
      delLikes()
      return
    }
    productRestful({ id: item.id, isLike: false }, 'PUT')
    list.value = list.value.filter(l => l.id !== item.id)
    if (selected.value.some(sl => sl.id === item.id)) {
      removeSelectedLikeItem(item.id)
    }
  }

  // 选中
  const selectedLike = (item) => {
    const { id } = item
    if (isSelected(item)) {
      removeSelectedLikeItem(id)
      return
    }
    selected.value.push(item)
  }
  // 移除选中
  const removeSelectedLikeItem = (id) => {
    selected.value = selected.value.filter(i => i.id !== id)
  }

  // 判断是否选择项
  const isSelected = ({ id }) => selected.value.some(i => i.id === id)

  // 是否已全选
  const isSelectedAll = computed(() => selected.value.length === list.value.length)

  // 全选操作
  const selectedAll = () => {
    if (isSelectedAll.value) {
      selected.value = []
      return
    }
    selected.value = list.value
  }

  // 加入到我喜欢清单
  const addLikes = async () => {
    const params = {
      total: selected.value.length,
      totalSize: countSize.value,
      products: selected.value,
      vendorId: ''
    }
    if (!params.total) return
    await inventoryRestful(params, 'POST')
    uni.navigateTo({ url: '/pages/like/list' })
  }
  return { 
    list,
    countSize,
    selected,
    addLikes,
    delLike,
    getList,
    selectedLike,
    isSelected,
    isSelectedAll,
    selectedAll,
    pullUpLoading,
    pullDownLoading,
    handleScrolltolower,
    handleRefresherpulling
  }
}

// 移除动画效果
function useRemove() {
  const isRemove = ref(false)
  let timer = 0
  const remove = (item) => {
    item.isRemove = true
    return new Promise(resolve => {
      timer = setTimeout(() => {
        item.isRemove = false
        resolve(item)
      }, 800)
    })
      .then(() => {
        timer = 0
        clearTimeout(timer)
        return item
      })
  }
  const batchRemove = (items = [], list) => {
    const result = []
    list.value.forEach(item => {
      if (items.some(sl => sl.id === item.id)) {
        result.push(remove(item))
      }
    })
    return Promise.all(result)
  }

  const preRemove = async (select, list) => {
    const isArr = select instanceof Array
    const result = await (isArr ? batchRemove(select, list) : remove(select))
    return result
  }
  return { isRemove, remove: preRemove }
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

.list-container {
  width: calc(100% - 80upx);
  padding: 0 40upx;
}
.tips-container {
  .flex;
  min-height: calc(100vh - 100upx);
  flex-direction: column;
  justify-content: space-between;
  &.is-login {
    justify-content: center;
  }
}
.like-page {
  padding-top: 40upx;
  padding-bottom: 60upx;
  min-height: calc(100vh - 100upx);
  background-color: #DBE4F3;
}
.scroll {
  max-height: calc(100vh - 180upx);
}
.empty-tips {
  text-align: center;
  font-size: 26upx;
  color: #999;
}
.link-style {
  color: #6C63FF;
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
    animation: slidRemove .6s cubic-bezier(.03,.63,.84,.24) forwards;
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
    // transform: translateX(0);
    transform: scale(1);
  }
  // 25% {
  //   transform: translateX(-10%);
  // }
  100% {
    opacity: 0;
    transform: scale(.3);
    // transform: translateX(150%);
  }
}
</style>
