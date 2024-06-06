import DyWaterfall from "src/components/dy-waterfall/dy-waterfall"
import { ShoppingGoodsStyle } from "./shopping-goods.style"
import { useCallback, useEffect, useRef, useState } from "react"
import { ShoppingGood, queryShoppingGoods } from "../../services/home-shopping"
import { getFullImgaeUrl } from "src/utils"
import BetterScroll from '@better-scroll/core'
import BetterScrollPullup from '@better-scroll/pull-up'

BetterScroll.use(BetterScrollPullup)

export default function ShoppingGoods() {
  const [ goodsList, setGoodsList ] = useState<ShoppingGood[]>([])
  const [ pageNo, setPageNo ] = useState(1)
  const pageSize = 10
  const shoppingGoodsRef = useRef<HTMLDivElement>(null)
  const betterScroll = useRef<BetterScroll>()

  const queryGoodsList = useCallback(function() {
    return queryShoppingGoods({
      pageNo,
      pageSize
    }).then(({ data }) => {
      const { list } = data

      if (list.length === 0) {
        // 没有更多数据了
        betterScroll.current?.finishPullUp()
        return
      }

      setGoodsList(prevGoodsList => [...prevGoodsList, ...list])
    })
  }, [pageNo])

  useEffect(() => {
    queryGoodsList()
  }, [queryGoodsList])

  useEffect(() => {
    if (!shoppingGoodsRef.current || goodsList.length === 0) return

    betterScroll.current = new BetterScroll(shoppingGoodsRef.current, {
      click: true,
      pullUpLoad: {
        threshold: 20
      }
    })
  }, [pageNo, goodsList])

  useEffect(() => {
    if (!shoppingGoodsRef.current || goodsList.length === 0) return
    
    function handlePullingUp() {
      console.log('加载第', pageNo + 1, '页')
      setPageNo(pageNo + 1)
    }

    betterScroll.current?.on('pullingUp', handlePullingUp)

    return () => {
      betterScroll.current?.off('pullingUp', handlePullingUp)
    }
  }, [pageNo, goodsList])

  function renderItem(item: unknown, index: number) {
    const shoppingGood = item as ShoppingGood

    const posterSrc = getFullImgaeUrl('/goods/' + shoppingGood.cover)

    return (
      <div className="shopping-goods__item" key={index}>
        <img className="shopping-goods__item-img" src={posterSrc} alt={shoppingGood.name} />
        <div className="shopping-goods__item-info">
          <div className="shopping-goods__item-name">{ shoppingGood.name }</div>
          { shoppingGood.discount ? <span className="shopping-goods__item-discount">{ shoppingGood.discount }</span> : <></> }
          <div className="shopping-goods__item-row">
            <div className="shopping-goods__item-price">
              <span className="shopping-goods__price-symbol">￥</span>
              <span className="shopping-goods__price-num">{ shoppingGood.price }</span>
            </div>
            <div className="shopping-goods__item-num">已售{ shoppingGood.sold }件</div>
          </div>
          { shoppingGood.isLowPrice ? <span className="shopping-goods__item-notice">近30天低价</span> : <></> }
        </div>
      </div>
    )
  }

  return (
    <ShoppingGoodsStyle ref={shoppingGoodsRef}>
      {
        goodsList.length > 0 ? <DyWaterfall dataList={goodsList} renderItem={renderItem}></DyWaterfall> : <></>
      }
    </ShoppingGoodsStyle>
  )
}