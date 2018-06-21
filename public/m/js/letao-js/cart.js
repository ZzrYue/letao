$(function () {
    

    // 封装一个动态生成购物车的函数
    function render() {
        $.ajax({
            type: "get",
            url: "/cart/queryCart",
            dataType: "json",
            success: function (result) {
                // console.log(result)
                var html = template("cartListTemp", {
                    "items": result
                });
                $("#OA_task_2").html(html)
            }
        })
    }
    // 调用函数渲染数据
    render();


    // 编辑购物车
    $("#OA_task_2").on("tap", ".mui-btn-yellow", function () {
        // console.log(123);
        var _this = this;
        // 获取自定义数据
        var parameter = this.dataset
        // console.log(parameter);
        // 写编辑窗口的界面
        var editHtml = template("editListTEmp", parameter)
        var li = this.parentNode.parentNode;

        mui.confirm(editHtml.replace(/\n/g, ""), 'Hello Mr CART', ['是', '否'], function (e) {
            if (e.index == 0) { //点击“是”的时候，收集修改的数据


                // 收集修改后的数据
                var para = {
                    "id": parameter.id,
                    "size": $(".proSize > span.active").text(),
                    "num": $(".mui-input-numbox").val()
                }

                // 请求数据修改
                $.ajax({
                    type: "post",
                    url: "/cart/updateCart",
                    data: para,
                    dataType: "json",
                    success: function (result) {
                        // console.log(result)
                        // console.log(_this);
                        if(result.success && result.success == true){
                            // 将数据填充到页面，完成编辑的修改
                            var li = _this.parentNode.parentNode;
                            console.log(li)
                            // 修改数据
                            $(li).find(".editSize").text("x "+ para.num +"双");
                            $(li).find(".editNum").text("鞋码："+para.size);
                            // 修改默认值为现在修改后的值
                            $(_this).attr("data-num",para.num);
                            $(_this).attr("data-size",para.size);
                            // 关闭弹出层
                            mui.swipeoutClose(li);    
                        }
                    }
                })

            }else{
                // 关闭弹出层
                mui.swipeoutClose(li);
            }
        })
        // 初始化数字输入框
        mui(".mui-numbox").numbox();
        // 选择尺码
        $(".proSize").on("tap", "span", function () {
            // 清除所有span的active样式
            $(this).siblings().removeClass("active");
            // 为当前span添加active样式
            $(this).addClass("active");
        })
    })


    // 删除购物车
    $("#OA_task_2").on("tap", ".mui-btn-red", function () {
        // 获取档期点击删除的项的id
        var delId = this.dataset.id;
        // console.log(delId);
        var IDarr = [];
        IDarr.push(delId);
        // 获取当前id对应的li元素
        var li = this.parentNode.parentNode
        // console.log(li)
        // console.log(IDarr)
        $.ajax({
            type:"get",
            url:"/cart/deleteCart",
            data:{
                "id":IDarr
            },
            dataType:"json",
            success:function(result){
                console.log(result)
                if(result.success && result.success == true){
                    $(li).remove();
                }
            }
        })
    })
});