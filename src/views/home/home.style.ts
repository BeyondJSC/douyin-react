import styled from "styled-components"

export const HomeStyle = styled.div`
  --backgroundColor: #000;
  --fontColor: #fff;

  background-color: var(--backgroundColor);
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  &.is-light-theme {
    --backgroundColor: #fff;
    --fontColor: #000;
  }

  .home-swiper__container {
    height: 100vh;
  }

  .home-swiper__wrapper {
    display: flex;
    color: #fff;
    height: 100%;
  }

  .home-swiper__slide {
    position: relative;
    &.is-sidebar {
      width: 80vw;
    }

    &.is-mask {
      .home-swiper__slide--mask {
        display: block;
      }
    }

    &--mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: none;
      z-index: 100;
    }
  }
`