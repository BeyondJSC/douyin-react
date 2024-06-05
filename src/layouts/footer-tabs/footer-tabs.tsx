import { CSSProperties, ReactElement, useContext, useState } from "react"
import { FooterTabsStyle } from "./footer-tabs.style"
import { PlusOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from "react-router-dom"
import { PopupContext } from "src/views/home/hooks/usePopup"
import { useUserStore } from "src/store/useUserStore"
import React from "react"

export interface FooterTab {
  type: 'main' | 'shopping' | 'workbench' | 'message' | 'mine'
  link: string
  name?: string
  icon?: ReactElement
  badge?: number
}

export interface FooterTabProps {
  onTabChange?: (tab: FooterTab) => void
  onRefresh?: (tab: FooterTab) => void
}

const FooterTabs = React.memo(function (props: FooterTabProps) {
  const [ footerTabs ] = useState<FooterTab[]>([
    { type: 'main', link: '/home/main', name: '首页' },
    { type: 'shopping', link: '/home/shopping', name: '商城' },
    { type: 'workbench', link: '/home/workbench', icon: <PlusOutlined /> },
    { type: 'message', link: '/home/message', name: '消息', badge: 2 },
    { type: 'mine', link: '/home/mine', name: '我' },
  ])

  const { state } = useLocation()

  const activeTab: FooterTab['type'] = state?.footerType || 'main'

  const { popupVisible } = useContext(PopupContext)

  const navigate = useNavigate()

  const { isLightTheme } = useUserStore()

  const footerItemStyle: CSSProperties = {
    width: `${100 / footerTabs.length}%`
  }

  function handleTabClick(footerTab: FooterTab) {
    // eslint-disable-next-line no-debugger
    debugger
    if (activeTab === footerTab.type) {
      props.onRefresh && props.onRefresh(footerTab)
    } else {
      navigate(footerTab.link, { replace: true, state: { footerType: footerTab.type }})

      props.onTabChange && props.onTabChange(footerTab)
    }
  }

  return (
    <FooterTabsStyle className={`${ popupVisible ? 'is-hidden' : '' } ${ isLightTheme ? 'is-light-theme' : ''}`}>
      {
        footerTabs.map(footerTab => {
          return (
            <div 
              className={`footer-tab__item ${activeTab === footerTab.type ? 'is-active' : ''}`} 
              style={footerItemStyle} 
              key={footerTab.type}
              onClick={() => handleTabClick(footerTab)}
            >
              { footerTab.badge && (<span className="footer-tab__badge">{ footerTab.badge }</span>) }
              { footerTab.name && (<span className="footer-tab__text">{ footerTab.name }</span>) }
              { footerTab.icon && (<span className="footer-tab__icon">{ footerTab.icon }</span>) }
            </div>
          )
        })
      }
    </FooterTabsStyle>
  )
})

export default FooterTabs