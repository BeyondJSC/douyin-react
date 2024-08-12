import mockAdapter from 'axios-mock-adapter'
import { requestInstacne } from "../vendors/request"
import { QUERY_POST_RECOMMEND, QUERY_SHOP_RECOMMEND, QUERY_USER_FRIENDS, QUERY_USER_VIDEOS, QUERY_VIDEO_COMMENTS, QUERY_VIDEO_RECOMMENDED } from '../apis'
import { getResultByPaganition } from '../utils'
import RecommendViewList from '../assets/data/recommend-video.json'
import ShopGoods from '../assets/data/goods.json'
import UsersList from '../assets/data/users.json'
import PostsList from '../assets/data/posts.json'
import { VideoComment } from 'src/layouts/video-comment/services/video-comment'
import { VideoInfo } from 'src/views/home/home-main/main-recommend/services/recommend'

const mockInstance = new mockAdapter(requestInstacne.instance, {
  delayResponse: 500 // 延迟响应时间，单位是毫秒
})

export function startMock() {
  mockInstance.onGet(new RegExp(QUERY_VIDEO_RECOMMENDED)).reply(async (config) => {
    const listData = getResultByPaganition(RecommendViewList as unknown[], config.params.pageNo, config.params.pageSize)

    return [200, {
      code: 'ok',
      message: 'success',
      data: {
        total: (RecommendViewList as unknown[]).length,
        list: listData
      }
    }]
  })

  mockInstance.onGet(new RegExp(QUERY_USER_FRIENDS)).reply(async () => {
    return [200, {
      code: 'ok',
      message: 'success',
      data: UsersList
    }]
  })

  mockInstance.onGet(new RegExp(QUERY_VIDEO_COMMENTS)).reply(async (config) => {
    const videoIds = [
      "7260749400622894336",
      "7128686458763889956",
      "7293100687989148943",
      "6923214072347512068",
      "7005490661592026405",
      "7161000281575148800",
      "7267478481213181238",
      "6686589698707590411",
      "7321200290739326262",
      "7194815099381484860",
      "6826943630775831812",
      "7110263965858549003",
      "7295697246132227343",
      "7270431418822446370",
      "6882368275695586568",
      "7000587983069957383"
    ]

    const videoId = config.params.id || videoIds[Math.floor(Math.random() * videoIds.length)]

    const commentModules = import.meta.glob('../assets/data/comments/*.json')

    const commentList = await commentModules[`../assets/data/comments/video_id_${videoId}.json`]()

    return [200, {
      code: 'ok',
      message: 'success',
      data: (commentList as { default: VideoComment[] }).default
    }]
  })

  mockInstance.onGet(new RegExp(QUERY_USER_VIDEOS)).reply(async (config) => {
    const id = config.params.id

    const userVideosModules = import.meta.glob('../assets/data/user_video_list/*.json')

    const userVideos = await userVideosModules[`../assets/data/user_video_list/user-${id}.json`]()

    if (userVideos) {
      return [200, {
        code: 'ok',
        message: 'success',
        data: (userVideos as { default: VideoInfo[] }).default
      }]
    } else {
      return [200, {
        code: 'ok',
        message: 'success',
        data: []
      }]
    }
  })

  mockInstance.onGet(new RegExp(QUERY_SHOP_RECOMMEND)).reply(async config => {
    const listData = getResultByPaganition(ShopGoods as unknown[], config.params.pageNo, config.params.pageSize)

    return [200, {
      code: 'ok',
      message: 'success',
      data: {
        total: (ShopGoods as unknown[]).length,
        list: listData
      }
    }]
  })

  mockInstance.onGet(new RegExp(QUERY_POST_RECOMMEND)).reply(async (config) => {
    const listData = getResultByPaganition(PostsList as unknown[], config.params.pageNo, config.params.pageSize)

    return [200, {
      code: 'ok',
      message: 'success',
      data: {
        total: (PostsList as unknown[]).length,
        list: listData
      }
    }]
  })
}