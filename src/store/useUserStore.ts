import { createGlobalStore } from "hox"
import userFeiends from './friends.json'
import { useState } from "react"

export interface UserInfo {
  id: string
  avatar: string
  name: string
  type?: "REQUEST_FOLLOW" | "FOLLOW_ME" | 'FOLLOW_EACH_OTHER' | 'FOLLOW_HE' | 'RECOMMEND' | 'RECOMMEND_NO_REMOVE'
}

export type Firends = { all: UserInfo[]; recent: UserInfo[]; eachOther: UserInfo[] }

const [ useUserStore, getUserStore] = createGlobalStore(() => {
  const [ friends ] = useState(userFeiends)
  const [ isLightTheme, setIsLightTheme ] = useState(false)

  return {
    friends: friends as Firends,
    isLightTheme,

    setIsLightTheme
  }
})

export { useUserStore, getUserStore }