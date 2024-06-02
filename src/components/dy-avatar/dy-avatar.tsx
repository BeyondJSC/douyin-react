import { CheckOutlined, PlusOutlined } from "@ant-design/icons"
import { DyAvatarStyle } from "./dy-avatar.style"
import { useState } from "react"

export interface DyAvatarProps { 
  src?: string
  className?: string
  size?: 'small' | 'medium'
  noFollow?: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export default function DyAvatar(props: DyAvatarProps) {
  const [ isFollow, setIsFollow ] = useState(false)
  const [ isAnimating, setIsAnimating ] = useState(false)

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation()
    // 执行动画
    setIsAnimating(true)
    setTimeout(() => {
      setIsAnimating(false)
      setIsFollow(true)
    }, 400)
  }

  function renderFollowIcon() {
    if (isFollow || props.noFollow) return <></>

    return (
      <div className="dy-avatar__follow" onClick={(e) => handleClick(e)}>
        { !isFollow ? <PlusOutlined className={`dy-avatar__icon dy-avatar__icon-add ${isAnimating ? 'fade-out' : ''}`} /> : <></> }
        <CheckOutlined className={`dy-avatar__icon dy-avatar__icon-followed ${isAnimating ? 'fade-in' : ''}`} />
      </div>
    )
  }

  return (
    <DyAvatarStyle className={`${props.className || ''} ${props.size ? ('is-' + props.size) : ''}`} onClick={e => props.onClick && props.onClick(e)}>
      { props.src ? <img className="dy-avatar__img" src={props.src} alt="avatar" /> : <></> }
      { renderFollowIcon() }
    </DyAvatarStyle>
  )
}