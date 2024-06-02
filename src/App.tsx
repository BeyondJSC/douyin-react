
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useLocation, useNavigationType, useOutlet } from "react-router-dom"
import { GlobalStyle } from './styles/global'
import { routes } from './routes'
import React from 'react'
import DyNotification from './components/dy-notification/dy-notification'
import { DyNotificationContext, useNotification } from './components/dy-notification/useNotification'
import { VideoStoreProvider } from './store/useVideoStore'

const ANIMATION_MAP = {
  PUSH: 'forward',
  POP: 'back',
  REPLACE: 'fade'
}
/**
 * TODO: 路由缓存方案 ps: 怀念vue keep-alive 的第n天
 */
function App() {
  const currentOutlet = useOutlet()
  const navigateType = useNavigationType()
  const location = useLocation()
  const { nodeRef } = routes.find(route => route.path === location.pathname) || {}
  const { notificationRef, notification } = useNotification()

  return (
    <>
      <GlobalStyle />
      <VideoStoreProvider>
        <TransitionGroup 
          className="app-transition__container" 
          childFactory={child => React.cloneElement(child, { classNames: ANIMATION_MAP[navigateType] })}
        >
          <CSSTransition key={location.pathname} nodeRef={nodeRef} timeout={300} unmountOnExit>
            <div className="app-router__container" ref={nodeRef}>
              <DyNotificationContext.Provider value={{notification}}>
                { currentOutlet }
              </DyNotificationContext.Provider>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </VideoStoreProvider>

      <DyNotification ref={notificationRef} />
    </>
  )
}

export default App
