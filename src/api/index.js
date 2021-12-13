import { request } from '@/utils/request'
export * from './product'

// 清单 restful
export function inventoryRestful(data = {}, action = 'GET') {
  let url = '/inventory'
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