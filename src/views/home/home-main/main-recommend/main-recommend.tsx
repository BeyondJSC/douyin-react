import Swiper from "swiper"
import { RenderMainComponentProps } from "../home-main"
import { MainRecommendStyle } from "./main-recommend.style"
import ReactSwiper, { SwiperRefNode } from 'react-id-swiper'
import { RecommendVideoInfo, useRecommendList } from "../../../../layouts/recommend-video/hooks/useRecommendList"
import RecommendVideo from "../../../../layouts/recommend-video/recommend-video"
import { useEffect, useRef, useState } from "react"
import { LoadingOutlined } from "@ant-design/icons"
import { useEventListener } from "../../../../hooks/useEventBus"
import { FooterTab } from "../../../../layouts/footer-tabs/footer-tabs"
import { createPortal } from "react-dom"
import ForwardPopup, { ForwardPopupExpose } from "src/layouts/forward-share/forward-popup"
import { useVideoStore } from "src/store/useVideoStore"
import { useOutletContext } from "react-router-dom"
import { HomeOutletContext } from "../../home"

export default function MainRecommend(props: RenderMainComponentProps) {
  const swiperRef = useRef<SwiperRefNode>(null)
  const [ loading, setLoading ] = useState(false)
  const dyForwardPopupRef = useRef<ForwardPopupExpose>(null)
  const [ currentIndex, setCurrentIndex ] = useState(0)

  const params: Swiper['params'] = {
    direction: 'vertical',
    loop: true,
    allowSlidePrev: false
  }

  const { recommendList, onSlideChange, refreshData } = useRecommendList()
  const { setVideoInfo } = useVideoStore()
  const { toNextSlide } = useOutletContext<HomeOutletContext>()

  useEffect(() => {
    const swiper = swiperRef.current?.swiper
    if (!swiper) return

    function slideChangeHandler(swiper: Swiper) {
      setCurrentIndex(swiper.realIndex)
      onSlideChange(swiper)
    }

    function touchEndHandler(swiper: Swiper) {
      if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev') {
        setLoading(true)
        refreshData().then(() => {
          setLoading(false)
        })
      }
    }

    swiper.on('slideChange', slideChangeHandler)
    swiper.on('touchEnd', touchEndHandler)

    return () => {
      swiper.off('slideChange', slideChangeHandler)
      swiper.off('touchEnd', touchEndHandler)
    }
  }, [onSlideChange, refreshData])

  useEffect(() => {
    if (recommendList.length === 0) return

    const videoInfo = recommendList[currentIndex]!

    setVideoInfo(videoInfo)
    
  }, [currentIndex, recommendList, setVideoInfo])

  useEventListener('refresh', (footerTab: FooterTab) => {
    if (footerTab.type === 'main') {
      setLoading(true)
      refreshData().then(() => {
        setLoading(false)
      })
    }
  })

  function openForwardPopup(videoInfo: RecommendVideoInfo) {
    if (!dyForwardPopupRef.current) return

    dyForwardPopupRef.current.openPopup(videoInfo)
  }

  function handleAvatarClick() {
    toNextSlide()
  }

  function renderRecommendSwiper() {
    if (recommendList.length === 0) return <></>

    return (
      <ReactSwiper
        ref={swiperRef}
        containerClass="main-recommend__wrapper"
        { ...params }
      >
        {
          recommendList.map((recommendItem, idx) => {
            return <div className="main-recommend__slide" key={idx}>
              { recommendItem && 
                <RecommendVideo 
                  key={recommendItem.aweme_id}
                  openForwardPopup={openForwardPopup}
                  videoInfo={recommendItem}
                  onAvatarClick={handleAvatarClick}
                  enableTopSwipers={props.enableTopSwipers}
                  disableTopSwipers={props.disableTopSwipers}
                />
              }
            </div>
          })
        }
      </ReactSwiper>
    )
  }

  function renderLoading() {
    return <div className="main-recommend__loading">
      <LoadingOutlined />
      <span className="main-recommend__loading-text">正在刷新数据...</span>
    </div>
  }

  return (
    <MainRecommendStyle>
      { loading ? renderLoading() : <></> }
      { renderRecommendSwiper() }
      { createPortal(<ForwardPopup ref={dyForwardPopupRef} />, document.body) }
    </MainRecommendStyle>
  )
}