import styled from "styled-components"

export const DyLikeStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .dy-like__icon-wrapper {
    position: relative;
    &.is-animating {
      .is-shadow {
        display: block;
        animation: scale 0.4s ease-in-out;
      }

      @keyframes scale {
        0% {
          transform: scale(0);
        }
        60% {
          transform: scale(1.2);
        }
        100% {
          transform: scale(1);
        }
      }
    }
  }

  .dy-like__icon {
    font-size: 36px;

    &.is-shadow {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: none;
      color: #e73a57;
    }

    &.is-active {
      color: #e73a57;
    }
  }

  .dy-like__text {
    margin-top: 4px;
    font-size: 12px;
  }
`