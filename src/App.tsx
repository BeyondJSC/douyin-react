
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useLocation, useNavigationType, useOutlet } from "react-router-dom"
import { GlobalStyle } from './styles/global'
import { PropsWithChildren, useRef } from 'react'
import DyNotification, { DyNotificationExpose } from './components/dy-notification/dy-notification'
import { DyNotificationContext, useNotification } from './components/dy-notification/useNotification'
import { VideoStoreProvider } from './store/useVideoStore'
import DyKeepAlive from './components/dy-keep-alive/dy-keep-alive'
import React from 'react'

export type DyNotificationProps = PropsWithChildren<DyNotificationExpose>

export function NotifacationProvider(props: DyNotificationProps) {
  const { notification } = props

  return (
    <DyNotificationContext.Provider value={{ notification }}>
      {props.children}
    </DyNotificationContext.Provider>
  )
}

const ANIMATION_MAP = {
  PUSH: 'forward',
  POP: 'back',
  REPLACE: 'fade'
}

function App() {
  const currentOutlet = useOutlet()
  const navigateType = useNavigationType()
  const location = useLocation()
  const { notificationRef, notification } = useNotification()
  const routerContainerRef = useRef<HTMLDivElement>(null)

  function handleChildFactory(child: React.ReactElement) {
    return React.cloneElement(child, { classNames: ANIMATION_MAP[navigateType] })
  }

  return (
    <>
      <GlobalStyle />
      <VideoStoreProvider>
        <NotifacationProvider notification={notification}>
          <TransitionGroup 
            className="app-transition__container" 
            childFactory={handleChildFactory}
          >
            <CSSTransition key={location.pathname} timeout={300}>
              <div ref={routerContainerRef} className="app-router__container"></div>
            </CSSTransition>
          </TransitionGroup>
          <DyKeepAlive activeName={location.pathname} wrapperRef={routerContainerRef}>
            { currentOutlet }
          </DyKeepAlive>
        </NotifacationProvider>
      </VideoStoreProvider>

      <DyNotification ref={notificationRef} />
    </>
  )
}

export default App
