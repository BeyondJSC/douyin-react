import React, { useState } from "react"
import { DyLikeStyle } from "./dy-like.style"
import { HeartFilled } from "@ant-design/icons"
import { formatNumber } from "src/utils"

export interface DyLikeProps {
  className?: string
  diggCount: number
}

export default function DyLike(props: DyLikeProps) {
  const [ isLike, setIsLike ] = useState(false)
  const [ isAnimating, setIsAnimating ] = useState(false)

  const likeCount = formatNumber(props.diggCount)

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation()

    if (isLike) {
      setIsLike(false)
      return
    }
    // 动画效果
    setIsAnimating(true)
    setTimeout(() => {
      setIsAnimating(false)
      setIsLike(true)
    }, 400)
  }

  return (
    <DyLikeStyle className={props.className} onClick={e => handleClick(e)}>
      <div className={`dy-like__icon-wrapper ${isAnimating ? 'is-animating' : ''}`}>
        <HeartFilled className={`dy-like__icon ${isLike ? 'is-active' : ''}`} />
        <HeartFilled className="dy-like__icon is-shadow" />
      </div>
      <span className="dy-like__text">{ likeCount }</span>
    </DyLikeStyle>
  )
}