import styled from "styled-components"

export const FooterTabsStyle = styled.div`
  --backgroundColor: #000;
  --fontColor: #fff;


  position: fixed;
  bottom: 0;
  left: 0;
  height: 56px;
  width: 100vw;
  display: flex;
  background-color: var(--backgroundColor);
  z-index: 100;

  &.is-light-theme {
    --backgroundColor: #fff;
    --fontColor: #000;
  }

  .footer-tab__item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .footer-tab__text {
      opacity: 0.7;
      font-weight: bold;
    }

    &.is-active {
      .footer-tab__text {
        opacity: 1;
      }
    }
  }

  .footer-tab__text {
    color: var(--fontColor);
    font-size: 16px;
  }

  .footer-tab__icon {
    width: 36px;
    height: 28px;
    box-sizing: border-box;
    border: 3px solid #fff;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--fontColor);
    .anticon {
      font-size: 18px;
    }
  }

  .footer-tab__badge {
    position: absolute;
    top: 4px;
    right: 4px;
    font-size: 12px;
    background-color: #fc2f56;
    color: #fff;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
`