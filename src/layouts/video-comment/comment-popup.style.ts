import styled from "styled-components"

export const CommentPopupStyle = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 1000;
  height: 0;
  transition: height 0.4s ease-in-out;
  background-color: #fff;
  border-radius: 12px 12px 0 0;
  visibility: hidden;

  &.is-popup {
    visibility: visible;
    height: 628px;
  }

  &.is-fullscreen {
    height: 100vh;
  }

  .comment-popup__loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
  }

  .comment-popup__header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;

    &-title {
      font-weight: bold;
      font-size: 12px;
    }
  }

  .comment-popup__body {
    height: calc(100% - 40px);
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 52px; // footer height
    box-sizing: border-box;
  }

  .comment-popup__ops {
    position: absolute;
    top: 0;
    right: 16px;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .comment-popup__icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f2f2f2;
    border-radius: 50%;

    .anticon {
      font-size: 12px;
    }

    + .comment-popup__icon {
      margin-left: 12px;
    }
  }

  .comment-popup__footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
  }
`