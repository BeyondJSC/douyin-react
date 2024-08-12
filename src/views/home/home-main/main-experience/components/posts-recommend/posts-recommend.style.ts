import styled from "styled-components"

export const PostsRecommendStyle = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;

  .post-recommend__item {
    width: 100%;
    color: black;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 8px;

    &-img {
      width: 100%;
    }
    
    &-info {
      padding: 8px;
    }
  }
`