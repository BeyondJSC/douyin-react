import { QUERY_POST_RECOMMEND } from "src/apis"
import { getFullImgaeUrl, preloadImage } from "src/utils"
import { requestInstacne } from "src/vendors/request"

export interface QueryPostsRecommendParams {
  pageNo: number,
  pageSize: number
}

export interface PostRecommend {
  id: string
  note_card?: {
    cover?: {
      url_default: string
    },
    display_title: string
    user?: {
      avatar: string
      nickname: string
    }
    interact_info?: {
      like_count: number
    }
  }
}

export interface QueryPostsRecommendResponse {
  total: number,
  list: PostRecommend[]
}

export function queryPostsRecommend(params: QueryPostsRecommendParams) {
  return requestInstacne.get<QueryPostsRecommendResponse>({
    url: QUERY_POST_RECOMMEND,
    params
  }).then(({ data }) => {
    let { list } = data

    return Promise.all(list.map(item => preloadImage(getFullImgaeUrl('/' + item.note_card?.cover?.url_default)))).then((preloadInfos) => {
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