import { CSSProperties, useEffect, useRef, useState } from "react"
import { PersonalVideoStyle } from "./personal-video.style"
import ReactSwiper, { SwiperRefNode } from "react-id-swiper"
import ForwardPopup, { ForwardPopupExpose } from "src/layouts/forward-share/forward-popup"
import Swiper from "swiper"
import { RecommendVideoInfo, RenderItemCount, useRecommendList } from "src/layouts/recommend-video/hooks/useRecommendList"
import RecommendVideo from "src/layouts/recommend-video/recommend-video"
import { LeftOutlined, LoadingOutlined } from "@ant-design/icons"
import { createPortal } from "react-dom"
import { useNavigate } from "react-router-dom"
import { PopupContext, PopupRefExpose, usePopup } from "src/views/home/hooks/usePopup"
import CommentPopup from "src/layouts/video-comment/comment-popup"
import { useVideoStore } from "src/store/useVideoStore"
import { getResultByPaganition } from "src/utils"

export default function PersonalVideo() {
  const swiperRef = useRef<SwiperRefNode>(null)
  const [ loading, setLoading ] = useState(false)
  const dyForwardPopupRef = useRef<ForwardPopupExpose>(null)

  const { userVideoList, currentVideoIndex } = useVideoStore()
  const { recommendList, onSlideChange, refreshData } = useRecommendList({
    startPageNo: parseInt('' + currentVideoIndex / RenderItemCount) + 1,
    getVideoList (params) {
      const { pageNo, pageSize } = params

      const listData = getResultByPaganition(userVideoList, pageNo, pageSize)
      
      return Promise.resolve({
        code: 'ok',
        message: 'success',
        data: {
          total: userVideoList.length,
          list: listData
        }
      })
    }
  })
  
  const navigate = useNavigate()

  const params: Swiper['params'] = {
    direction: 'vertical',
    loop: true,
    initialSlide: currentVideoIndex % RenderItemCount,
    allowSlidePrev: currentVideoIndex !== 0
  }
  
  const commentPopupRef = useRef<PopupRefExpose>(null)
  const { popupVisible, popupHeight, openPopup, closePopup } = usePopup([
    {
      type: 'COMMENT',
      popupRef: commentPopupRef,
      popupHeight: 628
    }
  ])

  const personalVideoStyle: CSSProperties = {
    height: popupVisible ? `calc(100vh - ${popupHeight}px)` : `100vh`
  }

  useEffect(() => {
    const swiper = swiperRef.current?.swiper
    if (!swiper) return

    function slideChangeHandler(swiper: Swiper) {
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

  function openForwardPopup(videoInfo: RecommendVideoInfo) {
    if (!dyForwardPopupRef.current) return

    dyForwardPopupRef.current.openPopup(videoInfo)
  }

  function handleBackClick() {
    // TODO: 根级别路由没有keep-alive，返回时会刷新状态，导致无法回到个人主页
    navigate(-1)
  }

  function handleMaskClick() {
    closePopup()
  }

  function renderRecommendSwiper() {
    if (recommendList.length === 0) return <></>

    return (
      <ReactSwiper
        ref={swiperRef}
        containerClass="personal-video__wrapper"
        { ...params }
      >
        {
          recommendList.map((recommendItem, idx) => {
            return <div className="personal-video__slide" key={idx}>
              { recommendItem && 
                <RecommendVideo 
                  key={recommendItem.aweme_id}
                  onAvatarClick={handleBackClick}
                  openForwardPopup={openForwardPopup}
                  videoInfo={recommendItem}
                />
              }
            </div>
          })
        }
      </ReactSwiper>
    )
  }

  function renderLoading() {
    return <div className="personal-video__loading">
      <LoadingOutlined />
      <span className="personal-video__loading-text">正在刷新数据...</span>
    </div>
  }

  return (
    <PersonalVideoStyle className={`${ popupVisible ? 'is-mask' : '' }`} style={personalVideoStyle}>
      <div className="personal-video__header">
        <div className="personal-video__back" onClick={handleBackClick}>
          <LeftOutlined />
        </div>
      </div>
      { loading ? renderLoading() : <></> }
      <div className="personal-video__mask" onClick={handleMaskClick}></div>
      <PopupContext.Provider value={{ popupVisible, popupHeight, openPopup, closePopup }}>
        { renderRecommendSwiper() }
      </PopupContext.Provider>
      { createPortal(<ForwardPopup ref={dyForwardPopupRef} />, document.body) }

      <CommentPopup className="peronal-video__comment-popup" ref={commentPopupRef} popupVisible={popupVisible} onClose={closePopup} />
    </PersonalVideoStyle>
  )
}