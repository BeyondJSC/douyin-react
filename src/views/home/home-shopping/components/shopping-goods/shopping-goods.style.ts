import styled from "styled-components"

export const ShoppingGoodsStyle = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;

  .shopping-goods__item {
    width: 100%;
    color: black;
    margin-bottom: 8px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 8px;

    &-img {
      width: 100%;
    }
    
    &-info {
      padding: 8px;
    }

    &-name {
      font-size: 16px;
      margin-bottom: 12px;
    }

    &-row {
      display: flex;
      align-items: flex-end;
      margin: 8px 0;
    }

    &-price {
      color: #f8264a;
      display: flex;
      align-items: flex-end;
    }

    &-num {
      padding-left: 4px;
      font-size: 12px;
      color: darkgray;
    }

    &-discount {
      color: #c7596a;
      padding: 0 8px;
      border: 1px solid #c7596a;
    }

    &-notice {
      color: #e6995c;
    }
  }

  .shopping-goods__price-num {
    font-size: 22px;
    font-weight: bold;
  }

  .shopping-goods__price-symbol {
    font-size: 14px;
  }
`