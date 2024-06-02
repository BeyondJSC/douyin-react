import { useOutlet } from "react-router-dom"
import { BlankStyle } from "./blank.style"


export default function Blank() {
  const currentOutlet = useOutlet()
  
  return (
    <BlankStyle>
      { currentOutlet }
    </BlankStyle>
  )
}