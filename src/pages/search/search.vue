<template>
  <view class="search-page">
    <view class="filter">
      <view class="filter-body">
        <SearchInput @change="handleSearchChange" />
        <TagGroup>
          <Tag @tap="handleTagTap()" :active="!selectType">全部</Tag>
          <Tag
            v-for="item in types"
            :key="item.id"
            :active="selectType === item.id"
            @tap="handleTagTap(item)"
          >
            {{ item.name }}
          </Tag>
        </TagGroup>
      </view>
      <!-- <view class="filter-bottom"></view> -->
    </view>
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
          <ListItem
            v-for="item in list"
            :key="item.id"
            :name="item.name"
            :size="item.size"
            :src="item.avatar"
            :is-minus="item.isLike"
            :is-login="isLogin"
            @action="handleAction(item)"
          />
        </List>
        <ListBottomTips v-if="list.length > 5" :loading="pullUpLoading" />
      </view>
    </scroll-view>
    <view v-if="!list.length" class="empty-tips">
      抱歉，没有找到你要的宝贝！
    </view>
  </view>
</template>

<script>
import Tag from '@/components/Tag'
import TagGroup from '@/components/Tag/TagGroup'
import List from '@/components/List'
import ListItem from '@/components/List/Item'
import SearchInput from '@/components/SearchInput'
import ListBottomTips from '@/components/ListBottomTips'
import { reactive, ref, toRaw, watch } from 'vue'
import { productRestful, fetchProductTypeAction } from '@/api/product'
import { delay } from '@/utils'
import { useSign } from '@/utils/sign'

export default {
  components: {
    Tag,
    TagGroup,
    List,
		ListItem,
    SearchInput,
    ListBottomTips
  },
  onShow() {
    this.isLogin = !!this.getLocaleUser()
    this.getList({}, true)
  },
  setup() {
    const list = ref([])
    const types = ref([])
    const keywords = ref('')
    const selectType = ref('')
    const { isLogin: loginFlag, getLocaleUser } = useSign()
    const isLogin = ref()
    const pullUpLoading = ref(false)
    const pullDownLoading = ref(false)
    const pagination = reactive({
      limit: 6,
      offset: 0
    })

    watch(() => loginFlag.value, (val) => {
      isLogin.value = val
      getList({}, true)
    }, { immediate: true, deep: true })

    const handleAction = async (item) => {
      const data = toRaw(item)
      await productRestful({ id: data.id, isLike: !data.isLike }, 'PUT')
    }

    // 获取产品列表
    async function getList(params, isSearch = false) {
      const filter = params && params.filter ? params.filter : {}
      if (keywords.value) {
        filter.where = {
          name: {
            like: keywords.value
          }
        }
      }
      // 分页
      const pageParams = isSearch ? {} : {
        limit: pagination.limit,
        skip: pagination.limit * pagination.offset
      }
      const result = await productRestful({
        ...params,
        filter: {
          order: 'createdAt DESC',
          ...filter,
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

    // 获取类型列表
    const fetchProductType = async () => {
      const result = await fetchProductTypeAction()
      types.value = result
    }
    fetchProductType()

    // 分类查询
    const handleTagTap = (type) => {
      selectType.value = type ? type.id : ''
      const params = !type ? {} : {
        filter: { where: { type: { like: type.id } } }
      }
      pagination.offset = 0
      getList(params, true)
    }

    // 关键字查询
    watch(() => keywords.value, (val) => {
      delay(() => {
        pagination.offset = 0
        getList({}, true)
      }, 500)
    })

    // vue3 自定义双向绑定失效代替
    const handleSearchChange = (val) => {
      keywords.value = val
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
    return {
      list,
      types,
      keywords,
      selectType,
      getList,
      handleAction,
      handleTagTap,
      handleSearchChange,
      isLogin,
      getLocaleUser,
      pullUpLoading,
      pullDownLoading,
      handleScrolltolower,
      handleRefresherpulling
    }
  }
}
</script>

<style lang="less" scoped>
.search-page {
  padding-top: 300upx;
  min-height: calc(100vh - 300upx);
  background-color: #DBE4F3;
}
.scroll {
  max-height: calc(100vh - 300upx);
}
.list-container {
  padding: 0 40upx;
  width: calc(100% - 80upx);
  min-height: calc(100vh - 320upx);
}
.empty-tips {
  min-height: 50vh;
  font-size: 26upx;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
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
