import { DyLoadingStyle } from "./dy-loading.style"

export interface DyLoadingProps {
  className?: string
}

export default function DyLoading(props: DyLoadingProps) {
  return (
    <DyLoadingStyle className={props.className}>
      <div className="dy-loading__ball is-blue"></div>
      <div className="dy-loading__ball is-red"></div>
    </DyLoadingStyle>
  )
}