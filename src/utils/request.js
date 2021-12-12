import { SHA1 } from './sha1'
// https://docs.apicloud.com/Cloud-API/data-cloud-api#6

const now = Date.now()
const APP_ID = 'A6025488616288'
const APP_KEY = '66F96C1B-95B9-4ACD-6D40-DB4A85F0523A'
// export const request = axios.create({
//   baseURL: '/mcm/api',
//   headers: {
//     'Content-Type': 'application/json',
//     'X-APICloud-AppId': APP_ID,
//     'X-APICloud-AppKey': SHA1(`${APP_ID}UZ${APP_KEY}UZ${now}.${now}`)
//   }
// })

export const request = (params) => {
  return new Promise((resolve, reject) => {
    uni.request({
      ...params,
      url: `https://d.apicloud.com/mcm/api${params.url}`,
      header: {
        'Content-Type': 'application/json',
        'X-APICloud-AppId': APP_ID,
        'X-APICloud-AppKey': SHA1(`${APP_ID}UZ${APP_KEY}UZ${now}`) + '.' + now
      },
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}