$(function(){ 

	$('.kvSlider').flexslider({
		animation: "slide",
		slideshow: true,
		directionNav: true,
		controlNav: true,
		animationLoop: true,
		prevText: '',
		nextText: ''
	});
	$('.os_slider').flexslider({
		animation: "slide",
		slideshow: true,
		directionNav: true,
		controlNav: true,
		animationLoop: true,
        minItems: 3,
        maxItems: 3,
        itemWidth: 192,
		prevText: '',
		nextText: ''
	});
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

