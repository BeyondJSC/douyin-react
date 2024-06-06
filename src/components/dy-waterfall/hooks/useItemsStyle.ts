import { CSSProperties, useEffect, useRef, useState } from "react"

export default function useItemsStyle(columns: number, dyWaterfallItemWidth: number, gap: number, dataList: unknown[]) {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const [ itemsStyle, setItemsStyle ] = useState<CSSProperties[]>([]) 
  const [ itemMaxHeight, setItemMaxHeight ] = useState<number>(0)
  const [ isLayouting, setIsLayouting ] = useState(false)

  // TODO 加载更多时，重新计算布局存在问题
  useEffect(() => {
    console.log('itemrefs.length', itemsRef.current.length)
    if (itemsRef.current.length === 0 || dyWaterfallItemWidth === 0) return
    const colsHeight = new Array(columns).fill(0)

    setIsLayouting(true)

    for(let i = 0; i < itemsRef.current.length; i++) {
      const itemRef = itemsRef.current[i]

      if (i < columns) { // 第一行
        colsHeight[i] = itemRef?.clientHeight || 0

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

        colsHeight[minIndex] += itemRef?.clientHeight || 0
      }
    }

    setItemMaxHeight(Math.max(...colsHeight))

    setItemsStyle(prevItemsStyle => [...prevItemsStyle])

    setIsLayouting(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, dyWaterfallItemWidth, gap, dataList])

  return {
    itemsRef,
    itemsStyle,
    itemMaxHeight,
    isLayouting
  }
}