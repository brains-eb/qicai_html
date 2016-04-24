$(function(){ 
	$('.invoice_section ul li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	});
}); 

