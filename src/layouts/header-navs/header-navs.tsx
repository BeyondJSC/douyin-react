import { MenuUnfoldOutlined, SearchOutlined } from "@ant-design/icons";
import { HeaderNavsStyle } from "./header-navs.style";
import { ReactElement, forwardRef, useContext, useImperativeHandle } from "react"
import { useActiveTab } from "./hooks/useActiveTab";
import { PopupContext } from "src/views/home/hooks/usePopup";

export interface NavTab {
  type: 'hot' | 'long-video' | 'follow' | 'experience' | 'recommend',
  name: string
  slot?: ReactElement
}

export interface HeaderNavsProps {
  toSidebar: () => void
  toSearch: () => void
  navTabs: NavTab[]
  moveProgress: number
  onTabChange?: (tab: NavTab) => void
}

export interface HeaderNavsExpose {
  setActiveTab: (tabType: NavTab['type']) => void
} 

const HeaderNavs = forwardRef<HeaderNavsExpose, HeaderNavsProps>((props: HeaderNavsProps, ref) => {
  const { activeTab, navTabRefs, indicatorStyle, setActiveTab } = useActiveTab(props.navTabs, props.moveProgress)
  const { popupVisible } = useContext(PopupContext)

  useImperativeHandle(ref, () => ({
    setActiveTab
  }))

  function handleTabClick(tab: NavTab) {
    setActiveTab(tab.type)

    props.onTabChange && props.onTabChange(tab)
  }

  return (
    <HeaderNavsStyle className={`${ popupVisible ? 'is-hidden' : '' }`}>
      <div className="header-navs__popup" onClick={props.toSidebar}>
        <MenuUnfoldOutlined />
      </div>
      <div className="header-navs__tabs">
        {
          props.navTabs.map((navTab, tabIdx) => (
            <div 
              ref={ el => navTabRefs.current[tabIdx] = el } 
              className={`header-navs__tab ${activeTab === navTab.type ? 'is-active' : ''}`} 
              key={navTab.type}
              onClick={() => handleTabClick(navTab)}
            >
              <span className="header-navs__text">{ navTab.name }</span>
              { navTab.slot }
            </div>
          ))
        }
        <div className="header-navs__indicator" style={indicatorStyle}></div>
      </div>
      <div className="header-navs__search" onClick={props.toSearch}>
        <SearchOutlined />
      </div>
    </HeaderNavsStyle>
  )
}) 

export default HeaderNavs