import styled from "styled-components"

export const DySearchStyle = styled.div`
  height: 36px;
  border-radius: 4px;
  border: 1px solid #646464;
  padding-left: 12px;
  display: flex;

  .dy-search__prefix {
    margin-right: 8px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #646464;
  }

  .dy-search__input {
    height: 100%;
    flex: 1;
    margin: 0;
    padding: 0;
    outline: none;
    border: none;
    background: transparent;
    color: #fff;
  }
`