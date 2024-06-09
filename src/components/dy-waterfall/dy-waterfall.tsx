import { CSSProperties, useEffect, useMemo, useRef, useState } from "react"
import { DyWaterfallStyle } from "./dy-waterfall.style"
import useItemsStyle from "./hooks/useItemsStyle"
import { ShoppingGood } from "src/views/home/home-shopping/services/home-shopping"

export interface DyWaterfallProps { 
  className?: string
  columns?: number
  gap?: number
  dataList: ShoppingGood[]
  renderItem: (item: ShoppingGood, index: number) => React.ReactNode
}

export default function DyWaterfall(props: DyWaterfallProps) {
  const { columns = 2, gap = 8 } = props
  const [ wapperClientWidth, setWapperClientWidth ] = useState(0)
  const wapperRef = useRef<HTMLDivElement>(null)

  const dyWaterfallItemWidth = useMemo(() => {
    if (wapperClientWidth === 0) return 0

    return (wapperClientWidth - gap * (columns - 1)) / columns
  }, [columns, wapperClientWidth, gap])

  const { itemsStyle, itemMaxHeight, isLayouting } = useItemsStyle(columns, dyWaterfallItemWidth, gap, props.dataList)

  const dyWaterfallStyle:CSSProperties = {
    visibility: itemsStyle.length > 0 && !isLayouting ? 'visible' : 'hidden',
    height: itemMaxHeight + 'px'
  }

  useEffect(() => {
    if (wapperRef.current) {
      setWapperClientWidth(wapperRef.current.clientWidth)
    }
  }, [])

  return (
    <DyWaterfallStyle className={props.className} ref={wapperRef} style={dyWaterfallStyle}>
      {
        props.dataList.map((item, index) => {
          const itemStyle = itemsStyle[index] || {
            width: `${dyWaterfallItemWidth}px`
          }

          return (
            <div 
              className="dy-waterfall__item" 
              style={itemStyle}
              key={index}
            >
              { props.renderItem(item, index) }
            </div>
          )
        })
      }
    </DyWaterfallStyle>
  )
}