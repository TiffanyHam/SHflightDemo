//校验用户名、密码、验证码格式
function verifyFun(name, psw, vCode) {
	//用户名正则，4到16位（字母，数字，下划线）
	var uPattern = /^[a-zA-Z0-9_]{4,16}$/;
	var uCode = /^[0-9a-zA-Z]+$/;
	
	var _name = uPattern.test(name);
	var _psw = uPattern.test(psw);
	var _vCode = uCode.test(vCode);
	
	if (_name == true && _psw == true && _vCode == true) {
		return true;
	} else if (_name != true || _psw != true) {
		return "用户名或密码错误";
	} else if (_vCode != true) {
		return "验证码错误";
	}
}

//选择 记住用户名 、 密码
function rememberUser(obj) {
	/*var name = id;
	if ($(obj).is(':checked')) {
		var value = $("#"+id).val();
		setCookie(name, value, 30);
	} else {
		removeCookie(name);
		//$(obj).attr("checked", false);
	}*/
	
	
	if ($(obj).is(':checked')) {
		var uName = $("#username").val();
		var uPsw = $("#password").val();
		setCookie('username', uName, 30);
		setCookie('password', uPsw, 30);
	} else {
		removeCookie('password');
	}
}



function init() {

	//获取 用户名 、 密码
	var uName = getCookie('username');
	if (uName != null && uName != '') {
		$("#username").val(uName);
		//$("#remUName").prop("checked", "checked");
	} else {
		$("#username").val("");
	}
	
	var uPsw = getCookie('password');
	if (uPsw != null && uPsw != '') {
		$("#password").val(uPsw);
		//$("#password").prop("checked", "checked");
	} else {
		$("#password").val("");
	}
	

}

//登录
$('#loginBtn').bind('click', function() {
	
	var uName = $("#username").val(),
		uPsw = $("#password").val(),
		uVerification = $("#verification").val();
	
	if( uName == "" || uPsw == "") {
		$.alert('<i class="weui-icon-warn"></i> 账号或密码不能为空');
		return false;
	} else if (uVerification == "") {
		$.alert('<i class="weui-icon-warn"></i> 验证码不能为空');
		return false;
	} else {
		
		//用户名、密码格式验证
		var isVer = verifyFun(uName, uPsw, uVerification);
		if (isVer != true) {
			$.alert('<i class="weui-icon-warn"></i> '+isVer);
			return false;
		}
		
		//显示加载中
		loading('登录中');
		
		//记住新用户名、密码
		$(".login_form input[type='checkbox']").each(function() {
			if ($(this).attr("name") == 'uname' && $(this).is(':checked')) {
				var value = $("#username").val();
				setCookie("username", value, 30);
			} else if ($(this).attr("name") == 'password' && $(this).is(':checked')) {
				var value = $("#remPSW").val();
				setCookie("remPSW", value, 30);
			}
		})
		
		
		//加密成md5
		var hash_psw = hex_md5(uPsw),
			hash_name = hex_md5(uName),
			hash_vCode = hex_md5(uVerification);
			
		var sign = hash_psw + "" + hash_name + "" + hash_vCode;
		location.href = 'send/send.html';

		//前端初步判断数据类型成功以后向后台发出请求来判断登陆是否成功
		/*$.ajax({
			//url: "js/data.json", //这里的data.json 是我模拟的一个json文件名。url放的是当前页面请求的后台地址。
			//data: $('#ajaxForm').serialize(),
			type: "POST",
			url: '',
			dataType: "json",
			data: {
				'userName': uName,
				'passwd': uPsw,
				'validateCode': hash_vCode,
				'sign': sign
			},
			success: function(data) {
				
				var result = JSON.parse(data);
				if(result.retCode == 100) {
					//存储token、托运单流水号
					setCookie('token', token, 30);
					closeLoading();
					
					location.href = 'send/send.html';
				} else {
					$.alert(result.msg);
				}
			},
			error: function() {
				$.alert("请求失败！");
			}
		});*/
	}

});

init();

