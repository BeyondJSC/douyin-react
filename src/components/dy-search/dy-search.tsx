import { useEffect, useState } from "react"
import { DySearchStyle } from "./dy-search.style"
import { SearchOutlined } from "@ant-design/icons"
import DyButton from "../dy-button/dy-button"

export interface DySearchProps {
  value: string
  placeholder?: string
  onChange: (value: string) => void
}

export default function DySearch(props: DySearchProps) {
  const [ searchVal, setSearchVal ] = useState(props.value || '')  
  
  useEffect(() => {
    setSearchVal(props.value)
  }, [props.value])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchVal(e.target.value)
    props.onChange(e.target.value)
  }

  return (
    <DySearchStyle>
      <div className="dy-search__prefix">
        <SearchOutlined />
      </div>
      <input className="dy-search__input" type="text" value={searchVal} placeholder={props.placeholder} onChange={handleChange} />
      <div className="dy-search__suffix">
        <DyButton onClick={() => props.onChange(searchVal)} type="text">搜索</DyButton>
      </div>
    </DySearchStyle>
  )
}