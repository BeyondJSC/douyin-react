import styled from "styled-components"

export const DyStarStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .dy-star__icon-wrapper {
    position: relative;
    &.is-animating {
      .is-shadow {
        display: block;
        animation: scale .4s ease-in-out;
      }

      @keyframes scale {
        0% {
          transform: scale(0);
        }
        80% {
          transform: scale(1.2);
        }
        100% {
          transform: scale(1);
        }
      }
    }
  }

  .dy-star__icon {
    font-size: 36px;

    &.is-shadow {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: none;
      color: #ffff00;
    }

    &.is-active {
      color: #ffff00;
    }
  }

  .dy-star__text {
    margin-top: 4px;
    font-size: 12px;
  }
`