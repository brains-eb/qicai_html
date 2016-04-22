$(function(){ 
	$('.shop_bar i').click(function(){
		$(this).toggleClass('active');
		if($(this).hasClass('active')) {
			$(this).parent().parent().find('em').addClass('active');
		} else {
			$(this).parent().parent().find('em').removeClass('active');
		}
	});
	$('.cart_list em').click(function(){
		$(this).toggleClass('active');
	});
	$('.select_all').click(function(){
		if($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('.cart_list i, .cart_list em').removeClass('active');
		} else {
			$(this).addClass('active');
			$('.cart_list i, .cart_list em').addClass('active');
		}
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
}); 

