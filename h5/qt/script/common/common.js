$(function(){ 

	//footer nav 
	$('.footerNav li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	});

	//category tabs
	$('.cate_tabs li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	});

	
}); 

