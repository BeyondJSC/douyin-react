import { useEffect, useRef, useState } from "react"
import { QueryVideoRecommendedParams, QueryVideoRecommendedResponse, VideoInfo, queryVideoRecommended } from "../../../views/home/home-main/main-recommend/services/recommend"
import Swiper from "swiper"
import { BusinessData } from "src/plugins/request"

export const RenderItemCount = 5

export interface RecommendVideoInfo extends VideoInfo {
  dataIndex: number
}

export interface RecommendVideoOptions {
  startPageNo?: number
  getVideoList?: (params: QueryVideoRecommendedParams) => Promise<BusinessData<QueryVideoRecommendedResponse>>
}

export function useRecommendList(options?: RecommendVideoOptions) {
  const currentPageNo = useRef(options?.startPageNo || 1)

  const [ pageNo, setPageNo ] = useState(currentPageNo.current)
  const [ pageSize ] = useState(RenderItemCount)
  const [ insertIndex, setInsertIndex ] = useState(0)
  const [ recommendList, setRecommendList ] = useState<Array<RecommendVideoInfo | null>>(new Array(RenderItemCount * 2).fill(null))

  const queryVideoRecommendedList = (pageNo: number, pageSize: number, insertIndex: number) => {
    console.log(`开始请求第${pageNo}页的数据`)

    function updateRecommendList({ data }: BusinessData<QueryVideoRecommendedResponse>) {
      const { list } = data

      setRecommendList(recommendList => {
        const copyedList = [...recommendList]
        
        copyedList.splice(insertIndex, list.length, ...list.map((item, index) => ({ ...item, dataIndex: index + (pageNo - 1) * pageSize })))
        
        return copyedList
      })

      console.log(`完成第${pageNo}页数据的请求`)

      return
    }

    if (options && options.getVideoList) {
      return options.getVideoList({
        pageNo,
        pageSize
      }).then(updateRecommendList)
    }

    return queryVideoRecommended({
      pageNo,
      pageSize
    }).then(updateRecommendList)
  }

  useEffect(() => {
    queryVideoRecommendedList(pageNo, pageSize, insertIndex)
  }, [pageNo, pageSize, insertIndex])

  function updateRecommendList(swiper: Swiper) {
    const currentVideo = recommendList[swiper.realIndex]
    if (swiper.realIndex === (RenderItemCount - 1) && swiper.swipeDirection === 'next') {
      const nextVideo = recommendList[swiper.realIndex + 1]

      if (nextVideo && currentVideo && nextVideo.dataIndex === currentVideo.dataIndex + 1) {
        // 数据已经加载过了
        return
      }
      
      setInsertIndex(RenderItemCount)
      setPageNo(currentPageNo.current + 1)
    } else if (swiper.realIndex === (RenderItemCount * 2 - 1) && swiper.swipeDirection === 'next') {
      const nextVideo = recommendList[0]

      if (nextVideo && currentVideo && nextVideo.dataIndex === currentVideo.dataIndex + 1) {
        return
      }
      
      setInsertIndex(0)
      setPageNo(currentPageNo.current + 1)
    } else if (swiper.realIndex === RenderItemCount && swiper.swipeDirection === 'prev') {
      const prevVideo = recommendList[swiper.realIndex - 1]

      if (prevVideo && currentVideo && prevVideo.dataIndex === currentVideo.dataIndex - 1) {
        return
      }

      setInsertIndex(0)
      setPageNo(currentPageNo.current - 1)
    } else if (swiper.realIndex === 0 && swiper.swipeDirection === 'prev') {
      const prevVideo = recommendList[recommendList.length - 1]

      if (prevVideo && currentVideo && prevVideo.dataIndex === currentVideo.dataIndex - 1) {
        return
      }

      if (currentPageNo.current > 1) {
        setInsertIndex(RenderItemCount)
        setPageNo(currentPageNo.current - 1)
      }
    }
  }

  function updateCurrentPage(swiper: Swiper) {
    if (swiper.realIndex % RenderItemCount === 0) {
      const currentVideo = recommendList[swiper.realIndex]

      if (currentVideo) {
        currentPageNo.current = currentVideo.dataIndex / RenderItemCount + 1
        console.log('currentPage', currentPageNo.current)
      }
    }
  }

  function refreshData() {
    return queryVideoRecommendedList(pageNo, pageSize, insertIndex)
  }


  function onSlideChange(swiper: Swiper) {
    
    if (swiper.realIndex === 0 && swiper.swipeDirection === 'prev' && currentPageNo.current === 1) {
      swiper.allowSlidePrev = false
    } else {
      swiper.allowSlidePrev = true
    }


    updateCurrentPage(swiper)

    updateRecommendList(swiper)
  }

  return {
    recommendList,

    onSlideChange,

    refreshData
  }
}