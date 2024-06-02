import styled from "styled-components"

export const DyAvatarStyle = styled.div`
  position: relative;
  width: 46px;
  height: 46px;
  z-index: 100;

  &.is-medium {
    width: 102px;
    height: 102px;

    .dy-avatar__follow {
      height: 28px;
    }

    .dy-avatar__icon {
      width: 28px;
      height: 28px;
      margin: 0 -14px;
    }
  }
  
  .dy-avatar__img {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 2px solid #fff;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    /* 防止图片加载过程中出现布局抖动 */
    image-rendering: -webkit-optimize-contrast;
    image-rendering: -moz-crisp-edges;
    image-rendering: -o-crisp-edges;
  }

  .dy-avatar__follow {
    position: absolute;
    bottom: -8px;
    right: 0;
    width: 100%;
    height: 18px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dy-avatar__icon {
    position: absolute;
    top: 0;
    left: 50%;
    margin: 0 -9px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    font-size: 12px;
    border-radius: 50%;

    &-add {
      background-color: #ff0000;
      color: #fff;
    }

    &-followed {
      display: none;
      background-color: #fff;
      color: #ff0000;
    }

    &.fade-in {
      display: flex;
      animation: fade-in .4s linear;
      animation: rotate .4s linear;
    }

    @keyframes fade-in {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    
    @keyframes rotate {
      0% {
        transform: rotate(-90deg);
      }
      100% {
        transform: rotate(0);
      }
    }

    &.fade-out {
      animation: fade-out .4s linear;
    }

    @keyframes fade-out {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  }
`