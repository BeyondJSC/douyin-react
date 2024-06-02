import { QUERY_USER_VIDEOS } from "src/apis"
import { requestInstacne } from "src/vendors/request"
import { VideoInfo } from "../../home-main/main-recommend/services/recommend"

export interface QueryUserVideoListParams {
  id: string
}

export function queryUserVideoList(params: QueryUserVideoListParams) {
  return requestInstacne.get<VideoInfo[]>({
    url: QUERY_USER_VIDEOS,
    params
  })
}