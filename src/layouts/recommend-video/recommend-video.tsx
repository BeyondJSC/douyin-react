import { getFullImgaeUrl } from "src/utils"
import { RecommendVideoInfo } from "./hooks/useRecommendList"
import { RecommendVideoStyle } from "./recommend-video.style"
import DyVideo from "src/components/dy-video/dy-video"
import React, { useContext } from "react"
import DyAvatar from "src/components/dy-avatar/dy-avatar"
import DyLike from "src/components/dy-like/dy-like"
import VideoComment from "src/layouts/video-comment/video-comment"
import { PopupContext } from "src/views/home/hooks/usePopup"
import DyStar from "src/components/dy-star/dy-star"
import ForwardShare from "src/layouts/forward-share/forward-share"

export interface RecommendVideoProps {
  videoInfo: RecommendVideoInfo
  openForwardPopup: (videoInfo: RecommendVideoInfo) => void
  onAvatarClick: (videoInfo: RecommendVideoInfo) => void
  enableTopSwipers?: () => void
  disableTopSwipers?: () => void
}

export default function RecommendVideo(props: RecommendVideoProps) {
  const videoInfo = props.videoInfo
  const musicInfo = props.videoInfo.music

  const { popupVisible, openPopup } = useContext(PopupContext)

  const videoPoster = getFullImgaeUrl(videoInfo.video.cover.url_list[0])

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation()

    props.onAvatarClick(videoInfo)
  }

  function renderVideoFooter() {
    return (
      <div className={`recommend-video__footer ${ popupVisible ? 'is-hidden' : '' }`}>
        <div className="recommend-video__nickname" onClick={(e) => handleClick(e)}>@{videoInfo.author?.nickname}</div>
        <div className="recommend-video__desc">{videoInfo.desc}</div>
      </div>
    )
  }

  function handleClickForward(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation()

    props.openForwardPopup(videoInfo)
  }

  function handleClickComment(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation()

    openPopup('COMMENT', videoInfo)
  }

  function handleClickAvatar(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation()

    props.onAvatarClick(videoInfo)
  }

  function renderSidebar() {
    return (
      <div className={`recommend-video__sidebar ${ popupVisible ? 'is-hidden' : '' }`}>
        <DyAvatar className="recommend-video__sidebar-item" src={videoInfo.author?.avatar_168x168.url_list[0]} onClick={handleClickAvatar} />
        <DyLike className="recommend-video__sidebar-item" diggCount={videoInfo.statistics.digg_count} />
        <VideoComment className="recommend-video__sidebar-item" commentCount={videoInfo.statistics.comment_count} onClick={handleClickComment} />
        <DyStar className="recommend-video__sidebar-item" starCount={videoInfo.statistics.collect_count} />
        <ForwardShare className="recommend-video__sidebar-item" forwardCount={videoInfo.statistics.share_count}  onClick={handleClickForward}/>
      </div>
    )
  }

  return (
    <RecommendVideoStyle 
      data-index={videoInfo.dataIndex}
    >
      <DyVideo 
        videoSrc={videoInfo.video.play_addr.url_list[0]}
        videoPoster={videoPoster}
        coverThumbUrl={ popupVisible ? '' : musicInfo?.cover_thumb.url_list[0]}
        footerSlot={renderVideoFooter}
        sidebarSlot={renderSidebar}
        videoMovingStart={props.disableTopSwipers}
        videoMovingEnd={props.enableTopSwipers}
      />
    </RecommendVideoStyle>
  )
}