import { forwardRef, useImperativeHandle, useState } from "react"
import { DyNotificationStyle } from "./dy-notification.style"

export interface DyNotificationExpose {
  notification: (message: string, duration?: number) => void
}

const DyNotification = forwardRef<DyNotificationExpose, unknown>((_, ref) => {
  const [ isVisible, setIsVisible ] = useState(false)
  const [ message, setMessage ] = useState('')

  useImperativeHandle(ref, () => ({
    notification: (message: string, duration?: number) => {
      setMessage(message)
      setIsVisible(true)
      setTimeout(() => {
        setMessage('')
        setIsVisible(false)
      }, duration)
    }
  }))
  

  return (
    <DyNotificationStyle className={`${ isVisible ? 'is-visible' : '' }`}>
      <span className="dy-notification__text">{ message }</span>
    </DyNotificationStyle>
  )
})

export default DyNotification