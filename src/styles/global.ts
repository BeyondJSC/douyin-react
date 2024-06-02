import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    font-size: 14px;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  
  body {
    line-height: 1;
    overflow: hidden;
  }
  
  ol, ul {
    list-style: none;
  }
  
  blockquote, q {
    quotes: none;
  }
  
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  .is-hidden {
    display: none !important;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .app-transition__container {}

  .app-router__container {
    width: 100vw;
  }

  .forward {
    &-enter {
      transform: translate3d(100vw, 0, 0);
    }
    
    &-enter-active {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      transform: translate3d(0, 0, 0);
      transition: all .3s;
      z-index: 100;
    }

    &-exit {
      transform: translate3d(0, 0, 0);
    }

    &-exit-active {
      transition: all .3s;
      transform: translate3d(-100vw, 0, 0);
    }
  }

  .back {
    &-enter {
      transform: translate3d(-100vw, 0, 0);
      overflow: hidden;
    }
    
    &-enter-active {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      transform: translate3d(0, 0, 0);
      transition: all .3s;
      overflow: hidden;
      z-index: 100;
    }

    &-exit {
      transform: translate3d(0, 0, 0);
    }

    &-exit-active {
      transition: all .3s;
      transform: translate3d(100vw, 0, 0);
    }
  }
`