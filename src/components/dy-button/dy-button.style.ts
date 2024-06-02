import styled from "styled-components"

export const DyButtonStyle = styled.div`
  color: #fff;
  border-radius: 8px;
  height: 40px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.is-default {
    background-color: #242424;
  }

  &.is-primary {
    background-color: #fc2f56;
  }

  + .dy-button {
    margin-left: 12px;
  }
`