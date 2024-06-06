import { CSSProperties, ReactElement, useContext, useLayoutEffect, useState } from "react"
import { FooterTabsStyle } from "./footer-tabs.style"
import { PlusOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from "react-router-dom"
import { PopupContext } from "src/views/home/hooks/usePopup"
import { useUserStore } from "src/store/useUserStore"
import React from "react"

export interface FooterTab {
  type: 'main' | 'shopping' | 'workbench' | 'message' | 'mine'
  link: string
  isLightTheme: boolean // 是否是亮色主题
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
    { type: 'main', link: '/home/main', name: '首页', isLightTheme: false },
    { type: 'shopping', link: '/home/shopping', name: '商城', isLightTheme: true  },
    { type: 'workbench', link: '/home/workbench', icon: <PlusOutlined />, isLightTheme: false  },
    { type: 'message', link: '/home/message', name: '消息', badge: 2, isLightTheme: false  },
    { type: 'mine', link: '/home/mine', name: '我', isLightTheme: false  },
  ])

  const { state } = useLocation()

  const activeTab: FooterTab['type'] = state?.footerType || 'main'

  const { popupVisible } = useContext(PopupContext)

  const navigate = useNavigate()

  const { isLightTheme, setIsLightTheme } = useUserStore()

  const footerItemStyle: CSSProperties = {
    width: `${100 / footerTabs.length}%`
  }

  useLayoutEffect(() => {
    const footerTab = footerTabs.find(tab => tab.type === activeTab)

    if (footerTab) {
      setIsLightTheme(footerTab.isLightTheme) 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [footerTabs, setIsLightTheme])

  function handleTabClick(footerTab: FooterTab) {
    if (activeTab === footerTab.type) {
      props.onRefresh && props.onRefresh(footerTab)
    } else {
      navigate(footerTab.link, { replace: true, state: { footerType: footerTab.type }})

      setIsLightTheme(footerTab.isLightTheme)

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