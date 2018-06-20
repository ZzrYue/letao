$(function(){
    // 点击返回的时候，回到首页
    $(".lt_header > .lt_hleft").on("tap",function(){
        // console.log(123)
        location.href = "./index.html"
    });

    // 点击搜索按钮的时候，跳到search.html页面
    $(".lt_header > .lt_hright").on("tap",function(){
        // console.log(123)
        location.href = "./letao_search.html"
    });

    // 页面动态加载左边数据
    $.ajax({
        type:"get",
        dataType:"json",
        url:"/category/queryTopCategory",
        success:function(result){
            console.log(result)
            // 调用模板引擎
            var html = template("cateList",result);
            // 写入到页面结构中
            $(".cate_left_ul").html(html);
        }
    })

    // 给左边导航栏添加点击事件
    $(".cate_left_ul").on("tap","a",function(e){
        console.log($(this))
         $(this).parent().siblings("li").removeClass("active")
        $(this).addClass("active")
        
    })
})