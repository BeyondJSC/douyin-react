import { RenderMainComponentProps } from "../home-main"

export default function MainHot(props: RenderMainComponentProps) {
  return (
    <div>{ props.navTab.name }</div>
  )
}