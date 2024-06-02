import styled from "styled-components"

export const DyVideoStyle = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  .dy-video__main {
    height: 100%;
    width: 100%;
  }

  .dy-video__loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
  }

  .dy-video__play {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: block;
    width: 60px;
    height: 60px;
    font-size: 60px;
    opacity: 0.3;
  }

  .dy-video__music {
    position: absolute;
    right: 8px;
    bottom: 12px;
  }

  .dy-video__img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    animation: rotate 5s linear forwards infinite;
    animation-play-state: running;

    &.is-pause {
      animation-play-state: paused;
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .dy-video__footer {
    position: absolute;
    bottom: 12px;
    left: 0;
    max-width: calc(100% - 44px);
  }

  .dy-video__sidebar {
    position: absolute;
    right: 8px;
    bottom: 58px;
  }


  .dy-video__progress-time {
    position: absolute;
    z-index: 100;
    bottom: 60px;
    left: 0;
    width: 100%;
    text-align: center;
  }

  .dy-video__time-current,
  .dy-video__time-total {
    font-size: 24px;
  }

  .dy-video__time-total {
    color: darkgrey
  }

  .dy-video__progress-main {
    position: absolute;
    bottom: 2px;
    width: 100%;
    box-sizing: border-box;
    padding: 2px 20px;
    --height: 2px;
    --border-radius: 1px;
    --line-color: #777777;
    z-index: 1000;
    display: flex;
    align-items: center;

    &.is-pause {
      --height: 4px;
      --border-radius: 2px;
      --line-color: #fff;
    }

    &.is-moving {
      --height: 8px;
      --border-radius: 4px;
      --line-color: #bababb;
    }
  }

  .dy-video__progress-bar {
    position: absolute;
    top: 3px;
    left: 20px;
    height: var(--height);
    width: calc(100% - 40px);
    background-color: #4f4f4f;
    border-radius: var(--border-radius);
  }

  .dy-video__progress-line {
    position: relative;
    z-index: 10;
    height: var(--height);
    width: 0;
    background-color: var(--line-color);
    transition: all 0.2s linear;
    border-radius: var(--border-radius) 0 0 var(--border-radius);
  }

  .dy-video__progress-point {
    position: relative;
    z-index: 10;
    width: calc(var(--height) + 2px);
    height: calc(var(--height) + 2px);
    border-radius: 50%;
    background-color: var(--line-color);
  }
`