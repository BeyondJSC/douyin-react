import React, { useEffect, useRef, useState } from "react"
import { DyVideoStyle } from "./dy-video.style"
import Icon from '@ant-design/icons'
import { useVideoProgressBar } from "./hooks/useVideoProgressBar"
import DyLoading from "../dy-loading/dy-loading"
import { useEffectOnActivated } from "../dy-keep-alive/keep-alive-provider"

export interface DyVideoProps {
  videoPoster: string
  videoSrc: string
  className?: string
  coverThumbUrl?: string
  footerSlot?: () => React.ReactNode
  sidebarSlot?: () => React.ReactNode
  videoMovingStart?: () => void
  videoMovingEnd?: () => void
}

function PlayIcon() {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      xmlnsXlink="http://www.w3.org/1999/xlink" 
      aria-hidden="true" 
      role="img" 
      width="1em" height="1em" 
      viewBox="0 0 28 28">
      <path fill="currentColor" d="M10.138 3.382C8.304 2.31 6 3.632 6 5.756v16.489c0 2.123 2.304 3.445 4.138 2.374l14.697-8.59c1.552-.907 1.552-3.15 0-4.057z"></path>
    </svg>
  )
}

export default function DyVideo(props: DyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ isPlaying, setIsPlaying ] = useState(true)
  const [ isMuted, setIsMuted ] = useState(true)
  const [ loading, setLoading ] = useState(true)

  const { isMoving, renderProgressBar } = useVideoProgressBar(isPlaying, videoRef, {
    touchStart: () => props.videoMovingStart && props.videoMovingStart(),
    touchEnd: () => props.videoMovingEnd && props.videoMovingEnd(),
    startPlaying,
    pausePlaying
  })

  useEffect(() => {
    if (!videoRef.current) return

    const videoDom = videoRef.current

    function handlePlaying() {
      console.log('waiting... end')
      setLoading(false)
    }

    function handleWaiting() {
      console.log('waiting... start')
      if (isPlaying) {
        setLoading(true)
      }
    }

    videoDom.addEventListener('playing', handlePlaying)

    videoDom.addEventListener('waiting', handleWaiting)

    return () => {
      videoDom.removeEventListener('playing', handlePlaying)
      videoDom.removeEventListener('waiting', handleWaiting)
    }
  }, [isPlaying])

  useEffectOnActivated(isActivated => {
    if (isActivated && !isPlaying) {
      startPlaying()
    } else if (!isActivated && isPlaying) {
      pausePlaying()
    }
  }, [])

  function startPlaying() {
    if (videoRef.current) {
      console.log('开始播放')
      videoRef.current.play()

      setIsPlaying(true)
    }
  }

  function pausePlaying() {
    if (videoRef.current) {
      console.log('暂停播放')
      videoRef.current.pause()

      setIsPlaying(false)
    }
  }

  function handleClick() {
    if (isPlaying) {
      pausePlaying()
    } else {
      startPlaying()
    }
  }

  function handleMusicClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation()

    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false
      } else {
        videoRef.current.muted = true
      }
    }

    setIsMuted(!isMuted)
  }

  function renderMusicPlayer() {
    if (!props.coverThumbUrl) return <></>
  
    return (
      <div className="dy-video__music" onClick={e => handleMusicClick(e)}>
        <img className={`dy-video__img ${ (isMuted || !isPlaying) ? 'is-pause' : '' }`} src={props.coverThumbUrl} alt="cover-thumb" />
      </div>
    )
  }

  function renderFooterSlot() {
    if (!props.footerSlot || isMoving) return <></>

    return (
      <div className="dy-video__footer">
        { props.footerSlot() }
      </div>
    )
  }

  function renderSidebarSlot() {
    if (!props.sidebarSlot || isMoving) return <></>

    return (
      <div className="dy-video__sidebar">
        { props.sidebarSlot() }
      </div>
    )
  }

  return (
    <DyVideoStyle
      className={props.className}
      onClick={handleClick}
    >
      { loading ? <DyLoading className="dy-video__loading" /> : <></> }
      <video
        ref={videoRef}
        className="dy-video__main"
        src={props.videoSrc}
        poster={props.videoPoster}
        preload="auto"
        muted
        autoPlay
        loop
        x5-video-player-type="h5-page"
        x5-video-player-fullscreen="false"
        x5-playsinline="true"
        webkit-playsinline="true"
        playsInline={true}
      >
        <p> 您的浏览器不支持 video 标签 </p>
      </video>
      { renderMusicPlayer() }
      { renderFooterSlot() }
      { renderSidebarSlot() }
      { !isPlaying ? <Icon className="dy-video__play" component={PlayIcon}></Icon> : <></> }
      { renderProgressBar() }
    </DyVideoStyle>
  )
}