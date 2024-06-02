import React from "react"
import { DyButtonStyle } from "./dy-button.style"

export interface DyButtonProps extends React.PropsWithChildren {
  type?: 'primary' | 'default'
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export default function DyButton(props: DyButtonProps) {
  return (
    <DyButtonStyle className={`dy-button is-${props.type || 'default'}`} onClick={e => props.onClick && props.onClick(e)}>{ props.children }</DyButtonStyle>
  )
}