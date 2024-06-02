import React, { CSSProperties, useEffect, useRef, useState } from "react"
import { formatTime } from "src/utils"

export interface ProgressBarEvents {
  touchStart?: (e: React.TouchEvent) => void
  touchMove?: (e: React.TouchEvent) => void
  touchEnd?: (e: React.TouchEvent) => void
  startPlaying?: () => void
  pausePlaying?: () => void
}

export function useVideoProgressBar(isPlaying: boolean, videoRef: React.RefObject<HTMLVideoElement>, events?: ProgressBarEvents) {
  const [ duration, setDuration ] = useState(0)
  const [ currentTime, setCurrentTime ] = useState(0)
  const [ barSetpWidth, setBarSetpWidth ] = useState(0)
  const [ isMoving, setIsMoving ] = useState(false)
  const touchStartState = useRef({ x: 0, time: 0 })
  const progressBarRef = useRef<HTMLDivElement>(null)

  const progressLineStyle: CSSProperties = {
    width: `${barSetpWidth * (currentTime - 1) }px`
  }

  useEffect(() => {
    const videoDom = videoRef.current

    if (!videoDom) return

    function handleLoadedmetadata() {
      if (!videoDom) return

      setDuration(Math.ceil(videoDom.duration))

      const progressBarDom = progressBarRef.current

      if (progressBarDom) {
        const { width } = progressBarDom.getBoundingClientRect()

        setBarSetpWidth(width / Math.ceil(videoDom.duration))
      }

      videoDom.addEventListener('timeupdate', handleTimeupdate)
    }

    function handleTimeupdate() {
      if (!videoDom) return

      setCurrentTime(Math.ceil(videoDom.currentTime))
    }

    videoDom.addEventListener('loadedmetadata', handleLoadedmetadata)
    
    return () => {
      videoDom.removeEventListener('loadedmetadata', handleLoadedmetadata)
      videoDom.removeEventListener('timeupdate', handleTimeupdate)
    }
  }, [videoRef])

  function renderProgressTime() {
    if (!isMoving) return <></>

    return <div className="dy-video__progress-time">
      <span className="dy-video__time-current">{formatTime(currentTime)}</span>
      <span className="dy-video__time-total"> / {formatTime(duration)}</span>
    </div>
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    event.stopPropagation()

    events?.touchStart && events.touchStart(event)

    const { pageX } = event.touches[0]

    touchStartState.current = { x: pageX, time: currentTime }
  }

  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    event.stopPropagation()

    if (!videoRef.current) return

    const { pageX } = event.touches[0]

    events?.pausePlaying && events.pausePlaying()

    setIsMoving(true)

    const { x, time } = touchStartState.current

    const offset = pageX - x

    const newTime = time + Math.ceil(offset / barSetpWidth)

    setCurrentTime(newTime)

    events?.touchMove && events.touchMove(event)
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    event.stopPropagation()

    setIsMoving(false)

    if (videoRef.current) {
      videoRef.current.currentTime = currentTime

      events?.startPlaying && events.startPlaying()
    }

    events?.touchEnd && events.touchEnd(event)
  }


  function renderProgressBar() {
    return (
      <>
        { renderProgressTime() }
        <div 
          className={`dy-video__progress-main ${ !isPlaying ? 'is-pause' : ''} ${ isMoving ? 'is-moving' : '' }`} 
          onTouchStart={e => handleTouchStart(e)}
          onTouchMove={e => handleTouchMove(e)}
          onTouchEnd={e => handleTouchEnd(e)}
        >
          <div className="dy-video__progress-bar" ref={progressBarRef}></div>
          <div className="dy-video__progress-line" style={progressLineStyle}></div>
          <span className="dy-video__progress-point"></span>
        </div>
      </>
    )
  }
  
  return {
    isMoving,
    renderProgressBar
  }
}