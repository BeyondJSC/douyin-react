import { CSSProperties, useEffect, useState } from "react"
import { ShoppingGood } from "src/views/home/home-shopping/services/home-shopping"

function paddingHeight(data: ShoppingGood) {
  let basePaddingHeight = 24

  if (data.name) {
    basePaddingHeight += Math.ceil(data.name.length / 11) * 16 + 12
  }

  if (data.price) {
    basePaddingHeight += 38
  }

  if (data.discount) {
    basePaddingHeight += 20
  }

  if (data.isLowPrice) {
    basePaddingHeight += 18
  }

  return basePaddingHeight
}

export default function useItemsStyle(columns: number, dyWaterfallItemWidth: number, gap: number, dataList: ShoppingGood[]) {
  const [ itemsStyle, setItemsStyle ] = useState<CSSProperties[]>([]) 
  const [ itemMaxHeight, setItemMaxHeight ] = useState<number>(0)
  const [ isLayouting, setIsLayouting ] = useState(false)

  // TODO 加载更多时，重新计算布局存在问题
  useEffect(() => {
    if (dataList.length === 0 || dyWaterfallItemWidth === 0) return
    const colsHeight = new Array(columns).fill(0)
    console.log('开始计算布局')

    setIsLayouting(true)

    for(let i = 0; i < dataList.length; i++) {
      const originSize = dataList[i].originSize!
      const renderSize = {
        width: dyWaterfallItemWidth,
        height: originSize.height * (dyWaterfallItemWidth / originSize.width) + paddingHeight(dataList[i])
      }

      if (i < columns) { // 第一行
        colsHeight[i] = renderSize.height || 0

        itemsStyle[i] = {
          position: 'absolute',
          width: `${dyWaterfallItemWidth}px`,
          top: '0px',
          left: `${i * (dyWaterfallItemWidth + gap)}px`
        }

      } else {
        const minHeight = Math.min(...colsHeight)
        const minIndex = colsHeight.indexOf(minHeight)

        itemsStyle[i] = {
          position: 'absolute',
          width: `${dyWaterfallItemWidth}px`,
          top: minHeight + 'px',
          left: itemsStyle[minIndex].left
        }

        colsHeight[minIndex] += renderSize.height || 0
      }
    }

    setItemMaxHeight(Math.max(...colsHeight))

    setItemsStyle(prevItemsStyle => [...prevItemsStyle])

    setIsLayouting(false)

    console.log('布局计算完成')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, dyWaterfallItemWidth, gap, dataList])

  return {
    itemsStyle,
    itemMaxHeight,
    isLayouting
  }
}