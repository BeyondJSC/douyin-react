import styled from "styled-components"

export const CommentItemStyle = styled.div`
  padding: 0 12px;
  display: flex;
  margin-bottom: 12px;

  .comment-item__avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 12px;
  }

  .comment-item__username {
    color: #bababb;
    font-size: 14px;
  }

  .comment-item__content {
    flex: 1;
  }

  .comment-item__text {
    margin: 8px 0;
    line-height: 20px;
    color: #333;

    &.is-no-like {
      color: #bababb;
    }
  }

  .comment-item__time {
    color: #bababb;
    font-size: 12px;
  }

  .comment-item__info {
    display: flex;
    align-items: center;
  }

  .comment-item__reply {
    color: #bababb;
    margin-left: 12px;
    font-size: 12px;
  }

  .comment-item__ops {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: gray;
    font-size: 12px;
  }

  .comment-item__like {
    display: flex;
    align-items: center;
    margin-right: 8px;

    &.is-like {
      color: #e73a57;
    }
  }

  .comment-item__icon {
    font-size: 16px;
    width: 16px;
    height: 16px;
    margin: 0 4px;
  }

  .comment-item__count {
    font-size: 12px;
  }

  .comment-item__replies {
    margin: 12px 0;

    &-more {
      display: flex;
      align-items: center;
    }

    &-split {
      width: 20px;
      height: 1px;
      background-color: #d5d5d5;
      margin-right: 12px;
    }

    &-text {
      color: grey;
      font-size: 12px;
    }

    &-icon {
      font-size: 10px;
      margin-left: 6px;
      color: grey;
    }
  }
`