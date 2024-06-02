import { FileDoneOutlined, MessageOutlined, MobileOutlined, SkinOutlined, ThunderboltOutlined, TransactionOutlined } from "@ant-design/icons"
import React, { useState } from "react"

export interface QuickEntry {
  type: 'my-order' | 'phone-bill' | 'shopping-message' | 'hour-reach' | 'after-sales' | 'trendy-clothing'
  name: string
  icon: React.ReactNode
}

export function useQuickEntry() {
  const [ quickEntrys ] = useState<QuickEntry[]>([
    {
      type: 'my-order',
      name: '我的订单',
      icon: <FileDoneOutlined />
    },
    {
      type: 'phone-bill',
      name: '手机充值',
      icon: <MobileOutlined />
    },
    {
      type: 'shopping-message',
      name: '购物消息',
      icon: <MessageOutlined />
    },
    {
      type: 'hour-reach',
      name: '小时达',
      icon: <ThunderboltOutlined />
    },
    {
      type: 'after-sales',
      name: '退款/售后',
      icon: <TransactionOutlined />
    },
    {
      type: 'trendy-clothing',
      name: '潮流服装',
      icon: <SkinOutlined />
    }
  ])

  function renderQuickEntry() {
    return (
      <div 
        className="home-shopping__card"
        onTouchStart={e => e.stopPropagation()}
        onTouchMove={e => e.stopPropagation()}
        onTouchEnd={e => e.stopPropagation()}
      >
        {
          quickEntrys.map(queryEntry => {
            return (
              <div className="home-shopping__card-item" key={queryEntry.type}>
                <div className="home-shopping__card-icon">
                  {queryEntry.icon}
                </div>
                <span className="home-shopping__card-name">{queryEntry.name}</span>
              </div>
            )
          })
        }
      </div>
    )
  }

  return {
    renderQuickEntry
  }
}