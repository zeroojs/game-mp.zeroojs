import { request } from '@/utils/request'

const CLASS_NAME = 'product'

export function productRestful(data, action = 'GET') {
  let url = `/${CLASS_NAME}`
  if (action === 'PUT') {
    url += `/${data.id}`
    const newData = { ...data }
    delete newData.id
    data = { $set: newData }
  }
  return request({
    url,
    method: action,
    data
  })
}

export function fetchProductTypeAction() {
  return request({ url: '/type', data: { limit: -1 } })
}