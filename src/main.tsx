import ReactDOM from 'react-dom/client'
import 'swiper/swiper-bundle.css'
import { startMock } from './mock/index.ts'
import { HoxRoot } from 'hox'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.tsx'

if (import.meta.env.DEV) {
  startMock()
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HoxRoot>
    <RouterProvider router={router}></RouterProvider>
  </HoxRoot>
)
