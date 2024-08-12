import { CameraOutlined, SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { HomeShoppingStyle } from "./home-shopping.style"
import { useQuickEntry } from "./hooks/useQuickEntry"
import ShoppingGoods from "./components/shopping-goods/shopping-goods"

export default function HomeShopping() {

  const { renderQuickEntry } = useQuickEntry()

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
      <div className="home-shopping__body">
        <ShoppingGoods />
      </div>
    </HomeShoppingStyle>
  )
}