<template>
  <view class="app-page">
		<List>
			<ListItem />
			<ListItem />
		</List>
    <view>
      <text class="title">{{ title }}</text>
    </view>
		<TabBar current="index" />
  </view>
</template>

<script>
import List from '@/components/List'
import ListItem from '@/components/List/Item'
import TabBar from '../../components/TabBar'

export default {
	components: {
		List,
		ListItem,
		TabBar
	},
  onShow() {
    uni.hideTabBar({})
  },
  setup() {
    return {
      title: 'hello'
    }
  }
}
</script>

<style>

</style>
