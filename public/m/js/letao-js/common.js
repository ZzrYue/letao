// 点击返回的时候，回到首页
$(".lt_header > .lt_hleft").on("tap", function () {
  // console.log(123)
  location.href = history.back();
});

// 点击搜索按钮的时候，跳到search.html页面
$(".lt_header > .lt_hright").on("tap", function () {
  // console.log(123)
  location.href = "./letao_search.html"
});

// 区域滚动
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005,
  indicators: false, //是否显示滚动条
});

// 轮播图
mui('.mui-slider').slider({
  interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
});

var lt_local = {
  getData: function (data) {
    var Result = {};
    // 将获取到的url数据从“？”处进行截取
    var strUrl = data.slice(1);
    // console.log(strUrl)
    // 按&符号进行分割
    var arr = strUrl.split("&"); // 返回数组

    // 遍历数组，进行二次切割，
    for (var i = 0; i < arr.length; i++) {
      // 然后将截取到的结果在“=”处分切 
      var final = arr[i].split("=");
      Result[final[0]] = final[1];
    }
    return Result;
  }
}