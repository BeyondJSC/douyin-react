import { MessageFilled } from "@ant-design/icons"
import { VideoCommentStyle } from "./video-comment.style"
import { formatNumber } from "src/utils"

export interface VideoCommentProps {
  commentCount: number
  className?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export default function VideoComment(props: VideoCommentProps) {
  const commentCount = formatNumber(props.commentCount)

  return (
    <VideoCommentStyle className={props.className} onClick={e => props.onClick && props.onClick(e)}>
      <MessageFilled className="video-comment__icon" />
      <span className="video-comment__text">{ commentCount }</span>
    </VideoCommentStyle>
  )
}