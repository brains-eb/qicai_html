$(function(){
	//关于我们
	$(".about_us").hover(function(){
		$(this).find('i').toggleClass('fa-rotate-180');
		$(this).find('.about_info').slideToggle();
	});
	
	//购物车
	$(".cart").bind('mouseover', function(){
		$(this).find('.fa').addClass('fa-rotate-180');
		$(this).find('.cart_list').fadeIn();
		
		if($('.mOrder').length < 1){
			$(".tEmpty").show();
		}
	});
	$(".cart").bind('mouseleave', function(){
		$(this).find('.fa').removeClass('fa-rotate-180');
		$(this).find('.cart_list').fadeOut();
	});
	
	//购买数量增加，减少
	$('.tMinus, .tPlus').click(function(){
		var now = Math.max(1, Number($(this).siblings('.tAmountVal').val()) + ($(this).is('.tMinus') ? -1 : 1));
		$(this).siblings('.tAmountVal').val(now);
		if(now > 1){
			$(this).parents('.tAmount').find('.tMinus').removeClass('tOff');
		}else{
			$(this).parents('.tAmount').find('.tMinus').addClass('tOff');
		};
	});
	
	//删除商品
	$(".tDel").click(function(){
		$(this).parents('.mOrder').remove();
	});
	
	//切换订单分类
	$(".left_tabs span").click(function(){
		var $this = $(this);
		var type = $this.data("type");
		$this.addClass("cur").siblings().removeClass("cur");
		if( type == 'all'){
			$(".pro_con .m-pro").show();
		}else{
			$(".pro_con .m-pro").each(function(){
				if($(this).data("value") == type){
					$(this).show();
				}else{
					$(this).hide();
				}
			});
		}
		
	});
	
	//列表头部的切换
	$(".tabs_box .left_tabs span").click(function(){
		$(this).addClass("cur").siblings().removeClass("cur")
	});
	
	//取消订单弹窗
	$(".w_cz a").click(function(){
		$(".mask").show();
		$(".pop_up").show();				
	});
	$(".select_con").click(function(){
		$(this).toggleClass("icon_down");
		$(this).next().toggle();
		$(".select_list span").click(function(){
			$(".select_con").text($(this).text());
			$(".select_list").hide();
			$(".select_con").removeClass("icon_down");
		});
	});
	$(".icon_close , .btn_cancle").click(function(){
		$(".pop_up").hide();
		$(".mask").hide();
	})
})
