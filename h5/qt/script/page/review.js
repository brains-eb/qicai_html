$(function(){ 

	$('.stars li').click(function(){
		$(this).nextAll().removeClass('active');
		$(this).prevAll().andSelf().addClass('active');				
	});

	$('.r3 i').click(function(){
		$(this).parent().find('input').click();
	});

	$('.r4 .anno').click(function(){
		$(this).toggleClass('active');
	});
}); 

