import { CSSProperties, useLayoutEffect, useRef, useState } from "react"
import { NavTab } from "../header-navs"

export function useActiveTab(navTabs: NavTab[], moveProgress: number) {
  const [ activeTab, setActiveTab ] = useState<NavTab['type']>('recommend')

  const navTabRefs = useRef<Array<HTMLDivElement | null>>([])
  const [ navTabLefts, setNavTabLefts ] = useState<number[]>([])

  const activeTabIndex = navTabs.findIndex(navTab => navTab.type === activeTab)

  const prevLeft = navTabLefts[activeTabIndex - 1]
  const nextLeft = navTabLefts[activeTabIndex + 1]
  const activeLeft = navTabLefts[activeTabIndex]
  let moveDistance = 0

  if (moveProgress < 0 && prevLeft) {
    moveDistance = (activeLeft - prevLeft) * moveProgress
  } else if (moveProgress > 0 && nextLeft) {
    moveDistance = (nextLeft - activeLeft) * moveProgress
  }

  const indicatorStyle: CSSProperties = {
    left: activeLeft + moveDistance + 'px'
  }

  useLayoutEffect(() => {
    if (navTabRefs.current.length > 0) {
      const lefts: number[] = []

      navTabRefs.current.forEach(navTabRef => {
        if (navTabRef) {
          const { x, width } = navTabRef.getBoundingClientRect()
          const containerLeft = 36, indicatorWidth = 20

          lefts.push(x - containerLeft + (width - indicatorWidth) / 2)
        }
      })

      // console.log(lefts)

      setNavTabLefts(lefts)
    }
  }, [])

  return {
    activeTab,
    navTabRefs,
    indicatorStyle,

    setActiveTab,
  }
}