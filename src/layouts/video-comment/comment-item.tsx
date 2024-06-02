import { formatNumber, normalizeTime } from "src/utils"
import { CommentItemStyle } from "./comment-item.style"
import { VideoComment } from "./services/video-comment"
import Icon, { DownOutlined, HeartFilled, HeartOutlined } from "@ant-design/icons"
import { useState } from "react"

export interface CommentItemProps {
  videoComment: VideoComment
  getChildrenComments: (videoComment: VideoComment) => VideoComment[]
  noChildComment?: boolean
}

export default function CommentItem(props: CommentItemProps) {
  const videoComment = props.videoComment
  const [ showReplies, setShowReplies ] = useState(false)
  const [ commentReplies, setCommentReplies ] = useState<VideoComment[]>([])
  const [ isLike, setIsLike ] = useState(false)
  const [ isNoLike, setIsNoLike ] = useState(videoComment.user_buried)

  function handleMoreClick() {
    if (!showReplies) {
      setShowReplies(true)
    } 

    // 加载更多
    const cildrenComments = props.getChildrenComments(videoComment)

    if (cildrenComments) {
      setCommentReplies([...commentReplies, ...cildrenComments])
    }
  }

  function renderCommentReplies() {
    if (Number(videoComment.sub_comment_count) === 0 || props.noChildComment) return <></>

    return (
      <div className="comment-item__replies">
        {
          commentReplies.map(commentReply => (
            <CommentItem key={commentReply.comment_id} videoComment={commentReply} noChildComment={true} getChildrenComments={props.getChildrenComments} />
          ))
        }
        <div className="comment-item__replies-more" onClick={handleMoreClick}>
          <div className="comment-item__replies-split"></div>
          <span className="comment-item__replies-text">{ `展开${ showReplies ? '更多' : videoComment.sub_comment_count }条回复` }</span>
          <DownOutlined className="comment-item__replies-icon" />
        </div>
      </div>
    )
  }

  return (
    <CommentItemStyle>
      <img className="comment-item__avatar" src={videoComment.avatar} alt="avatar" />
      <div className="comment-item__content">
        <span className="comment-item__username">{ videoComment.nickname }</span>
        <div className={`comment-item__text ${ isNoLike ? 'is-no-like' : ''}`}>{ isNoLike ? '该评论已折叠' : videoComment.content }</div>
        <div className="comment-item__info">
          <span className="comment-item__time">{ normalizeTime(videoComment.create_time) }{ videoComment.ip_location ? ` · ${videoComment.ip_location}` : '' }</span>
          <span className="comment-item__reply">回复</span>
          <div className="comment-item__ops">
            <div className={`comment-item__like ${isLike ? 'is-like' : ''}`} onClick={() => setIsLike(isLike)}>
              { isLike ? <HeartFilled className="comment-item__icon"/> : <HeartOutlined className="comment-item__icon" /> }
              <span className="comment-item__count">{ formatNumber(videoComment.digg_count) }</span>
            </div>
            <div className="comment-item__dislike" onClick={() => setIsNoLike(!isNoLike)}>
              <Icon className="comment-item__icon" component={() => (
                !isNoLike ? (<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17158">
                  <path d="M899.84 182.613333a277.589333 277.589333 0 0 0-197.12-81.493333c-71.68 0-139.093333 26.88-190.72 75.52a278.016 278.016 0 0 0-190.72-75.52c-74.666667 0-144.64 29.013333-197.12 81.493333a278.869333 278.869333 0 0 0 0 394.24l316.586667 316.586667a100.821333 100.821333 0 0 0 142.506666 0l316.586667-316.586667a278.869333 278.869333 0 0 0 0-394.24z m-66.986667 340.48l-309.76 309.76c-5.973333 5.973333-15.786667 5.973333-21.76 0l-310.613333-310.613333C115.626667 448 109.226667 319.146667 183.466667 243.626667c36.693333-37.12 85.76-57.6 137.813333-57.6 51.626667 0 100.266667 20.053333 136.96 56.746666L399.36 368.213333l-16.64 33.706667 32.426667 11.093333 197.546666 67.413334L512 682.666667l145.066667-203.093334 12.8-17.92-22.613334-10.24-174.08-80.213333 59.733334-88.746667c8.106667-11.946667 17.066667-23.04 27.306666-32.853333 27.733333-27.733333 62.293333-50.346667 100.693334-58.453333 71.253333-14.933333 141.653333 8.533333 188.16 61.866666 65.28 74.666667 54.186667 199.68-16.213334 270.08z" fill="currentColor" p-id="17159">
                  </path>
                </svg>) :
                (<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3373">
                  <path d="M545.978182 114.967273zM656.290909 93.090909a254.138182 254.138182 0 0 0-26.763636 1.861818c-23.272727 40.261818-44.218182 79.36-56.552728 84.48a93.090909 93.090909 0 0 0-50.036363 48.872728 93.090909 93.090909 0 0 0 18.152727 77.032727l69.818182 93.090909a35.141818 35.141818 0 0 1-3.258182 46.545454L488.727273 562.036364A34.909091 34.909091 0 0 1 438.225455 512l97.745454-97.745455-51.665454-69.818181-1.396364-2.094546c-31.185455-49.105455-40.029091-95.418182-26.065455-137.774545C465.454545 162.909091 512 139.636364 512 131.723636A287.418182 287.418182 0 0 0 367.941818 93.090909 303.941818 303.941818 0 0 0 69.818182 401.454545C69.818182 651.636364 448.465455 930.909091 512 930.909091s442.181818-279.272727 442.181818-529.454546A302.545455 302.545455 0 0 0 656.290909 93.090909z" fill="currentColor" p-id="3374">
                  </path>
                </svg>)
              )}></Icon>
            </div>
          </div>
        </div>
        { renderCommentReplies() }
      </div>
    </CommentItemStyle>
  )
}