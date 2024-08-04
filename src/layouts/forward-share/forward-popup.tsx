import React, { forwardRef, useContext, useImperativeHandle, useState } from 'react'
import { ForwardSharePopupMaskStyle, ForwardSharePopupStyle } from './forward-share.style'
import { usePromisifyVm } from 'src/hooks/usePromisifyVm'
import { RecommendVideoInfo } from 'src/layouts/recommend-video/hooks/useRecommendList'
import { CheckOutlined, CloseOutlined, RightOutlined } from '@ant-design/icons'
import { UserInfo, useUserStore } from 'src/store/useUserStore'
import { useNavigate } from 'react-router-dom'
import { useForwardShares } from './hooks/useForwardShares'
import { DyNotificationContext } from 'src/components/dy-notification/useNotification'
import DyButton from 'src/components/dy-button/dy-button'

export interface ForwardPopupExpose {
  openPopup: (videoInfo: RecommendVideoInfo) => Promise<void>
}

export interface ForwardPopupProps {
  
}

function CheckedIcon() {
  return (
    <div className='forward-popup__checked-icon'>
      <CheckOutlined />
    </div>
  )
}

const ForwardPopup = forwardRef<ForwardPopupExpose, ForwardPopupProps>((_, ref) => {
  const [ isVisible, setIsVisible ] = useState(false)
  const [ videoInfo, setVideoInfo ] = useState<RecommendVideoInfo | undefined>()
  const navigate = useNavigate()
  const { friends } = useUserStore()
  const [ sureShareFirends, setSureShareFirends ] = useState<UserInfo[]>([])
  const sureShareFirendsSet = new Set<UserInfo>(sureShareFirends)
  const posterSrc = new URL(`../../assets/imgs/poster/1.jpg`, import.meta.url).href
  const { forwardShares } = useForwardShares()
  const { notification } = useContext(DyNotificationContext)

  const { getInstacne, onResolve, onRejct } = usePromisifyVm<void, RecommendVideoInfo>({
    after(config) {
      setVideoInfo(config)
      setIsVisible(true)
    }
  })

  useImperativeHandle(ref, () => ({
    openPopup: getInstacne
  }))

  function handleClose(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    event.stopPropagation()
    
    setSureShareFirends([])
    setIsVisible(false)
    onRejct()
  }

  function handleAvatarClick(friend: UserInfo) {
    const isChecked = sureShareFirendsSet.has(friend)
    if (isChecked) {
      sureShareFirendsSet.delete(friend)
      setSureShareFirends(Array.from(sureShareFirendsSet))
    } else {
      sureShareFirendsSet.add(friend)
      setSureShareFirends(Array.from(sureShareFirendsSet))
    }
  }

  function renderFirend(friend: UserInfo) {
    const isChecked = sureShareFirendsSet.has(friend)
    const avatar = new URL(`../../assets/imgs/avatar/${friend.avatar}`, import.meta.url).href

    return (
      <div className='forward-popup__friend' key={friend.id} onClick={() => handleAvatarClick(friend)}>
        <img className={`forward-popup__friend-avatar ${isChecked ? 'is-checked' : ''}`} src={avatar} alt={friend.name}/>
        <span className='forward-popup__friend-name'>{friend.name}</span>
        { isChecked ? <CheckedIcon /> : <></> }
      </div>
    )
  }

  function handleMoreClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    handleClose(event)

    setTimeout(() => {
      navigate('/blank/share-to-friend')
    }, 200)
  }

  function handleShareClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    event.stopPropagation()

    console.log(videoInfo)

    notification('暂未实现')

    onResolve()
  }

  function renderPopupMessage() {
    if (sureShareFirends.length === 0) return <></>

    return <div className='forward-popup__message'>
      <div className='forward-popup__message-comment'>
        <textarea placeholder='有什么想和好友说的...'></textarea>
        <img className='forward-popup__message-poster' src={posterSrc} alt="poster" />
      </div>
      <div className='forward-popup__message-btns'>
        { sureShareFirends.length > 1 ? <DyButton onClick={e => handleShareClick(e)}>建群并发送</DyButton> : <></> }
        <DyButton type="primary" onClick={e => handleShareClick(e)}>{ sureShareFirends.length > 1 ? '分别发送' : '发送' }</DyButton>
      </div>
    </div>
  }

  return (
    <>
      <ForwardSharePopupMaskStyle className={isVisible ? 'is-popup' : ''} onClick={e => handleClose(e)}/>
      <ForwardSharePopupStyle className={isVisible ? 'is-popup' : ''}>
        <div className='forward-popup__header'>
          <span className='forward-popup__header-title'>分享给朋友</span>
          <CloseOutlined className='forward-popup__header-close' onClick={e => handleClose(e)}/>
        </div>
        <div className='forward-popup__body'>
          <div className='forward-popup__firends'>
            {
              friends.all.map(friend => renderFirend(friend))
            }
            <div className='forward-popup__friend' key="more" onClick={e => handleMoreClick(e)}>
              <div className='forward-popup__friend-more'>
                <RightOutlined />
              </div>
              <span className='forward-popup__friend-name'>更多朋友</span>
            </div>
          </div>
          <div className='forward-popup__shares'>
            {
              forwardShares.map(share => (
                <div className='forward-popup__share' key={share.type} onClick={e => handleShareClick(e)}>
                  <div className='forward-popup__share-context'>
                    { share.contentSlot ? share.contentSlot() : share.icon }
                  </div>
                  <span className='forward-popup__share-text'>{ share.name }</span>
                </div>
              ))
            }
          </div>
          { renderPopupMessage() }
        </div>
      </ForwardSharePopupStyle>
    </>
  )
})

export default ForwardPopup