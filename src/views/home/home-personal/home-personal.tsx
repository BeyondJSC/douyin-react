import { useVideoStore } from "src/store/useVideoStore"
import { HomePersonalStyle } from "./home-personal.style"
import { copyStr, formatNumber, getFullImgaeUrl } from "src/utils"
import { CaretDownOutlined, CopyOutlined, EllipsisOutlined, HeartOutlined, LeftOutlined, SearchOutlined } from "@ant-design/icons"
import DyAvatar from "src/components/dy-avatar/dy-avatar"
import { useContext, useEffect, useState } from "react"
import { DyNotificationContext } from "src/components/dy-notification/useNotification"
import { queryUserVideoList } from "./services/personal"
import { VideoInfo } from "../home-main/main-recommend/services/recommend"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import DyLoading from "src/components/dy-loading/dy-loading"
import { useNavigate } from "react-router-dom"

export interface HomePersonalProps {
  goBack: () => void
}

export default function HomePersonal(props: HomePersonalProps) {
  const { videoInfo, setPersonalVideoList } = useVideoStore()
  const { notification } = useContext(DyNotificationContext)
  const [ userVideoList, setUserVideoList ] = useState<VideoInfo[]>([])
  const [ loading, setLoading ] = useState(false)
  const navigate = useNavigate()
  
  useEffect(() => {
    const authorSignId = videoInfo?.author?.unique_id || videoInfo?.author?.short_id

    if (!authorSignId) return

    setLoading(true)
    queryUserVideoList({
      id: authorSignId
    }).then(({ data }) => {
      setUserVideoList(data)
    }).finally(() => {
      setLoading(false)
    })
  }, [videoInfo])

  if (!videoInfo) return <></>

  const headerCoverSrc = getFullImgaeUrl(videoInfo.author?.cover_url[0]?.url_list[0] || '')
  const authorSignId = videoInfo.author?.unique_id || videoInfo.author?.short_id
  const authorSignature = videoInfo.author?.signature

  function handleCopy() {
    if (!authorSignId) return

    copyStr(authorSignId)

    notification('复制成功')
  }

  function renderPersonalInfo() {
    const userAge = videoInfo?.author?.user_age
    const ipLocation = videoInfo?.author?.ip_location
    const provice = videoInfo?.author?.province
    const city = videoInfo?.author?.city

    return (
      <div className="home-personal__info">
        {
          userAge !== -1 ? (
            <div className="home-personal__info-item">
              <span className="home-personal__info-text">{ userAge }岁</span>
            </div>
          ) : <></>
        }
        {
          ipLocation ? (
            <div className="home-personal__info-item">
              <span className="home-personal__info-text">{ ipLocation }</span>
            </div>
          ) : <></>
        }
        {
          provice || city ? (
            <div className="home-personal__info-item">
              { provice ? <span className="home-personal__info-text">{ ipLocation }</span> : <></> }
              { provice && city ? <span className="home-personal__info-text">·{ city }</span> : <></> }
            </div>
          ) : <></>
        }
      </div>
    )
  }

  function renderUserVideo(userVideo: VideoInfo, index: number) {
    const posterImgSrc = getFullImgaeUrl(userVideo.video.cover.url_list[0])
    
    function handleClick() {
      setPersonalVideoList(userVideoList, index)

      navigate('/blank/personal-video')
    }

    return (
      <div className="home-personal__video-item" key={userVideo.aweme_id} onClick={handleClick}>
        <LazyLoadImage className="home-personal__video-img" src={posterImgSrc} alt="poster" />
        <div className="home-personal__video-info">
          <HeartOutlined />
          <span className="home-personal__video-num">{ formatNumber(userVideo.statistics.digg_count) }</span>
        </div>
      </div>
    )
  }

  return (
    <HomePersonalStyle>
      <div className="home-personal__header">
        <div className="home-personal__header-ops">
          <LeftOutlined className="home-personal__header-icon" onClick={props.goBack}/>
          <div className="home-personal__header-btns">
            <SearchOutlined className="home-personal__header-icon" />
            <EllipsisOutlined className="home-personal__header-icon" />
          </div>
        </div>
        <img className="home-personal__header-bg" src={headerCoverSrc} alt="cover" />
        <div className="home-personal__header-avatar">
          <DyAvatar size={'medium'} noFollow={true} src={videoInfo.author?.avatar_168x168.url_list[0]} />
        </div>
        <div className="home-personal__header-info">
          <span className="home-personal__header-name">{videoInfo.author?.nickname}</span>
          <div className="home-personal__header-sign">抖音号：{ authorSignId }<CopyOutlined className="home-personal__icon" onClick={handleCopy} /></div>
        </div>
      </div>
      <div className="home-personal__body">
        { loading ? <DyLoading className="home-personal__loading" /> : <></> }
        <div className="home-personal__panel">
          <div className="home-personal__statistics">
            <div className="home-personal__statistics-item">
              <span className="home-personal__statistics-num">{formatNumber(videoInfo.author!.total_favorited)}</span>
              <span className="home-personal__statistics-name">获赞</span>
            </div>
            <div className="home-personal__statistics-item">
              <span className="home-personal__statistics-num">{formatNumber(videoInfo.author!.following_count)}</span>
              <span className="home-personal__statistics-name">关注</span>
            </div>
            <div className="home-personal__statistics-item">
              <span className="home-personal__statistics-num">{formatNumber(videoInfo.author!.mplatform_followers_count)}</span>
              <span className="home-personal__statistics-name">粉丝</span>
            </div>
          </div>
          {
            authorSignature 
              ? <div className="home-personal__signature" dangerouslySetInnerHTML={{ __html: authorSignature }}></div> 
              : <></>
          }
          { renderPersonalInfo() }
          <div className='home-personal__total'>
            <span className="home-personal__total-num">作品 { videoInfo.author!.aweme_count }</span>
            <CaretDownOutlined />
          </div>
        </div>
        <div className="home-personal__videos">
          {
            userVideoList.map((userVideo, idx) => renderUserVideo(userVideo, idx))
          }
        </div>
      </div>
    </HomePersonalStyle>
  )
}