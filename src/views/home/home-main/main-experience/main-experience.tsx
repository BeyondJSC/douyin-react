import { RenderMainComponentProps } from "../home-main"

export default function MainExperience(props: RenderMainComponentProps) {
  return (
    <div>{ props.navTab.name }</div>
  )
}