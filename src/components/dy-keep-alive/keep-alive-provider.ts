import { DependencyList, createContext, useContext, useEffect, useLayoutEffect } from "react"

export interface KeepAliveContext {
  isActivated: boolean
}

export const CacheComponentContext = createContext<KeepAliveContext>({
  isActivated: false, // 默认不激活
})

export type ActivatedCallback = (isActivated: boolean) => void | (() => void)

export function useEffectOnActivated(callback: ActivatedCallback, deps: DependencyList) {
  const { isActivated } = useContext(CacheComponentContext)

  useEffect(() => {

    const destroyCb = callback(isActivated)

    return () => {
      if (typeof destroyCb === 'function') {
        destroyCb()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActivated, ...deps])
}

export function useLayoutEffectOnActivated(callback: ActivatedCallback, deps: DependencyList) {
  const { isActivated } = useContext(CacheComponentContext)

  useLayoutEffect(() => {

    const destroyCb = callback(isActivated)

    return () => {
      if (typeof destroyCb === 'function') {
        destroyCb()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActivated, ...deps])
}