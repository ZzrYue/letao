$(function () {
    // 获取当前页面的url数据
    var test = window.location.search;
    // console.log(test)
    var option = lt_local.getData(test);
    // console.log(option);
    // 定义当前页
    var page = 1;
    // 定义当前页的条数
    var pageSize = 6;

    // 1.下拉刷新和上拉加载初始化
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: { //down:下拉
                height: 50, //可选,默认50.触发下拉刷新拖动距离,
                auto: false, //可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function () {
                    // 调用ajax，获取数据，重新生成动态结构
                    // 上面的操作做完之后，重新隐藏下拉刷新组件
                    setTimeout(function () {
                        // 对于下拉刷新结束，文档有错误，正确的方法是endPulldownToRefresh()
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                    }, 2000);
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up: {
                height: 50, //可选.默认50.触发上拉加载拖动距离
                auto: false, //可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: function () {
                    setTimeout(function () {
                        mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                    }, 2000);
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    // 2.点击左箭头的时候返回到search.html页面
    $(".lt_header .lt_hleft").on("tap", function () {
        location.href = "./letao_search.html"
    })

    // 3 进入页面的时候动态渲染页面结构
    function render(pamameter) {
        $.ajax({
            "type": "get",
            "url": "/product/queryProduct",
            "data": $.extend({
                "page": page,
                "pageSize": pageSize
            }, pamameter),
            "dataType": "json",
            success: function (result) {
                console.log(result)
                var html = template("templateList", result);
                // console.log(html)
                $(".lt_product ul").html(html);
            }
        })
    };

    // 调用函数进行页面渲染
    // console.log(option.proName)
    render({
        "proName": option.proName
    });

    // 给页面进行排序
    // 点击当前排序的项，进行对应的数据渲染
    $(".oder_by").on("tap", "a", function (e) {
        // console.log(123)

        var data = {
            page: page,
            pageSize: pageSize,
            proName: option.proName
        };

        // 判断当前点击的是否有active属性,如果有就做排序；如果没有就先清除所有的其他项的active，加上active，然后再操作排序
        if ($(this).hasClass("active")) {
            $(this).find("span").toggleClass("fa-angle-down fa-angle-up")
        } else {
            // 为了不影响页面效果，我们需要将箭头向上的统一恢复到默认向下的
            $(this).siblings().find("span").removeClass().addClass("fa fa-angle-down");
            
            $(this).siblings().removeClass("active");
            $(this).addClass("active")
        }

        // 获取排序的相关项
        var desc = $(this).data("para");
        console.log(desc)
        // 判断当前是升序还是降序，通过箭头的方向
        var descType;
        if($(this).find("span").hasClass("fa-angle-down")){
            descType = 2
        }else{
            descType = 1
        }
        // console.log(descType);
        // 组成一个对象
        var obj={};
        obj[desc] = descType;
        // console.log(obj)
        // 调用函数进行页面渲染
        render(obj);
    })



})