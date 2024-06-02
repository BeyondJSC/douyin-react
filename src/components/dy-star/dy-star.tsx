import { StarFilled } from "@ant-design/icons"
import { DyStarStyle } from "./dy-star.style"
import { formatNumber } from "src/utils"
import { useState } from "react"

export interface DyStarProps {
  className?: string
  starCount: number
}

export default function DyStar(props: DyStarProps) {
  const [ isStar, setIsStar ] = useState(false)
  const [ isAnimating, setIsAnimating ] = useState(false)

  const starCount = formatNumber(props.starCount)

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation()

    if (isStar) {
      setIsStar(false)
      return
    }
    // 动画效果
    setIsAnimating(true)
    setTimeout(() => {
      setIsAnimating(false)
      setIsStar(true)
    }, 400)
  }

  return (
    <DyStarStyle className={props.className} onClick={e => handleClick(e)}>
      <div className={`dy-star__icon-wrapper ${isAnimating ? 'is-animating' : ''}`}>
        <StarFilled className={`dy-star__icon ${isStar ? 'is-active' : ''}`} />
        <StarFilled className="dy-star__icon is-shadow" />
      </div>
      <span className="dy-star__text">{ starCount }</span>
    </DyStarStyle>
  )
}