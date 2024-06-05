import { Fragment, PropsWithChildren, useLayoutEffect, useState } from "react"
import CacheComponent from "./cache-component"

export interface DyKeepAliveProps extends PropsWithChildren {
  activeName: string
  wrapperRef?: React.RefObject<HTMLDivElement>
}

export interface CacheNode {
  name: string
  component: React.ReactNode
}

const DyKeepAlive = function(props: DyKeepAliveProps) {
  const [ cacheNodes, setCacheNodes ] = useState<CacheNode[]>([])
  const wrapperRef = props.wrapperRef

  useLayoutEffect(() => {
    const children = props.children
    
    if (!children || !props.activeName) {
      return
    }

    const cacheNode = cacheNodes.find(node => node.name === props.activeName)

    if (cacheNode) {
      return
    }

    setCacheNodes(prevCacheNodes => {
      return [...prevCacheNodes, {
        name: props.activeName,
        component: children
      }]
    })

  }, [props.activeName, props.children, cacheNodes])

  if (!wrapperRef) {
    return <></>
  }

  return (
    <Fragment>
      {cacheNodes.map(node => {
        return <CacheComponent 
          key={node.name}
          name={node.name}
          mountedWapper={wrapperRef}
          isActivated={node.name === props.activeName}
        >
          { node.component }
        </CacheComponent>
      })}
    </Fragment>
  )
}

export default DyKeepAlive
