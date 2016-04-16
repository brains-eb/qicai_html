$(function(){ 
			
	$('.cate_tabs_slider').flexslider({
		animation: "slide",
		slideshow: true,
		directionNav: false,
		controlNav: false,
		animationLoop: true,
	    minItems: 5,
	    maxItems: 5,
	    itemWidth: 128,
	    move: 1,
		prevText: '',
		nextText: ''
	});

	$('.sp_slider li').click(function(){
		$(this).toggleClass('active');
	});

	$('.sp_s1').flexslider({
		animation: "slide",
		slideshow: true,
		directionNav: true,
		controlNav: false,
		animationLoop: true,
	    minItems: 3,
	    maxItems: 3,
	    itemWidth: 194,
	    move: 1,
		prevText: '',
		nextText: ''
	});

	$('.sp_s2').flexslider({
		animation: "slide",
		slideshow: true,
		directionNav: true,
		controlNav: false,
		animationLoop: true,
	    minItems: 3,
	    maxItems: 3,
	    itemWidth: 194,
	    move: 1,
		prevText: '',
		nextText: ''
	});

	$('.sp_s3').flexslider({
		animation: "slide",
		slideshow: true,
		directionNav: true,
		controlNav: false,
		animationLoop: true,
	    minItems: 3,
	    maxItems: 3,
	    itemWidth: 194,
	    move: 1,
		prevText: '',
		nextText: ''
	});
	
}); 