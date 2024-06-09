import { QUERY_SHOP_RECOMMEND } from "src/apis"
import { getFullImgaeUrl, preloadImage } from "src/utils"
import { requestInstacne } from "src/vendors/request"

export interface QueryShoppingGoodsParams {
  pageNo: number,
  pageSize: number
}

export interface ShoppingGood {
  name: string
  cover: string
  imgs: string[]
  price: number
  real_price: number
  isLowPrice: boolean
  discount: string
  sold: number
  originSize?: {
    width: number
    height: number
  }
}

export interface QueryShoppingGoodsResponse {
  total: number,
  list: ShoppingGood[]
}

export function queryShoppingGoods(params: QueryShoppingGoodsParams) {
  return requestInstacne.get<QueryShoppingGoodsResponse>({
    url: QUERY_SHOP_RECOMMEND,
    params
  }).then(({ data }) => {
    let { list } = data

    return Promise.all(list.map(item => preloadImage(getFullImgaeUrl('/goods/' + item.cover)))).then((preloadInfos) => {
      list = list.map((item, index) => {
        const { width, height } = preloadInfos[index]

        return {
          ...item,
          originSize: {
            width,
            height
          }
        }
      })

      return {
        list,
        total: data.total
      }
    })
  })
}