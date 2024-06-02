import { useState } from "react"

export interface PromisifyVmConfig<T> {
  before?: (config?: T) => void
  after?: (config?: T) => void
}

export function usePromisifyVm<T, K>(vmConfig: PromisifyVmConfig<K>) {
  const [ myResolve, setMyResolve ] = useState<((value: T) => void) | null>(null)
  const [ myReject, setMyReject ] = useState<((reason?: unknown) => void) | null>(null)

  function resetState() {
    setMyResolve(null)
    setMyReject(null)
  }

  return {
    getInstacne(config?: K) {
      return new Promise<T>((resolve, reject) => {
        if (vmConfig.before) {
          vmConfig.before(config)
        }

        setMyResolve(resolve)
        setMyReject(reject)

        if (vmConfig.after) {
          vmConfig.after(config)
        }
      })
    },

    onResolve(value: T) {
      if (myResolve) {
        myResolve(value)
      }

      resetState()
    },

    onRejct(reason = new Error('user cancel ops')) {
      if (myReject) {
        myReject(reason)
      }

      resetState()
    }
  }
}