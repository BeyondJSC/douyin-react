import mitt from "mitt"
import { useCallback, useEffect } from "react"
import { FooterTab } from "../layouts/footer-tabs/footer-tabs"


export interface EventsRecord {
  refresh: FooterTab
}

export type EventType = keyof EventsRecord

const mitter = mitt<Record<EventType, EventsRecord[EventType]>>()

export function useEventListener(eventName: EventType, callback: (data: EventsRecord[EventType]) => void) {

  useEffect(() => {
    // 订阅事件
    mitter.on(eventName, callback)
    // 组件卸载时，取消订阅
    return () => {
      mitter.off(eventName, callback)
    }
  }, [eventName, callback])
}

export function useEmitEvent() {

  function emit(eventName: EventType, data: EventsRecord[EventType]) {
    mitter.emit(eventName, data)
  }

  return {
    emit: useCallback(emit, [])
  }
}