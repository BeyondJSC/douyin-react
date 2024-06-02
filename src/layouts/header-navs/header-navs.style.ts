import styled from "styled-components";

export const HeaderNavsStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 44px;
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  color: #fff;
  z-index: 100;

  .anticon {
    font-size: 20px;
  }

  .header-navs__tabs {
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
  }

  .header-navs__tab {
    position: relative;
    .header-navs__text {
      opacity: 0.7;
    }

    &.is-active {
      .header-navs__text {
        opacity: 1;
      }
    }
  }

  .header-navs__text {
    font-size: 16px;
    font-weight: bold;
  }

  .header-navs__indicator {
    position: absolute;
    bottom: -8px;
    /* left: 0; */
    width: 20px;
    height: 2px;
    background-color: #fff;
    border-radius: 1px;
    transition: all .3s linear;
  }
`