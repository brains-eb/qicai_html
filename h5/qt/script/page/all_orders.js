$(function(){ 

	
	$('.search_box input').focus(function(){
		$(this).parent().addClass('focused');
	});
	$('.search_box').click(function(){
		$(this).addClass('focused');
		$(this).find("input").focus();
	});
	$('.search_box input').blur(function(){
		$(this).parent().removeClass('focused');
	});
	
	$('.full_height_white').css({height:$(window).height()-178});

	$('.category_tabs').css({height:$(window).height()-178});
}); 

