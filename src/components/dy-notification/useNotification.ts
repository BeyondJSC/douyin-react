import { createContext, useRef } from "react"
import { DyNotificationExpose } from "./dy-notification"

export const DyNotificationContext = createContext<DyNotificationExpose>({
  notification: () => {},
})

export interface NotificationConfig {
  duration?: number
}

export function useNotification(config: NotificationConfig = {}) {
  const notificationRef = useRef<DyNotificationExpose>(null)

  function notification(message: string, duration?: number) {
    if (notificationRef.current) {
      notificationRef.current.notification(message, duration || config.duration || 2000)
    }
  }

  return {
    notificationRef,

    notification
  }
}