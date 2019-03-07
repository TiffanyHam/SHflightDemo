$(document).ready(function() {
	//绑定元素点击事件
	$(".menu_list ul li").click(function() {
		$(".fuMenu").css({
			'color': '#000'
		});
		$(".xiala").attr({
			'src': '../images/slow_gray.png'
		});
		//判断对象是显示还是隐藏
		if($(this).children(".div1").is(":hidden")) {

			$(".weui-mask").show();
			//表示隐藏
			if(!$(this).children(".div1").is(":animated")) {
				$(this).children(".fuMenu").css({
					'color': '#2593b8'
				});
				$(this).children(".fuMenu").find(".xiala").attr({
					'src': '../images/slow_blue.png'
				});
				//如果当前没有进行动画，则添加新动画
				$(this).children(".div1").animate({
						height: 'show'
					}, 100)
					//siblings遍历div1的元素
					.end().siblings().find(".div1").hide(100);
			}
		} else {
			$(".weui-mask").hide();
			//表示显示
			if(!$(this).children(".div1").is(":animated")) {
				$(this).children(".fuMenu").css({
					'color': '#000'
				});
				$(this).children(".fuMenu").find(".xiala").attr({
					'src': '../images/slow_gray.png'
				});
				$(this).children(".div1").animate({
						height: 'hide'
					}, 100)
					.end().siblings().find(".div1").hide(100);
			}
		}
	});

	//阻止事件冒泡，子元素不再继承父元素的点击事件
	$('.div1').click(function(e) {
		e.stopPropagation();
	});

	//弹出层隐藏
	$('.weui-mask').click(function(e) {
		$(this).children(".div1").animate({
				height: 'hide'
			}, 50)
			.end().siblings().find(".div1").hide();
		$(".weui-mask").hide();
		$(".fuMenu").css({
			'color': '#000'
		});
		$(".xiala").attr({
			'src': '../images/slow_gray.png'
		});
	});
	
	
	//点击子菜单为子菜单添加样式，并移除所有其他子菜单样式
	$(".menu_list ul li .div1 .zcd").click(function() {
		//设置当前菜单为选中状态的样式，并移除同类同级别的其他元素的样式
		$(this).addClass("removes").siblings().removeClass("removes");
		//遍历获取所有父菜单元素
		$(".div1").each(function() {
			//判断当前的父菜单是否是隐藏状态
			if($(this).is(":hidden")) {
				//如果是隐藏状态则移除其样式
				$(this).children(".zcd").removeClass("removes");
			}
		});
	});
});