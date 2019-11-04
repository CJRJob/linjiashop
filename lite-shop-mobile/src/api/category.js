import request from '@/utils/request'

export function getAllCategories() {
  return request({
    url: '/category',
    method: 'get'
  })
}