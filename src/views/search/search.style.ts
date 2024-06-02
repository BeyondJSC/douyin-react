import styled from "styled-components"

export const SearchStyle = styled.div`
  background-color: #000;
  width: 100vw;
  height: 100vh;
  color: #fff;

  .search-header {
    display: flex;
    align-items: center;
    height: 60px;
    box-sizing: border-box;
    border-bottom: 1px solid #252d42;
    padding: 0 16px;
  }

  .search-header__back {
    margin-right: 12px;
    .anticon {
      font-size: 18px;
    }
  }
`