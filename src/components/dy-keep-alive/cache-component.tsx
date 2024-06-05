import { Fragment, PropsWithChildren, RefObject, memo, useLayoutEffect, useState } from "react"
import { createPortal } from "react-dom"
import { CacheComponentContext } from "./keep-alive-provider"

export interface CacheComponentProps extends PropsWithChildren {
  mountedWapper: RefObject<HTMLDivElement>
  isActivated: boolean
  name: string
}

export function CacheComponentProvider(props: PropsWithChildren & {  isActivated: boolean }) {
  return (
    <CacheComponentContext.Provider value={{ isActivated: props.isActivated }}>
      { props.children }
    </CacheComponentContext.Provider>
  )
}

const CacheComponent = memo(function (props: CacheComponentProps) {
  const [ cacheWapper ] = useState<HTMLDivElement>(() => document.createElement('div'))
  
  useLayoutEffect(() => {
    const mountedWapper = props.mountedWapper.current

    if (!mountedWapper) return

    if (props.isActivated) {
      mountedWapper.appendChild(cacheWapper)
    } else {
      // 移除缓存组件
      if (cacheWapper.parentElement) {
        cacheWapper.parentElement.removeChild(cacheWapper)
      }
    }
  }, [cacheWapper, props.isActivated, props.mountedWapper])

  return <Fragment>
    { createPortal(<CacheComponentProvider isActivated={props.isActivated}>{props.children}</CacheComponentProvider>, cacheWapper, props.name) }
  </Fragment>
})

export default CacheComponent