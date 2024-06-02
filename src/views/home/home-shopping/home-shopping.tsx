import { CameraOutlined, SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { useUserStore } from "src/store/useUserStore"
import { useEffect } from "react"
import { HomeShoppingStyle } from "./home-shopping.style"
import { useQuickEntry } from "./hooks/useQuickEntry"

export default function HomeShopping() {

  const { setIsLightTheme } = useUserStore()

  const { renderQuickEntry } = useQuickEntry()

  useEffect(() => {   
    setIsLightTheme(true)
  }, [setIsLightTheme])

  return (
    <HomeShoppingStyle>
      <div className="home-shopping__header">
        <div className="home-shopping__search">
          <div className="home-shopping__search-prefix">
            <SearchOutlined className="home-shopping__icon" />
          </div>
          <input className="home-shopping__search-input" type="text" placeholder="50元话费充值" />
          <div className="home-shopping__search-suffix">
            <CameraOutlined className="home-shopping__icon" />
            <button className="home-shopping__search-btn">搜索</button>
          </div>
        </div>
        <div className="home-shopping__header-suffix">
          <ShoppingCartOutlined className="home-shopping__icon" />
        </div>
      </div>
      <div className="home-shopping__banner">
        { renderQuickEntry() }
      </div>
    </HomeShoppingStyle>
  )
}