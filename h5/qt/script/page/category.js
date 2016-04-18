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
	
}); 

