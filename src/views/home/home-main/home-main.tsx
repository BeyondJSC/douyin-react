import React, { CSSProperties, useContext, useEffect, useRef, useState } from "react"
import ReactSwiper, { SwiperRefNode } from 'react-id-swiper'
import HeaderNavs, { HeaderNavsExpose, NavTab } from "../../../layouts/header-navs/header-navs"
import { HomeMainSlideStyle, LiveTagStyle } from "./home-main.style"
import Swiper from "swiper"
import { useNavigate, useOutletContext } from "react-router-dom"
import { HomeOutletContext } from "../home"
import MainHot from "./main-hot/main-hot"
import MainLongVideo from "./main-long-video/main-long-video"
import MainFollow from "./main-follow/main-follow"
import MainExperience from "./main-experience/main-experience"
import MainRecommend from "./main-recommend/main-recommend"
import { PopupContext } from "../hooks/usePopup"
import { useUserStore } from "src/store/useUserStore"

function LiveTag() {
  return (
    <LiveTagStyle>
      <span className="live-tag__text">直播</span>
    </LiveTagStyle>
  )
}

export interface RenderMainComponentProps {
  navTab: NavTab
  enableTopSwipers: () => void
  disableTopSwipers: () => void
}

function RenderMainComponent(props: RenderMainComponentProps) {
  const mainComponents: Record<NavTab['type'], React.ReactElement> = {
    hot: <MainHot { ...props } />,
    'long-video': <MainLongVideo { ...props } />,
    follow: <MainFollow { ...props } />,
    experience: <MainExperience { ...props } />,
    recommend: <MainRecommend { ...props } />,
  }

  return mainComponents[props.navTab.type]
}

export default function HomeMain() {
  const swiperRef = useRef<SwiperRefNode>(null)
  const headerNavsRef = useRef<HeaderNavsExpose>(null)
  
  const [ navTabs ] = useState<NavTab[]>([
    {
      type: 'hot',
      name: '热点'
    },
    {
      type: 'long-video',
      name: '长视频'
    },
    {
      type: 'follow',
      name: '关注',
      slot: <LiveTag />
    },
    {
      type: 'experience',
      name: '经验'
    },
    {
      type: 'recommend',
      name: '推荐'
    },
  ])

  const [ moveProgress, setMoveProgress ] = useState(0)
  const { toPrevSlide, toNextSlide, enableSwiperSlide, disableSwiperSlide } = useOutletContext<HomeOutletContext>()
  const navigate = useNavigate()
  const { popupVisible, popupHeight, closePopup } = useContext(PopupContext)
  const { setIsLightTheme } = useUserStore()

  useEffect(() => {   
    setIsLightTheme(false)
  }, [setIsLightTheme])

  function disableTopSwipers() {
    disableSwiperSlide()

    swiperRef.current?.swiper?.disable()
  }

  function enableTopSwipers() {
    enableSwiperSlide()

    swiperRef.current?.swiper?.enable()
  }

  const params: Swiper['params'] = {
    initialSlide: 4,
    nested: true // 与父级swiper同方向，需要拦截触摸相关事件
  }

  const homeMainSlideStyle: CSSProperties = {
    height: popupVisible ? `calc(100vh - ${popupHeight}px)` : `calc(100vh - 56px)`
  }

  useEffect(() => {
    const swiper = swiperRef.current?.swiper
    if (!swiper) return

    swiper.on('sliderMove', (swiper) => {
      setMoveProgress(-swiper.touches.diff / swiper.width)
    })

    swiper.on('touchEnd', () => {
      setMoveProgress(0)
    })

    swiper.on('slideChange', (swiper) => {
      if (headerNavsRef.current) {
        headerNavsRef.current.setActiveTab(navTabs[swiper.activeIndex].type)
      }
    })
  }, [swiperRef, navTabs])

  function handleToSearch() {
    navigate('/search')
  }

  function handleTabChange(tab: NavTab) {
    const swiper = swiperRef.current?.swiper
    if (!swiper) return

    swiper.slideTo(navTabs.findIndex(navTab => navTab.type === tab.type))
  }

  function handleMaskClick() {
    if (popupVisible) {
      closePopup()
    } else {
      toNextSlide()
    }
  }


  return (
    <>
      <div className="home-swiper__slide--mask" onClick={handleMaskClick}></div>
      <HeaderNavs
        ref={headerNavsRef}
        navTabs={navTabs}
        moveProgress={moveProgress}
        toSidebar={toPrevSlide}
        toSearch={handleToSearch}
        onTabChange={handleTabChange}
      />

      <ReactSwiper
        ref={swiperRef}
        { ...params }
      >
        {
          navTabs.map(navTab => (
            <HomeMainSlideStyle style={homeMainSlideStyle} key={navTab.type}>
              <RenderMainComponent navTab={navTab} disableTopSwipers={disableTopSwipers} enableTopSwipers={enableTopSwipers} />
            </HomeMainSlideStyle>
          ))
        }
      </ReactSwiper>
    </>
  )
}