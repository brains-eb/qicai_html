$(function(){ 

	$('.prodImgSlider').flexslider({
		animation: "slide",
		slideshow: true,
		directionNav: true,
		controlNav: true,
		animationLoop: true,
		prevText: '',
		nextText: ''
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

	$('.colors li, .model li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	});
}); 

