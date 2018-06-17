// 区域滚动
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005,
    indicators: false, //是否显示滚动条
});

// 轮播图
mui('.mui-slider').slider({
  interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
});