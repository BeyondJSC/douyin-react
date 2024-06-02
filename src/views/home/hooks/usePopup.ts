import { createContext, useState } from "react"

export interface PopupContext {
  popupVisible: boolean
  popupHeight: number
  openPopup: (type: PopupVm['type'], context?: unknown) => void
  closePopup: () => void
}

export interface PupupRefAntions {
  setPopupHeight: (height: number) => void
}

export interface PopupRefExpose {
  init: (context?: unknown, actions?: PupupRefAntions) => void
}

export interface PopupVm {
  type: 'COMMENT' | 'SHARE',
  popupRef: React.RefObject<PopupRefExpose>
  popupHeight: number
}

export const PopupContext = createContext<PopupContext>({
  popupVisible: false,
  popupHeight: 0,
  openPopup: () => {}, // 打开弹窗
  closePopup: () => {} // 关闭弹窗
})

export function usePopup(popupVms: PopupVm[]) {
  const [ popupVisible, setPopupVisible ] = useState(false)
  const [ popupHeight, setPopupHeight ] = useState(0)

  function openPopup(type: PopupVm['type'], context?: unknown) {
    const popupVm = popupVms.find(item => item.type === type)

    if (!popupVm) return

    setPopupHeight(popupVm.popupHeight)

    setPopupVisible(true)

    popupVm.popupRef.current?.init({...(context as Record<string, unknown>)}, {
      setPopupHeight
    })
  }

  function closePopup() {
    setPopupHeight(0)

    setPopupVisible(false)
  }

  return {
    popupVisible,
    popupHeight,

    openPopup,
    closePopup
  }
}