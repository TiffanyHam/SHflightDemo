/*
*
* 弹窗
*
*/

//托运须知
function termSheet() {
	
	var str = "<div style='text-align:left;'>1、深航货物运输遵守《中华人民共和国民用航空法》、《中国民用航空国内货物运输规则》的有关规定。<br/>"+
			  "2、托运人应如实申报具体品名，并保证不在货物包装内夹带危险品、政府禁止和限制运输的物品、贵重物品、保密文件和资料等。<br/>"+
			  "3、托运人应该按航空运输要求妥善包装货物。<br/>"+
			  "4、托运人托运的货物没有办理声明价值的，货物在运输过程中发生破损、短少、丢失时，承运人按照实际损失的价值进行赔偿，但赔偿最高限额为毛重每公斤人民币100元。</div>";
	
	$.alert({
	  title: '<span style="color:#333;">《托运须知》</span>',
	  text: str,
	  onOK: function () {
		//点击确认
	  }
	});
}

//储运注意事项
function announcements() {
	$.modal({
	  autoClose : false,
	  title: '储运注意事项',
	  textarea: '',
	  text: '<textarea style="width:96%;height:100px;padding:5px;" placeholder="点击此处编辑" id="attentionTxt"></textarea>',
	  buttons: [
		{ text: "取消", className: "default", onClick: function(){ $.closeModal(); } },
		{ text: "确定", className: "primary", onClick : function(textarea)
			{
				debugger
				//添加进本地存储
				var val = $("#attentionTxt").val();
				updateSendJson("attention", val);
				$("#attention").text($("#attentionTxt").val());
				$.closeModal();
				
			} 
		}
	  ]
	});

}


//预存信息
function saveSend() {
	//$.alert("保存成功！");
	$.alert({
	  title: '',
	  text: '<i class="weui-icon-success"></i> 保存成功！',
	  onOK: function () {
		//点击确认
	  }
	});
}


//立即提交
function confirmSend() {
	//如果参数过多，建议通过 object 方式传入
	$.confirm({
	  title: '<i class="weui-icon-info"></i> 确定提交本订单？',
	  text: '',
	  onOK: function () {
		
		//loading
		loading("提交中");
		
		
		//提交
		$.ajax({
			type: "POST",
			url: '',
			dataType: "json",
			data: {
				'data': sendJson,
				'token': token,
				'submitType': '1', //0（预存信息），1（立即提交），2（撤销托运书），3（保存修改)
				'sign': sign
			},
			success: function(data) {
				
				var result = JSON.parse(data);
				if(result.retCode == 100) {
					
					//清空sender存储数组
					for(var key in sendJson) {
						delete sendJson[key];
					}
					saveStorage("sendJson", sendJson);
					
					//关闭加载
					closeLoading();
					$.toast("提交成功");
					
				} else {
					$.alert(result.msg);
				}
			},
			error: function() {
				$.alert("请求失败！");
			}
		})
		
	  },
	  onCancel: function () {
	  }
	});
}



/*
* 初始化电子托运书数据
* 目的站：destination
* 托运人信息: sender
* 收货人信息：consignee
* 货物信息：cargoInfo
* 存储注意事项：attention
* 运输类型：transport
* 提货方式：pick_up
* 付款方式：pay_way
*/
function init() {	
	//获取sendJson
	sendJson = getStorage("sendJson");
	var sendJsonObj = toJsonObj(sendJson);
	
	
	for (var i in sendJsonObj) {
		if (i == "destination") {
			//目的站
			$("#destination").text(_destination);
		} else if (i == "sender") {
			//拖运人信息
			var _sender = sendJsonObj.sender;
			for (var i in _sender) {
				if (_sender[i].key == "name") {
					$("#sender").text(_sender[i].value);
					break;
				}	
			}
			
		} else if (i == "consignee") {
			//收货人信息
			var _consignee = sendJsonObj.consignee;
			for (var i in _sender) {
				if (_consignee[i].key == "name") {
					$("#consignee").text(_consignee[i].value);
					break;
				}	
			}
			
		} else if (i == "cargoInfo") {
			//货物信息
			var _cargoInfo = sendJsonObj.cargoInfo;
			var str = "";
			for (var i in _cargoInfo) {
				if (_cargoInfo[i].key == 'num') {
					
					str += _cargoInfo[i].value + "件 | ";
					
				} else if (_cargoInfo[i].key == 'goodsH') {
					
					str += _cargoInfo[i].value + "KG | ";
					
				} else if (_cargoInfo[i].key == 'packSelect') {
					
					str += "包装："+_cargoInfo[i].value + " | ";
					
				} else if (_cargoInfo[i].key == 'count') {
					
					_cargoInfo[i].value == "" ? str += "运输声明价值：无 | " : str += "运输声明价值："+_cargoInfo[i].value +" | ";
					
				} else if (_cargoInfo[i].key == 'weuiAgree') {
					
					_cargoInfo[i].value == "0" ? str += "是否投保：否" : str += "是否投保：是";
					
				} else {
					str += _cargoInfo[i].value + " | ";
				}
				
			}
			$("#cargoInfo").text(str);
			
		} else if (i == "attention") {
			//存储注意事项
			var _attention = sendJsonObj.attention;
			$("#attention").text(_attention);
			
		} else if (i == "transport") {
			//运输类型
			var _transport = sendJsonObj.transport;
			$("#transport-picker").val(_transport);
			
		} else if (i == "pick_up") {
			//提货方式
			var _transport = sendJsonObj.pick_up;
			$("#pick_up-picker").val(_transport);
			
		} else if (i == "pay_way") {
			//付款方式
			var _transport = sendJsonObj.pay_way;
			$("#pay_way-picker").val(_transport);
		}
		
	}
	
	/*
	
	//目的站
	var _destination = getStorage("destination");
	if (_destination != null && _destination != false) {
		$("#destination").text(_destination);
	} else if (_destination == false) {
		
	}
	
	
	//拖运人信息
	var _sender = getStorage("sender");
	if (_destination != null && _destination != false) {
		_sender = JSON.parse(_sender); //字符串转对象
		for (var i in _sender) {
			if (_sender[i].key == "name") {
				$("#sender").text(_sender[i].value);
			}	
		}
		
	} else if (_destination == false) {
		
	}
	
	//收货人信息
	var _consignee = getStorage("consignee");
	if (_consignee != null && _consignee != false) {
		_consignee = JSON.parse(_consignee); //字符串转对象
		for (var i in _consignee) {
			if (_consignee[i].key == "name") {
				$("#consignee").text(_consignee[i].value);
			}	
		}
		
	} else if (_consignee == false) {
		
	}
	
	//货物信息
	var _cargoInfo = getStorage("cargoInfo");
	if (_cargoInfo != null && _cargoInfo != false) {
		_cargoInfo = JSON.parse(_cargoInfo); //字符串转对象
		var str = "";
		for (var i in _cargoInfo) {
			if (_cargoInfo[i].key == 'num') {
				
				str += _cargoInfo[i].value + "件 | ";
				
			} else if (_cargoInfo[i].key == 'goodsH') {
				
				str += _cargoInfo[i].value + "KG | ";
				
			} else if (_cargoInfo[i].key == 'packSelect') {
				
				str += "包装："+_cargoInfo[i].value + " | ";
				
			} else if (_cargoInfo[i].key == 'count') {
				
				_cargoInfo[i].value == "" ? str += "运输声明价值：无 | " : str += "运输声明价值："+_cargoInfo[i].value +" | ";
				
			} else if (_cargoInfo[i].key == 'weuiAgree') {
				
				_cargoInfo[i].value == "0" ? str += "是否投保：否" : str += "是否投保：是";
				
			} else {
				str += _cargoInfo[i].value + " | ";
			}
			
		}
		$("#cargoInfo").text(str);	
		
	} else if (_consignee == false) {
		
	}
	
	//存储注意事项
	var _attention = getStorage("attention");
	if (_attention != null && _attention != false) {
		$("#attention").text(_attention);
	} else if (_attention == false) {
		
	}
	
	//运输类型
	var _transport = getStorage("transport");
	if (_transport != null && _transport != false) {
		$("#transport-picker").val(_transport);
	} else if (_transport == false) {
		
	}
	
	//提货方式
	var _transport = getStorage("pick_up");
	if (_transport != null && _transport != false) {
		$("#pick_up-picker").val(_transport);
	} else if (_transport == false) {
		
	}
	
	//付款方式
	var _transport = getStorage("pay_way");
	if (_transport != null && _transport != false) {
		$("#pay_way-picker").val(_transport);
	} else if (_transport == false) {
		
	}
	*/
	
}

//运输类型、提货方式、付款方式 下拉数据填充
function setPickerList(id, value, name) {
	$("#"+id).picker({
	  title: "",
	  cols: [
		{
		  textAlign: 'center',
		  values: value //['非限时运输', '指定航班']
		}
		],
	  onChange: function (result) {
			console.log(result.displayValue);
			//添加进 本地
			var isCall = saveStorage(name, result.displayValue);
			if (isCall == false) {
				
			}
		} 
	});
	
}

//初始化数据获取
function getInitData() {
	
	$.ajax({
		type: "POST",
		url: '',
		dataType: "json",
		data: {
			'token': token
		},
		success: function(data) {
			
			var result = JSON.parse(data);
			if(result.retCode == 100) {
				
				
				//运输类型
				setPickerList('transport-picker', transportVal, 'transport');
				/*
				$("#transport-picker").picker({
				  title: "",
				  cols: [
					{
					  textAlign: 'center',
					  values: ['非限时运输', '指定航班']
					}
					],
				  onChange: function (result) {
						console.log(result.displayValue);
						//添加进 本地
						var isCall = saveStorage("transport", result.displayValue);
						if (isCall == false) {
							
						}
					} 
				});
				*/

				//提货方式
				setPickerList('pick_up-picker', pickUpVal, 'pick_up');
				/*$("#pick_up-picker").picker({
				  title: "",
				  cols: [
					{
					  textAlign: 'center',
					  values: ['市内自提', '机场自提', '送货上门']
					}
				  ],
				  onChange: function (result) {
						console.log(result.displayValue);
						//添加进 本地
						var isCall = saveStorage("pick_up", result.displayValue);
						if (isCall == false) {
							
						}
					} 
				});*/

				//付款方式
				setPickerList('pay_way-picker', payWayVal, 'pay_way');
				/*$("#pay_way-picker").picker({
				  title: "",
				  cols: [
					{
					  textAlign: 'center',
					  values: ['到付','预付','现金','支票']
					}
				  ],
				  onChange: function (result) {
						console.log(result.displayValue);
						//添加进 本地
						var isCall = saveStorage("pay_way", result.displayValue);
						if (isCall == false) {
							
						}
					}
				});*/
				
				
				//目的站城市列表
				var destCities = data.result.destCities;
				saveStorage("destCities", destCities);
				
				
			} else {
				$.alert(result.msg);
			}
		},
		error: function() {
			$.alert("请求失败！");
		}
	});
	
}

//更新sendJson
function updateSendJson(name, value) {
	/* sendJson格式定义
	var sendJson = {
		"consignee":[
			{"name": "001"},
			{"phone": "15111111111"},
			{"postcode": "03511"}
		],
		"sender":[
			{"name": "001"},
			{"phone": "15111111111"},
			{"postcode": "03511"}
		]
	};*/
	
	//转换成json对象
	var sendJsonObj = toJsonObj(sendJson);
	if (sendJsonObj == null) {
		sendJsonObj = {};
	}
	//更新属性值
	sendJsonObj[""+name] = value;
	//转换成json字符串
	var sendJsonStr = toJsonString(sendJsonObj);
	//本地存储
	saveStorage("sendJson", sendJsonStr);
}

/*
* 定义全局变量
*/
var sendJson = {}, //我要寄件数据列表 (本地信息存储)
	userInfo = {}, //用户信息 (初始化数据，不能清空)
	cityList = {}, //城市数据 (初始化数据，不能清空)
	singleNum = null, //流水单号
	token = getStorage("token"); //token
	
	
$(function() {

	//页面高度
	var d = document.documentElement.clientHeight;
	$("#sendContent").css({"height":""+(d-58-46)+"px", "overflow":"auto", "position":"relative", "top":"0px"});
	
	//初始化
	init();
	
	//请求初始化数据
	//getInitData();

})

