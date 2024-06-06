import styled from "styled-components"

export const HomeShoppingStyle = styled.div`
  padding: 12px;
  height: calc(100vh - 56px); // 56px：footer height
  width: 100vw;
  box-sizing: border-box;
  background-color: #f8f8f8;

  .home-shopping__header {
    position: relative;
    display: flex;
    align-items: center;
    height: 36px;

    &-suffix {
      margin-left: 12px;
    }
  }

  .home-shopping__icon {
    color: grey;
    font-size: 20px;
  }

  .home-shopping__search {
    flex: 1;
    display: flex;
    align-items: center;
    height: 100%;
    box-sizing: border-box;
    border: 2px solid red;
    border-radius: 12px;
    padding-left: 12px;

    &-prefix {
      margin-right: 12px;
    }

    &-input {
      flex: 1;
      border: none;
      outline: none;
      height: 32px;
      padding: 0;
      margin: 0;
    }

    &-suffix {
      width: 72px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-btn {
      background-color: #f23e5c;
      padding: 0 8px;
      border-radius: 8px;
      height: 28px;
      border: 0;
      outline: 0;
      color: #fff;
      margin-right: 4px;
    }
  }

  .home-shopping__card {
    color: #000;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 12px;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 12px 8px;
    margin: 12px 0;

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 16vw;
      flex-shrink: 0;
      margin-right: 12px;
    }

    &-icon {
      margin-bottom: 12px;
      .anticon {
        font-size: 24px;
      }
    }
  }

  .home-shopping__body {
    height: calc(100% - 134px);
  }
`