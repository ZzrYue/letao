$(function(){
    

    // 页面动态加载左边数据
    $.ajax({
        type:"get",
        dataType:"json",
        url:"/category/queryTopCategory",
        success:function(result){
            // console.log(result)
            // 调用模板引擎
            var html = template("cateList",result);
            // 写入到页面结构中
            $(".cate_left_ul").html(html);
        }
    })

    // 动态加载右边数据
    function getRightData(data){
        $.ajax({
            type:"get",
            url:" /category/querySecondCategory",
            data:data,
            dataType:"json",
            success:function(result){
                // console.log(result)
                var html = template("cateListTemp",result);
                $(".cate_right_ul").html(html);
            }
        })
    }
    // 页面加载动态生成页面
    getRightData({"id":1})


    // 给左边导航栏添加点击事件
    $(".cate_left_ul").on("tap","li",function(e){
        // console.log($(this))
        $(this).siblings().removeClass("cate_active")
        $(this).addClass("cate_active")
        // console.log(e.target)
        // 获取当前点击的li的a标签的id
        var id = e.target.dataset.id
        // console.log(id)
        // 调用右边数据进行数据的渲染
        getRightData({"id":id})
    })
})