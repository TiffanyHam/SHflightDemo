/*
* 判断终端设备类型
*/
function IsPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
	var flag = "";
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = Agents[v];
			break;
		}
	}

	//console.log(flag);
	if (flag != "" && (flag == "Android" || flag == "iPhone" || flag == "SymbianOS" || flag == "Windows Phone")) {
		//手机
		//alert("手机");
		
	} else if (flag != "" && (flag == "iPad" || flag == "iPod")) {
		//ipad
		//alert("ipad");
		//window.location.href = "http://www.baidu.com";
	} else {
		//PC
		//alert("电脑");
		//window.location.href = "http://www.baidu.com";
	}
}

IsPC();