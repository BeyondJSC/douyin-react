import styled from "styled-components"

export const PersonalVideoStyle = styled.div`
  height: 100%;
  transition: height 0.4s ease-in-out;
  position: relative;
  overflow: hidden;

  .peronal-video__comment-popup {
    position: fixed;
  }

  .personal-video__wrapper {
    height: 100%;
  }

  .personal-video__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 28px;

    &-text {
      margin-left: 8px;
    }
  }

  &.is-mask {
    .personal-video__mask {
      display: block;
    }
  }

  .personal-video__mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: none;
    z-index: 100;
  }

  .personal-video__header {
    display: flex;
    align-items: center;
    height: 60px;
    box-sizing: border-box;
    padding: 0 16px;
  }

  .personal-video__back {
    margin-right: 12px;
    .anticon {
      font-size: 20px;
    }
  }
`