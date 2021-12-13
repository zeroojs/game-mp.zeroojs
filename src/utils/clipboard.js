export function handleClipboard(data) {
  uni.setClipboardData({
		data,
		success() {
			uni.showToast({ title: '已复制！' })
		},
		fail(e) {
			uni.showToast({ title: '复制失败：' + e })
		}
	})
}
