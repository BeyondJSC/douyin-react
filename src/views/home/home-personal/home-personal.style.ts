import styled from "styled-components"

export const HomePersonalStyle = styled.div`
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;

  .home-personal__header {
    position: relative;
    height: 220px;

    &-bg {
      height: 100%;
      width: 100%;
    }

    &-ops {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding: 0 16px;
      box-sizing: border-box;
      height: 52px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      width: 32px;
      font-size: 18px;
      border-radius: 50%;
      background-color: #000;
      opacity: 0.3;
    }

    &-btns {
      display: flex;
      width: 80px;
      justify-content: space-between;
    }

    &-avatar {
      position: absolute;
      left: 16px;
      bottom: 16px;
    }

    &-info {
      position: absolute;
      left: 130px;
      bottom: 16px;
      height: 102px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &-name {
      font-size: 22px;
      font-weight: bold;
    }

    &-sign {
      font-size: 12px;
      color: #bababa;

      .anticon {
        margin-left: 8px;
      }
    }
  }

  .home-personal__panel {
    padding: 0 20px;
  }

  .home-personal__body {
  }

  .home-personal__statistics {
    display: flex;
    align-items: center;
    padding: 16px 0;
    
    &-item {
      margin-right: 16px;
      display: flex;
      align-items: center;
    }

    &-num {
      font-size: 16px;
      font-weight: bold;
    }

    &-name {
      margin-left: 4px;
      font-size: 12px;
    }
  }

  .home-personal__signature {
    font-size: 12px;
  }

  .home-personal__info {
    margin: 12px 0 20px;

    &-item {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 2px;
      background-color: #242532;
      opacity: 0.4;
    }

    &-text {
      font-size: 10px;
    }
  }

  .home-personal__total {
    display: flex;
    align-items: center;
    height: 32px;
    margin-bottom: 8px;

    &-num {
      margin-right: 4px;
    }
  }

  .home-personal__videos {
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
  }

  .home-personal__video-item {
    position: relative;
    width: 33.3vw;
    height: calc(33.3vw * 1.2);
  }

  .home-personal__loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .home-personal__video-info {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 8px 12px;
  }

  .home-personal__video-num {
    margin-left: 8px;
  }

  .home-personal__video-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`