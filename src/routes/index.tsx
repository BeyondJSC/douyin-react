import { Navigate, createBrowserRouter } from 'react-router-dom'
import Home from '../views/home/home'
import Search from '../views/search/search'
import HomeMain from '../views/home/home-main/home-main'
import HomeShopping from '../views/home/home-shopping/home-shopping'
import HomeWorkbench from '../views/home/home-workbench/home-workbench'
import HomeMessage from '../views/home/home-message/home-message'
import HomeMine from '../views/home/home-mine/home-mine'
import App from 'src/App'
import { createRef } from 'react'
import ShareToFriend from 'src/views/blank/share-to-friend/share-to-friend'
import PersonalVideo from 'src/views/blank/personal-video/personal-video'
import Blank from 'src/views/blank/blank'

const routes = [
  {
    path: '/',
    element: <App />,
    nodeRef: createRef<HTMLDivElement>(),
    children: [
      {
        path: '',
        element: <Navigate to='/home/main' />
      },
      {
        path: 'home',
        element: <Home />,
        nodeRef: createRef<HTMLDivElement>(),
        children: [
          {
            path: '',
            element: <Navigate to='/home/main' />
          },
          {
            path: 'main',
            element: <HomeMain />
          },
          {
            path: 'shopping',
            element: <HomeShopping />
          },
          {
            path: 'workbench',
            element: <HomeWorkbench />
          },
          {
            path: 'message',
            element: <HomeMessage />
          },
          {
            path: 'mine',
            element: <HomeMine />
          }
        ]
      },
      {
        path: 'search',
        element: <Search />,
        nodeRef: createRef<HTMLDivElement>(),
      },
      {
        path: 'blank',
        element: <Blank />,
        nodeRef: createRef<HTMLDivElement>(),
        children: [
          {
            path: 'share-to-friend',
            element: <ShareToFriend />,
          },
          {
            path: 'personal-video',
            element: <PersonalVideo />,
          }
        ]
      }
    ]
  },
] 

const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_VUE_APP_BASE_PATH
})

export { routes }

export default router