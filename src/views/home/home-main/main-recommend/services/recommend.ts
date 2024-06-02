import { QUERY_VIDEO_RECOMMENDED } from "../../../../../apis"
import { requestInstacne } from "../../../../../vendors/request"

export interface QueryVideoRecommendedParams {
  pageNo: number,
  pageSize: number
}

export interface VideoInfo {
  aweme_id: string
  desc: string
  video: {
    play_addr: {
      url_list: string[]
    },
    cover: {
      url_list: string[]
    }
  },
  music?: {
    cover_thumb: {
      url_list: string[]
    }
  },
  author?: {
    nickname: string
    desc: string
    avatar_168x168: {
      url_list: string[]
    }
    cover_url: Array<{
      url_list: string[]
    }>
    city?: string
    address?: string
    unique_id?: string
    short_id?: string
    signature?: string
    user_age: number
    ip_location?: string
    province?: string
    aweme_count: number
    total_favorited: number
    following_count: number
    mplatform_followers_count: number
  },
  statistics: {
    digg_count: number
    comment_count: number
    collect_count: number
    share_count: number
  }
}

export interface QueryVideoRecommendedResponse {
  total: number,
  list: VideoInfo[]
}

export function queryVideoRecommended(params: QueryVideoRecommendedParams) {
  return requestInstacne.get<QueryVideoRecommendedResponse>({
    url: QUERY_VIDEO_RECOMMENDED,
    params
  })
}