$(document).ready(function(){
    $('.bs-slide').bxSlider({
        pagerCustom: '#bx-pager',
        pause: 3000,
        infiniteLoop: false,
    });
    $(".bx-prev").addClass("bx-none");
});

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

	//轮播图左右按钮操作
	var len = $("#bx-pager a").length;
	$("#bx-pager").css("width",90*len);
	$(".bx-next").click(function(){
		$(".bx-prev").removeClass("bx-none");
		var index = $("#bx-pager .active").index();
		if(len <= 5){
			return false;
		}else if(index > 4){
			$("#bx-pager").css("left",-90*(index-4));
			if(index == len-1){
				$(this).addClass("bx-none");
			}
		}
	});
	$(".bx-prev").click(function(){
		$(".bx-next").removeClass("bx-none");
		var index = $("#bx-pager .active").index();
		var num = parseInt($("#bx-pager").css("left"))/-90;
		if(num > index){
			$("#bx-pager").css("left",-90*(num-1));			
			
		}
		if(index == 0){
			$(this).addClass("bx-none");
		}
	})
	$("#bx-pager a").click(function(){
		if($(this).index() == 0){
			$(".bx-prev").addClass("bx-none");
			$(".bx-next").removeClass("bx-none");
		}else if($(this).index() == len-1){
			$(".bx-next").addClass("bx-none");
			$(".bx-prev").removeClass("bx-none");
		}else{
			$(".bx-next,.bx-prev").removeClass("bx-none");
		}
	});		
})
