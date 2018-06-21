$(function(){
    // 点击返回上一页
    $(".lt_hleft").on("tap",function(){
        location.href = history.back();
    })
    // 点击跳到首页
    $(".lt_hright").on("tap",function(){
        location.href = "./index.html";
    })

    // 获取当前的url
    var currentUrl = location.search;
    // console.log(currentUrl);
    
    // 输入信息点击“确认”的事件
    $(".mui-btn-primary").on("tap",function(){
        // 收集输入框的内容
        var name = $(".mui-input-clear").val();
        var password = $(".mui-input-password").val();

        // 发送ajax请求
        $.ajax({
            url:" /user/login",
            type:"post",
            data:{
                "username":name,
                "password":password
            },
            dataType:"json",
            success:function(result){
                //console.log(result) //{error: 403, message: "用户名不存在! "}   {success: true}
                // 获取结果集来判断当前是否输入正确
                if(result.success && result.success == true){//说明输入正确
                    // 这个时候要判断用户在选择登录时候所处的界面，获取当前的URl值，来判断里面时候是否有redirectURL这个参数存在
                    // 调用获取url函数
                    if(currentUrl.indexOf("?redirectUrl") == 0){
                        // 跳到来源页
                        location.href = location.href.replace("?redirectUrl","")
                    }else{
                        // 跳回首页
                        location.href = "./index.html"
                    }


                }else{ //说明输入的不正确
                  mui.toast(result.message);
                }
            }
        })
        
    })
})