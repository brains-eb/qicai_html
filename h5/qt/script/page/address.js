$(function(){ 
	$('.address li .add_bl').click(function(){
		$(this).parent().parent().addClass('active').siblings().removeClass('active');
	});
}); 

