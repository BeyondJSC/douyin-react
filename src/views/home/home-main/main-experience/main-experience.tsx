import DySearch from "src/components/dy-search/dy-search"
import { RenderMainComponentProps } from "../home-main"
import { MainExperienceStyle } from "./main-experience.style"
import { useState } from "react"
import PostsRecommend from "./components/posts-recommend/posts-recommend"

export default function MainExperience(props: RenderMainComponentProps) {
  const [ keyWord, setKeyWord ] = useState<string>("")

  console.log(props)

  function handleChange(val: string) {
    setKeyWord(val)
    // TODO
  }

  return (
    <MainExperienceStyle>
      <div className="main-experience__search">
        <DySearch value={keyWord} onChange={handleChange} placeholder="壁纸"></DySearch>
      </div>
      <div className="main-experience__body">
        <PostsRecommend></PostsRecommend>
      </div>
    </MainExperienceStyle>
  )
}