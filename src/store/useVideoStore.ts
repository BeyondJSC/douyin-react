import { createStore } from "hox"
import { useState } from "react"
import { VideoInfo } from '../views/home/home-main/main-recommend/services/recommend'

export const [ useVideoStore, VideoStoreProvider ] = createStore(() => {
  const [ videoInfo, setVideoInfo ] = useState<VideoInfo>()
  const [ userVideoList, setUserVideoList ] = useState<VideoInfo[]>([])
  const [ currentVideoIndex, setCurrentVideoIndex ] = useState<number>(-1)


  function setPersonalVideoList(videoList: VideoInfo[], index: number) {
    setUserVideoList(videoList.map(video => {
      return {
        ...video,
        author: videoInfo?.author
      }
    }))
    setCurrentVideoIndex(index)
  }

  return {
    videoInfo,
    userVideoList,
    currentVideoIndex, // 当前播放的视频索引

    setVideoInfo,
    setPersonalVideoList
  }
})