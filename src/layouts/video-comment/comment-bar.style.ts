import styled from "styled-components"

export const CommentBarStyle = styled.div`
  padding: 8px 16px;

  .comment-bar__input {
    position: relative;
    height: 36px;
    border-radius: 18px;
    overflow: hidden;

    input {
      width: 100%;
      height: 100%;
      outline: none;
      border: none;
      padding: 0 80px 0 16px;
      box-sizing: border-box;
      margin: 0;
      background-color: #eee;
    }
  }

  .comment-bar__emoji-wrapper {
    position: absolute;
    right: 16px;
    top: 0;
    height: 100%;
    width: 64px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .comment-bar__emoji {
    font-size: 24px;
  }
`