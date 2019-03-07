/*
* 本地存储
*/

//存
function saveStorage(key, value) {
	
	//判断浏览器是否支持本地存储
	if (typeof(Storage) !== "undefined") {
		// 针对 localStorage/sessionStorage 的代码
		localStorage.setItem(key, value);
		return true;
	} else {
		// 抱歉！不支持 Web Storage ..
		return false;
	}
	
}

//取
function getStorage(key) {
	
	//判断浏览器是否支持本地存储
	if (typeof(Storage) !== "undefined") {
		// 针对 localStorage/sessionStorage 的代码
		var value = localStorage.getItem(key);
		return value;
	} else {
		// 抱歉！不支持 Web Storage ..
		return false;
	}
	
}

//json对象转json字符串
function toJsonString(value) {
	var result = JSON.stringify(value);
	return result;
}

//json字符串转json对象
function toJsonObj(value) {
	var result = JSON.parse(value);
	return result;
}

/*
* cookie
*/

function setCookie ( name, value, expdays){   
	var expdate = new Date();    //设置Cookie过期日期
    expdate.setDate(expdate.getDate() + expdays) ;    //添加Cookie
    document.cookie = name + "=" + escape(value) + ";expires=" + expdate.toUTCString();
	
	// 测试本地是否开启cookie
	/*
	var dt = new Date();   
	dt.setSeconds(dt.getSeconds() + 60);   
	document.cookie = "cookietest=1; expires=" + dt.toGMTString();   
	var cookiesEnabled = document.cookie.indexOf("cookietest=") != -1;   
	if(!cookiesEnabled) {   
		//没有启用cookie   
		alert("没有启用cookie ");  
	} else{  
		//已经启用cookie   
		alert("已经启用cookie ");  
	} 
	*/		
}

function removeCookie(name) {
	setCookie ( name, "", -1 );
}

function getCookie(name) {
	var start = document.cookie.indexOf(name+"="); 
	if ( start != -1 ) {
        start = start + name.length + 1 ;        //获取value的终止位置
        var end = document.cookie.indexOf(";", start) ;        if ( end == -1 )
            end = document.cookie.length ;        //截获cookie的value值,并返回
        return unescape(document.cookie.substring(start,end)) ;
    }return "" ;
}



//托运须知checkbox取消/勾选
function checkedClause(obj, id) {
	debugger
	if ($(obj).is(':checked')) {
		$("#"+id).attr("disabled",false);
		$("#"+id).css({"pointer-events":"auto", "background":"#2593b8"});
	} else {
		$("#"+id).attr("disabled",true);
		$("#"+id).css({"pointer-events":"none", "background":"#ccc"});
	}
	
}

//loading
function closeLoading() {
	$("#loading, .weui-mask").remove();
}
function loading(msg) {
	var loading = '<div class="weui-mask weui-mask--visible"></div><div class="weui-loadmore" id="loading" style="position: absolute;top: 50%;left: 17%;color: #fff;z-index: 1001;">'+
						  '<i class="weui-loading"></i>'+
						  '<span class="weui-loadmore__tips">'+msg+'..</span>'+
						'</div>';
	$("body").append(loading);
}


//浏览器关闭事件
var READYTOPROCESS = false;
window.onbeforeunload = function closeWindow(e){
    if (!READYTOPROCESS){
	   //清除token
	   alert(1);
       setCookie('token', uPsw, 30);
    }
}; 






