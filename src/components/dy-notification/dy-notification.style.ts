import styled from "styled-components"

export const DyNotificationStyle = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  visibility: hidden;

  .dy-notification__text {
    padding: 12px 16px;
    border-radius: 4px;
    background-color: #333;
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }

  &.is-visible {
    visibility: visible;
    .dy-notification__text {
      opacity: 1;
    }
  }
`