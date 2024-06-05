import { useCallback, useEffect, useRef, useState } from "react"
import { HomeStyle } from "./home.style"
import ReactSwiper, { SwiperRefNode } from 'react-id-swiper'
import Swiper from "swiper"
import HomeSidebar from "./home-sidebar/home-sidebar"
import HomePersonal from "./home-personal/home-personal"
import { Outlet } from "react-router-dom"
import FooterTabs, { FooterTab } from "../../layouts/footer-tabs/footer-tabs"
import { useEmitEvent } from "../../hooks/useEventBus"
import CommentPopup from "src/layouts/video-comment/comment-popup"
import { PopupContext, PopupRefExpose, usePopup } from "./hooks/usePopup"
import { useUserStore } from "src/store/useUserStore"

export interface HomeOutletContext {
  toPrevSlide: () => void,
  toNextSlide: () => void,
  enableSwiperSlide: () => void,
  disableSwiperSlide: () => void,
}

export interface PopupProviderProps extends PopupContext {
  children: React.ReactNode
}

export function PopupProvider(props: PopupProviderProps) {
  const { children, popupVisible, popupHeight, openPopup, closePopup } = props

  return (
    <PopupContext.Provider value={{
      popupVisible,
      popupHeight,
      openPopup,
      closePopup
    }}>{children}</PopupContext.Provider>
  )
}

export default function Home() {
  const swiperRef = useRef<SwiperRefNode>(null)
  const [ activeSlideIdx, setActiveSlideIdx ] = useState<number>(1)
  const { emit } = useEmitEvent()
  const commentPopupRef = useRef<PopupRefExpose>(null)
  const { popupVisible, popupHeight, openPopup, closePopup } = usePopup([
    {
      type: 'COMMENT',
      popupRef: commentPopupRef,
      popupHeight: 628
    }
  ])
  const { isLightTheme } = useUserStore()

  const params: Swiper['params'] = {
    initialSlide: 1,
    slidesPerView: 'auto'
  }

  function toPrevSlide() {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev()
      setActiveSlideIdx(activeSlideIdx - 1)
    }
  }

  function toNextSlide() {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext()
      setActiveSlideIdx(activeSlideIdx + 1)
    }
  }

  const enableSwiperSlide = useCallback(() => {
    console.log('enable swiper')
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.enable()
    }
  }, [])

  const disableSwiperSlide = useCallback(() => {
    console.log('disable swiper')
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.disable()
    }
  }, [])

  const homeOutletContext: HomeOutletContext = {
    toPrevSlide,
    toNextSlide,
    enableSwiperSlide,
    disableSwiperSlide
  }

  const handleFooterTabChange = (footerTab: FooterTab) => {
    if (footerTab.type === 'main') {
      enableSwiperSlide()
    } else {
      disableSwiperSlide()
    }
  }

  const handleRefresh = (footerTab: FooterTab) => {
    emit('refresh', footerTab)
  }

  useEffect(() => {
    const swiper = swiperRef.current?.swiper
    if (!swiper) return

    swiper.on('slideChange', (swiper) => {
      setActiveSlideIdx(swiper.activeIndex)
    })
  }, [swiperRef])

  return (
    <HomeStyle className={`${ isLightTheme ? 'is-light-theme' : '' }`}>
      <ReactSwiper
        ref={swiperRef}
        containerClass={`home-swiper__container`}
        wrapperClass="home-swiper__wrapper"
        { ...params }
      >
        <div className="home-swiper__slide is-sidebar">
          <HomeSidebar />
        </div>
        <div className={`home-swiper__slide ${ (activeSlideIdx === 0 || popupVisible ) ? 'is-mask' : '' }`}>
          <PopupProvider 
            popupVisible={popupVisible} 
            popupHeight={popupHeight} 
            openPopup={openPopup} 
            closePopup={closePopup}
          >
            <Outlet context={homeOutletContext} />
            <FooterTabs onTabChange={handleFooterTabChange} onRefresh={handleRefresh} />
          </PopupProvider>
        </div>
        <div className="home-swiper__slide">
          <HomePersonal goBack={toPrevSlide} />
        </div>
      </ReactSwiper>

      <CommentPopup ref={commentPopupRef} popupVisible={popupVisible} onClose={closePopup} />
    </HomeStyle>
  )
}