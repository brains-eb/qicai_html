/**
 * @Name:			index.js
 * @Introduction:	VW首页js
 * @Author：
 * @Time:			2015-07-04 10:30
 */

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
			
			$('.section1 .loadMore').click(function(){
				$('.newest li').addClass('show');
				$(this).hide();
			});
			
			$('.section2 .loadMore').click(function(){
				$('.latestevent li').addClass('show');
				$(this).hide();
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

