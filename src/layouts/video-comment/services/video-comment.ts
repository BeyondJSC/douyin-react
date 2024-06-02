import { QUERY_VIDEO_COMMENTS } from "src/apis"
import { requestInstacne } from "src/vendors/request"

export interface QueryVideoCommentsParams {
  id: string
}

export interface VideoComment {
  comment_id: string
  content: string
  avatar: string
  nickname: string
  user_buried: boolean
  create_time: number
  digg_count: number
  sub_comment_count: string
  ip_location?: string
}

export function queryVideoComments(params: QueryVideoCommentsParams) {
  return requestInstacne.get<VideoComment[]>({
    url: QUERY_VIDEO_COMMENTS,
    params
  })
}