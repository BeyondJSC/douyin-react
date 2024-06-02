import { styled } from "styled-components"

export const LiveTagStyle = styled.div`
  position: absolute;
  top: -8px;
  right: -14px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 16px;
  border-radius: 14px;
  background-color: #ed2f8a;

  .live-tag__text {
    font-size: 12px;
    transform: scale(0.7) translateY(-1px);
  }
`

export const HomeMainSlideStyle = styled.div`
  width: 100vw;
  height: calc(100vh - 56px); // 56px：footer height
  transition: height 0.4s ease-in-out;
`