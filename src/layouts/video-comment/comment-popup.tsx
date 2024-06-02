import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { CommentPopupStyle } from './comment-popup.style'
import { PopupRefExpose, PupupRefAntions } from '../../views/home/hooks/usePopup'
import { RecommendVideoInfo } from 'src/layouts/recommend-video/hooks/useRecommendList'
import { VideoComment, queryVideoComments } from './services/video-comment'
import { ArrowsAltOutlined, CloseOutlined } from '@ant-design/icons'
import CommentItem from './comment-item'
import CommentBar from './comment-bar'
import { sampleSize } from 'src/utils'
import DyLoading from 'src/components/dy-loading/dy-loading'

export interface CommentPopupProps {
  className?: string
  popupVisible: boolean
  onClose: () => void
}

const CommentPopup = forwardRef<PopupRefExpose, CommentPopupProps>((props, ref) => {
  const [ videoInfo, setVideoInfo ] = useState({} as RecommendVideoInfo)
  const [ commentList, setCommentList ] = useState<VideoComment[]>([])
  const [ actions, setActions  ] = useState<PupupRefAntions>()
  const [ isFullScreen, setIsFullScreen ] = useState(false) 
  const [ loading, setLoading ] = useState(false)

  useImperativeHandle(ref, () => ({
    init(context, actions) {
      const videoInfo = context as unknown as  RecommendVideoInfo

      setVideoInfo(videoInfo)
      setActions(actions)
    }
  }))

  useEffect(() => {
    if (!videoInfo.aweme_id) return

    function queryCommentList() {
      setLoading(true)
      return queryVideoComments({
        id: videoInfo.aweme_id
      }).then(({ data }) => {
        setCommentList(data)
      }).finally(() => {
        setLoading(false)
      })
    }

    queryCommentList()
  }, [videoInfo])


  function handleFullScreenClick() {
    if (isFullScreen) {
      setIsFullScreen(false)
      actions?.setPopupHeight(628)
    } else {
      setIsFullScreen(true)
      actions?.setPopupHeight(document.documentElement.clientHeight)
    }
  }

  function getChildrenComments() {
    return sampleSize(commentList, 4)
  }

  return (
    <CommentPopupStyle className={`${props.className || ''} ${props.popupVisible ? 'is-popup' : ''} ${isFullScreen ? 'is-fullscreen' : ''}`}>
      { loading ? <DyLoading className="comment-popup__loading"></DyLoading> : <></> }
      <div className='comment-popup__header'>
        <span className='comment-popup__header-title'>{ commentList.length }条评论</span>
        <div className='comment-popup__ops'>
          <div className='comment-popup__icon' onClick={handleFullScreenClick}>
            <ArrowsAltOutlined />
          </div>
          <div className='comment-popup__icon' onClick={props.onClose}>
            <CloseOutlined />
          </div>
        </div>
      </div>
      <div className='comment-popup__body'>
        {
          commentList.map(videoComment => <CommentItem videoComment={videoComment} key={videoComment.comment_id} getChildrenComments={getChildrenComments} />)
        }
      </div>
      <div className='comment-popup__footer'>
        <CommentBar />
      </div>
    </CommentPopupStyle>
  )
})


export default CommentPopup