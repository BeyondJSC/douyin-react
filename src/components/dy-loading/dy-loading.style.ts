import { styled } from 'styled-components'

export const DyLoadingStyle = styled.div`
  display: flex;
  .dy-loading__ball {
    width: 12px;
    height: 12px;
    border-radius: 50%;

    &.is-blue {
      background-color: cadetblue;
      animation: anim-blue .4s ease-in-out 0s infinite alternate;
    }

    &.is-red {
      background-color: #fc2f56;
      animation: anim-red .4s ease-in-out 0s infinite alternate;
    }

    @keyframes anim-blue {
      from {
        transform: translate3d(0, 0, 0) scale(1);
      }
      to {
        transform: translate3d(12px, 0, 0) scale(1.2);
      }
    }

    @keyframes anim-red {
      from {
        transform: translate3d(0, 0, 0) scale(1);
      }
      to {
        transform: translate3d(-12px, 0, 0) scale(1.2);
      }
    }
  }
`