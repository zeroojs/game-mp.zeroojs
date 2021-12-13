<template>
  <view class="app-page search-page">
    <view class="filter">
      <view class="filter-body">
        <SearchInput @change="handleSearchChange" />
        <TagGroup>
          <Tag @tap="handleTagTap()" :active="!selectType">全部</Tag>
          <Tag
            v-for="item in types"
            :key="item"
            :active="selectType === item.id"
            @tap="handleTagTap(item)"
          >
            {{ item.name }}
          </Tag>
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
        :is-minus="item.isLike"
        :is-login="isLogin"
        @action="handleAction(item)"
      />
		</List>
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
import { ref, toRaw, watch } from 'vue'
import { productRestful, fetchProductTypeAction } from '@/api/product'
import { delay } from '@/utils'
import { useSign } from '@/utils/sign'

export default {
  components: {
    Tag,
    TagGroup,
    List,
		ListItem,
    SearchInput
  },
  onShow() {
    this.isLogin = !!this.getLocaleUser()
    this.getList()
  },
  setup() {
    const list = ref([])
    const types = ref([])
    const keywords = ref('')
    const selectType = ref('')
    const { isLogin: loginFlag, getLocaleUser } = useSign()
    const isLogin = ref()
    watch(() => loginFlag.value, (val) => {
      isLogin.value = val
      getList()
    }, { immediate: true, deep: true })

    const handleAction = async (item) => {
      const data = toRaw(item)
      await productRestful({ id: data.id, isLike: !data.isLike }, 'PUT')
      item.isLike = !data.isLike
    }

    // 获取产品列表
    async function getList(params) {
      const filter = params && params.filter ? params.filter : {}
      if (keywords.value) {
        filter.where = {
          name: {
            like: keywords.value
          }
        }
      }
      const result = await productRestful({
        ...params,
        filter: {
          order: 'createdAt DESC',
          ...filter
        }
      })
      // console.log(result)
      list.value = result
      // list.value = [
      //   { id: 1, name: '极限竞速：地平线5 WIN10专用', size: 103, avatar: '/static/dpx.png' },
      //   { id: 2, name: '极限竞速：地平线5 WIN10专用', size: 103, avatar: '/static/dpx.png' },
      //   { id: 3, name: '极限竞速：地平线5 WIN10专用', size: 103, avatar: '/static/dpx.png' },
      //   { id: 4, name: '极限竞速：地平线5 WIN10专用', size: 103, avatar: '/static/dpx.png' }
      // ]
      list.value = list.value.map(item => ({ ...item, isRemove: false }))
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
      getList(params)
    }

    // 关键字查询
    watch(() => keywords.value, (val) => {
      console.log(val)
      delay(() => {
        getList()
      }, 500)
    })

    const handleSearchChange = (val) => {
      // console.log('change', val)
      keywords.value = val
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
      getLocaleUser
    }
  }
}
</script>

<style lang="less" scoped>
.search-page {
  padding-top: 300upx;
  min-height: calc(100vh - 320upx);
  background-color: #DBE4F3;
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
