import { useState } from "react"
import { CommentBarStyle } from "./comment-bar.style"

export default function CommentBar() {
  const [ message, setMessage ] = useState('')

  return (
    <CommentBarStyle>
      <div className="comment-bar__input">
        <input value={message} type="text" placeholder='善语结善缘，恶言伤人心' onChange={(e) => setMessage(e.target.value)} />
        <div className="comment-bar__emoji-wrapper">
          <i className="comment-bar__emoji">@</i>
          <i className="comment-bar__emoji">☺</i>
        </div>
      </div>
    </CommentBarStyle>
  )
}