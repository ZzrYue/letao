$(function(){
    // 设置input的自动聚焦
    $(document).ready(function(){ $("input").focus();})


    // 调用渲染localStorage的数据进行页面结构的渲染
    loadLocalStorage();


    // 当用户输入数据之后，将输入的内容在搜索列表中显示出来
    $("input").on("blur",function(e){
        // 获取文本框中间的内容，并且将其写入localStorage
        // 判断文本框输入的内容是否为空
        if($.trim($(".lt_search input").val()).length != 0){
            // console.log(123)
            // 获取文本框的内容
            var keyWords = $(".lt_search input").val();
            // 获取历史搜索记录
            var hisData = getLocalStorage();
            // 判断是否有重复的值
            for(var i= 0;i<hisData.length;i++){
                // console.log(456);
                if(hisData[i] == keyWords){
                    hisData.splice(i,1);
                    break;
                }
            }

            // 将获得的关键字添加到localStorage数组中
            hisData.push(keyWords);
            // 将获取的input内容写入到localStorage中
            localStorage.setItem("hisData",JSON.stringify(hisData));
            // 调用渲染函数进行页面结构的渲染
            loadLocalStorage();
        }  
    })


    // 点击“X”按钮的时候，删除当前的历史记录；即从当前的localStorage中将对应索引的值删除
    $(".historyData").on("tap",".fa-close",function(){
        // 获取当前点击的索引
        var index = $(this).data("index");
        // console.log(index);

        var hisData = getLocalStorage();
        // console.log(hisData);
        // 将当前索引的值在localStorage中删除
        hisData.splice(index,1);
        // console.log(hisData);  
        // 重新写入localStorage数组中,localStorage只支持string类型的存储
        localStorage.setItem("hisData",JSON.stringify(hisData));
        // 调用页面渲染函数，进行页面结构的渲染
        loadLocalStorage();
    });

    // 点击""清空记录"删除所有的历史记录
    $(".lt_history > .fa-trash").on("tap",function(){
        var hisData = getLocalStorage();
        // console.log(hisData);
        hisData = []
        localStorage.setItem("hisData",JSON.stringify(hisData));
        // console.log(hisData);
        loadLocalStorage();
        $(".lt_search input").val("");
    });


    // 点击搜索按钮的时候，跳转到searchList
    $(".lt_search  .search_btn").on("tap",function(e){
        console.log(123)
        // 获取当前的自定义的proName属性
        var keyWords = $(".lt_search input").val(); 
        location.href = "letao_searchList.html?proName="+keyWords;
    })

    // 点击左箭头的时候返回首页
    $(".lt_header .lt_hleft").on("tap",function(){
        location.href = "./index.html"
    })

    // 获取localStorage中数据的函数
    function getLocalStorage(){
        // 数据是存在localStorage中，所以提取localStorage中的需要用
        var historyData = localStorage.getItem("hisData");
        // 返回json格式的数组类型字符串
        var historyDataArr =  JSON.parse(historyData || '[]')    //localStorage中没有数据，那么就传入一个空数组字符串
        return  historyDataArr;
    }

    // 读取localStorage数据，渲染在页面的函数
    function loadLocalStorage(hisData){
        // 调用读取数据的函数
        var hisData = getLocalStorage();
        // console.log(hisData)
        
        // 调用模板引擎进行页面的渲染
        var html = template("searchList",{"items":hisData});
        $(".historyData").html(html)
    }
})