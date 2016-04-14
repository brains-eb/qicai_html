
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
	
	//筛选条件更多展示
	$(".filters dl dd").find(".more").click(function(){
		$(this).toggleClass("cut");
		$(this).parent().toggleClass("ht");
	})
	
	//排序
	$(".sequence .left_box span").click(function(){
		if($(this).hasClass("cur")){
			$(this).find(".ico_up").toggleClass("ico_down")
		}
		else{
			$(this).addClass("cur").siblings().removeClass("cur")
		}
	})
	
	//产品列表收藏功能
	$(".products li .ico_collect2").click(function(){
		$(this).toggleClass("keep")
	})
		
})
