import styled from "styled-components"

export const ForwardShareStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .forward-share__icon {
    font-size: 36px;

    &.is-active {
      color: #ffff00;
    }
  }

  .forward-share__text {
    margin-top: 4px;
    font-size: 12px;
  }
`

export const ForwardSharePopupMaskStyle = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  height: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  visibility: hidden;

  &.is-popup {
    visibility: visible;
  }
`

export const ForwardSharePopupStyle = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #000;
  height: 0;
  transition: height 0.2s ease-in-out;
  z-index: 1001;

  .forward-popup__mask {
    display: none;
    flex: 1;
  }

  .forward-popup__body {
    padding: 0 20px;
  }

  .forward-popup__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 20px;
    height: 32px;
    color: #ffffff;
    font-size: 14px;
  }


  &.is-popup {
    height: 324px;
  }

  .forward-popup__firends, .forward-popup__shares {
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    margin-top: 16px;
  }

  .forward-popup__shares {
    margin-top: 36px;
  }

  .forward-popup__share {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    color: #fff;

    &:last-child {
      margin-right: 0;
    }

    &-context {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background-color: #333333;

      .anticon {
        font-size: 24px;
        width: 24px;
        height: 24px;
      }
    }

    &-text {
      font-size: 12px;
      text-align: center;
      width: 56px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #ffffff;
      margin: 12px 0;
    }
  }

  .forward-popup__friend {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }

    &-avatar {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      
      &.is-checked {
        opacity: 0.5;
      }
    }

    &-more {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      color: #ffffff;
      background-color: #333333;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .anticon {
        font-size: 20px;
      }
    }

    &-name {
      font-size: 12px;
      text-align: center;
      width: 56px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #ffffff;
      margin: 12px 0;
    }
  }

  .forward-popup__checked-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    bottom: 20px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: #ffffff;
    box-sizing: border-box;
    border: 2px solid #ffffff;
    background-color: #fc2c58;

    .anticon {
      transform: scale(0.8)
    }
  }

  .forward-popup__icon-forward {
    width: 100%;
    height: 100%;
    background-color: #f8d018;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    .anticon {
      font-size: 32px;
      width: auto;
      height: auto;
    }
  }

  &.is-popup {
    .forward-popup__message {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 180px;
      width: 100%;
      display: flex;
      flex-direction: column;
      background-color: #000;
      padding: 20px;
      box-sizing: border-box;

      .forward-popup__message-comment {
        display: flex;
        height: 100px;
        width: 100%;

        textarea {
          flex: 1;
          background-color: transparent;
          outline: none;
          border: none;
          color: #ffffff;
        }
      }
      
      .forward-popup__message-poster {
        width: 40px;
        height: 40px;
      }

      .forward-popup__message-btns {
        display: flex;
        justify-content: space-between;

        .dy-button {
          flex: 1;
        }
      }
    }
  }
`