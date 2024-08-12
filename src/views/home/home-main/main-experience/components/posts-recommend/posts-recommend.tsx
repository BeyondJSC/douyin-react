import DyWaterfall from "src/components/dy-waterfall/dy-waterfall"
import { PostsRecommendStyle } from "./posts-recommend.style"
import { useCallback, useEffect, useRef, useState } from "react"
import { PostRecommend, queryPostsRecommend } from "../../services/main-experience"
import { getFullImgaeUrl } from "src/utils"
import BetterScroll from '@better-scroll/core'
import BetterScrollPullup from '@better-scroll/pull-up'
import { LazyLoadImage } from "react-lazy-load-image-component"

BetterScroll.use(BetterScrollPullup)

export default function ShoppingGoods() {
  const [ postRecommend, setPostRecommend ] = useState<PostRecommend[]>([])
  const [ pageNo, setPageNo ] = useState(1)
  const pageSize = 10
  const postsRecommendRef = useRef<HTMLDivElement>(null)
  const betterScroll = useRef<BetterScroll>()

  const querypostRecommend = useCallback(function() {
    return queryPostsRecommend({
      pageNo,
      pageSize
    }).then(({ list }) => {

      if (list.length === 0) {
        // 没有更多数据了
        betterScroll.current?.finishPullUp()
        return
      }

      setPostRecommend(prevPostRecommend => [...prevPostRecommend, ...list])
    })
  }, [pageNo])

  useEffect(() => {
    querypostRecommend()
  }, [querypostRecommend])

  useEffect(() => {
    if (!postsRecommendRef.current || postRecommend.length === 0) return

    betterScroll.current = new BetterScroll(postsRecommendRef.current, {
      click: true,
      pullUpLoad: {
        threshold: 20
      }
    })
  }, [pageNo, postRecommend])

  useEffect(() => {
    if (!postsRecommendRef.current || postRecommend.length === 0) return
    
    function handlePullingUp() {
      console.log('加载第', pageNo + 1, '页')
      setPageNo(pageNo + 1)
    }

    betterScroll.current?.on('pullingUp', handlePullingUp)

    return () => {
      betterScroll.current?.off('pullingUp', handlePullingUp)
    }
  }, [pageNo, postRecommend])

  function renderItem(item: unknown, index: number) {
    const postRecommend = item as PostRecommend

    const posterSrc = getFullImgaeUrl('/' + postRecommend.note_card?.cover?.url_default)

    return (
      <div className="post-recommend__item" key={index}>
        <LazyLoadImage className="post-recommend__item-img" src={posterSrc} alt={postRecommend.note_card?.display_title} />
        <div className="post-recommend__info">
          <div className="post-recommend__title">{postRecommend.note_card?.display_title}</div>
          <div className="post-recommend__row">
            <div className="post-recommend__author">{postRecommend.note_card?.user?.nickname}</div>
            <div className="post-recommend__like">{postRecommend.note_card?.interact_info?.like_count}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <PostsRecommendStyle ref={postsRecommendRef}>
      {
        postRecommend.length > 0 ? <DyWaterfall dataList={postRecommend} renderItem={renderItem}></DyWaterfall> : <></>
      }
    </PostsRecommendStyle>
  )
}