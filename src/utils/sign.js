import { ref, computed } from 'vue'

export function useSign() {
  const user = ref({})
  const isLogin = computed(() => user.value.nickName)
  const getLocaleUser = () => uni.getStorageSync('_uo')
  const localeUser = getLocaleUser()
  if (localeUser) {
    user.value = JSON.parse(localeUser)
  }
  const signin = async () => {
    // 登录逻辑待补充
    // 授权用户信息
    getUserInfo()
  }

  const signout = () => {
    uni.clearStorage()
    user.value = {}
  }

  const getUserInfo = () => {
    uni.getUserProfile({
      provider: 'weixin',
      desc: '显示用户昵称',
      success({ userInfo }) {
        user.value = userInfo
        uni.setStorageSync('_uo', JSON.stringify(userInfo))
      },
      fail() {
        console.log('拉去用户信息失败')
      }
    })
  }
  return { user, isLogin, getLocaleUser, signin, signout }
}