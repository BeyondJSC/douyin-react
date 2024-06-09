# 前言
  此项目是 [Douyin-Vue](https://github.com/zyronon/douyin) React 版本的复刻，主要是为了学些 React 相关的技术栈，尤其是对于 Vueer 而言，是个不错的挑战。项目中的资源以及idea都是来自 [Douyin-Vue](https://github.com/zyronon/douyin) 项目，在此感谢作者。

# 技术栈相关
  - React 18.2.0 使用Hooks的方式组织代码结构
  - react-router-dom 使用类 vue-router 的方式管理前端路由
  - swiper/react-id-swiper 处理应用中大部分的滑动场景
  - styled-components 使用 CssInJS 的方式组织 CSS 代码
  - react-transition-group 处理路由切换动画
  - axios 处理网络请求
  - hox 全局状态管理
# 项目亮点梳理
  - 路由缓存及路由切换动画处理

    路由缓存整体采用`createPortal`方案，将未激活的路由缓存在游离的Dom节点中

    路由切换动画采用`react-transition-group`方案，通过`CSSTransition`组件实现路由切换动画效果
    
    由于`keep-alive`组件会在路由动画执行过程中被销毁，所以将`keep-alive`缓存的路由从`CSSTransition`的子组件中移出，然后通过`createPortal`将缓存内容`append`到指定`Dom`节点中，这样就能在路由切换动画执行过程中保持`keep-alive`缓存的内容
  
  - 视频无限滑动方案设计
    
    默认后端数据采用分页加载的形式，每页数据定为5条。

    为了重复利用DOM，减轻渲染压力，使用`swiper`的`loop`设计，通过在滑动过程中对数据进行加载和替换达到无限滑动的效果。

    为了保证`swiper`的`slide`数量始终为10个，使用`index`作为`key`, 这样可以保证`swiper`实例的正确运行, `slide`内部的组件实例采用`videoInfo.aweme_id`作为key, 确保数据能够准确更新。

    在用户上滑时，当`slide`索引为**4**时，加载下一页内容，并将索引**5-9**的slide内容进行替换，`slide`索引为**9**时，加载下一页内容，并将索引**0-4**的slide内容进行替换。

    在用户下拉时，当`slide`索引为**0**时，加载上一页内容，并将索引**5-9**的slide内容进行替换，`slide`索引为**5**时，加载上一页内容，并将索引**0-4**的slide内容进行替换。

    为了防止数据重复加载，每个`videoInfo`中增加`dataIndex`属性表示数据的真实索引，通过比较相邻数据的`dataIndex`判断数据是否加载
  
  - 瀑布流布局组件设计

    采用绝对定位的方案，动态计算每个`item`的`top`和`left`, 支持`better-scroll`的下拉加载

    使用`Image`提前加载图片信息，获取图片原始宽高，使得布局计算不依赖图片加载结果，支持图片懒加载