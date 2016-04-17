$(function(){ 
	//top search
	$('.top_search_box .keywords span i').click(function(){
		$(this).parent().hide();
	});
	
	//sort 
	$('.sort_by li').click(function(){
		if($(this).hasClass("active")){
			$(this).find("em").toggleClass("desend")
		}
		else{
			$(this).addClass("active").siblings().removeClass("active");
		}
	});

	//filter 
	$('.filter li').click(function(){
		if($(this).hasClass("active")){
			$(this).removeClass("active");
			$('.sec_category_header').css("paddingBottom","0");
		}
		else{
			$(this).addClass("active").siblings().removeClass("active");
			$('.sec_category_header').css("paddingBottom","130px");
		}
	});

}); 