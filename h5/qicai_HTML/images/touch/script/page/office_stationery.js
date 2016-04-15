; (function ($) {

    $.index = $.index || {};
    $.index = {

        //初始化函数
        inits: function () {
            this.otherFun();
        },

        //小的交互效果
        otherFun: function () {
			$('.kvSlider').flexslider({
				animation: "slide",
				slideshow: true,
				directionNav: true,
				controlNav: true,
				animationLoop: true,
				prevText: '',
				nextText: ''
			});
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
		}

    };

    $.extend($.fn, $.index);

    //DOM载入就绪执行
    $(function () {
        //初始化
        $.index.inits();
    });

})(jQuery);

