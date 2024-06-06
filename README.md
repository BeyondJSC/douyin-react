# 前言
  此项目是 [Douyin-Vue](https://github.com/zyronon/douyin) React 版本的复刻，主要是为了学些 React 相关的技术栈，尤其是对于 Vueer 而言，是个不错的挑战。项目中的资源以及idea都是来自 [Douyin-Vue](https://github.com/zyronon/douyin) 项目，在此感谢作者。

# 技术栈相关
  - React 18.2.0 使用Hooks的方式组织代码结构
  - react-router-dom 使用类 vue-router 的方式管理前端路由
  - swiper/react-id-swiper 处理应用中大部分的滑动场景
  - styled-components 使用 CssInJS 的方式组织 CSS 代码
  - react-transition-group 处理路由切换动画
  - axios 处理网络请求
  - hox 
# 项目亮点梳理
  - 路由缓存及路由切换动画处理
    路由缓存整体采用`createPortal`方案，将未激活的路由缓存在游离的Dom节点中
    路由切换动画采用`react-transition-group`方案，通过`CSSTransition`组件实现路由切换动画效果
    
    由于`keep-alive`组件会在路由动画执行过程中被销毁，所以将`keep-alive`缓存的路由从`CSSTransition`的子组件中移出，然后通过`createPortal`将缓存内容`append`到指定`Dom`节点中，这样就能在路由切换动画执行过程中保持`keep-alive`缓存的内容

  