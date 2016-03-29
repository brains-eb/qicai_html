$(document).ready(function() {
	$('.bs-slide').bxSlider({
		controls:false,
		auto: 1,
		pause: 3000,
	});
	
	$('.bx-slide').bxSlider({
		controls:false,
		auto: 1,
		pause: 3000,
	});
});


$(function(){
	//关于我们
	$(".about_us").hover(function(){
		$(this).find('i').toggleClass('fa-rotate-180');
		$(this).find('.about_info').slideToggle();
	})
	
	//购物车
	$(".cart").hover(function(){
		$(this).find('.fa').toggleClass('fa-rotate-180');
		$(this).find('.cart_list').fadeToggle();
	})
})
