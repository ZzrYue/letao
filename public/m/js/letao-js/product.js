$(function () {

    // 点击做箭头的时候回到上次的位置
    $(".lt_hleft").on("tap", function () {
        location.href = history.back();
    })

    // 获取url中的proId
      // 获取用户传入的产品id号
    // lt.getParamter(location.search) == {"proId":4}
    var id = lt_local.getData(location.search).proId;

    // 初始化下拉刷新组件
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50, //可选,默认50.触发下拉刷新拖动距离,
                auto: true, //可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function () {
                    getData();
                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    // 页面动态加载
    function getData() {
        $.ajax({
            type: "get",
            url: "/product/queryProductDetail",
            "data": {
                "id": id
            },
            dataType: "json",
            success: function (result) {
                // console.log(result);
                var html = template("productListTemp", result);
                $(".mui-scroll").html(html);

                // 重新初始化轮播图组件
                mui('.mui-slider').slider({
                    interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
                });
                // 重新初始化数字输入框
                mui(".mui-numbox").numbox();
            }
        })
    }
    getData();


    // 尺码的选择
    $(".mui-scroll").on("tap", "span", function () {
        // console.log($(this))
        $(this).siblings().removeClass("active");
        $(this).addClass("active")
    })

    // 点击加入购物车事件
    $(".mui-btn-red").on("tap", function () {
        // 获取参数
        var num = $(".mui-input-numbox").val();
        var size = $(".proSize > span.active").text();
        // console.log(num,size,id)
        // 发送请求获取对应结果
        $.ajax({
            type: "post",
            url: "/cart/addCart",
            data: {
                "num": num,
                "size": size,
                "productId": id
            },
            dataType: "json",
            success: function (result) {
                console.log(result)
                // 判断用户是否登录
                if (result.success && result.success == true) {
                    if (result.error != 400) { //说明登录成功
                        mui.confirm('去购物车看看，确认？', '加入购物车', ['是', '否'], function (e) {
                            if (e.index == 0) {
                                location.href = "./cart.html"
                            }
                        })

                    }else{
                        location.href = "./login.html?redirectUrl=" + location.href;
                    }
                } else {
                    location.href = "./login.html?redirectUrl=" + location.href;
                }
            }
        })
    })
})