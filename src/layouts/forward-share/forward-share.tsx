import { formatNumber } from "src/utils"
import { ForwardShareStyle } from "./forward-share.style"
import Icon from '@ant-design/icons'
import React from "react"

export interface ForwardShareProps {
  className?: string
  forwardCount: number
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

function ForwardIcon() {
  return (
    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4702" width="1em" height="1em">
      <path fill="currentColor" d="M565.934 817.574a34.816 34.816 0 0 0 9.818 29.394l0.302 0.241a35.539 35.539 0 0 0 25.6 10.963c11.143 0 20.66-5.42 27.226-13.312l354.545-387.072a35.117 35.117 0 0 0 10.24-27.106 35.057 35.057 0 0 0-10.24-27.106L626.892 14.336a36.503 36.503 0 0 0-51.2 0 34.936 34.936 0 0 0-9.758 29.395V253.35c-295.996 0-535.974 238.893-535.974 533.684a529.468 529.468 0 0 0 44.454 212.51C116.7 777.276 329.812 608.437 565.332 608.437l0.602 209.137z" p-id="4703">
      </path>
    </svg>
  )
}

export default function ForwardShare(props: ForwardShareProps) {
  const forwardCount = formatNumber(props.forwardCount)

  return (
    <ForwardShareStyle className={props.className} onClick={e => props.onClick && props.onClick(e)}>
      <Icon className="forward-share__icon" component={ForwardIcon}></Icon>
      <span className="forward-share__text">{ forwardCount }</span>
    </ForwardShareStyle>
  )
}