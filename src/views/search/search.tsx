import { useNavigate } from "react-router-dom"
import { SearchStyle } from "./search.style"
import { LeftOutlined } from '@ant-design/icons'

export default function Search() {
  const navigate = useNavigate()

  function handleToBack() {
    navigate(-1)
  }

  return (
    <SearchStyle>
      <div className="search-header">
        <div className="search-header__back" onClick={handleToBack}>
          <LeftOutlined />
        </div>
      </div>
    </SearchStyle>
  )
}