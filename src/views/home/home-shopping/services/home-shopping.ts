import { QUERY_SHOP_RECOMMEND } from "src/apis"
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
}

export interface QueryShoppingGoodsResponse {
  total: number,
  list: ShoppingGood[]
}

export function queryShoppingGoods(params: QueryShoppingGoodsParams) {
  return requestInstacne.get<QueryShoppingGoodsResponse>({
    url: QUERY_SHOP_RECOMMEND,
    params
  })
}