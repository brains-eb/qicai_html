/**
 * @Name:			common.js
 * @Introduction:	common js
 * @Author：
 * @Time:			2015-07-04 10:30
 */

; (function ($) {
	
	function fixDiv() {
    var $cache = $('#getFixed');
    if ($(window).scrollTop() > 74)
      $cache.css({
        'position': 'fixed',
        'top': '0px'
      });
    else
      $cache.css({
        'position': 'relative',
        'top': 'auto'
      });
  }
	  $(window).scroll(fixDiv);
	  fixDiv();
	  
	//nav
	$('.navBars em').click(function(){
		$(this).parent().addClass('active');
		$('.navPanel').fadeIn();
		$('body').css({'position': 'fixed'});
	});
	$('.navBars i').click(function(){
		$(this).parent().removeClass('active');
		$('.navPanel').fadeOut();
		$('body').removeAttr('style');
	});
	
	$("#nav li").click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('.secondNav').fadeIn();
		var currentMenuNo = parseInt(this.id.substring(1));
		$(".secondNav div").each(function(){
			$(this).hide();
			$("#secondNav"+currentMenuNo).fadeIn();
		});
	});
	$('#nav li#n4').click(function(){
		$('.secondNav').fadeOut();
	})
	
	$('.searchbox').focus(function(){
		$('.secondNav').fadeOut();
	});
	
	//tabs
	$("#tabs li").bind("click", function () {
		var index = $(this).index();
		var divs = $("#tabs-body > div");
		$(this).parent().children("li").attr("class", "tab-nav");//将所有选项置为未选中
		$(this).attr("class", "tab-nav-action"); //设置当前选中项为选中样式
		divs.hide();//隐藏所有选中项内容
		divs.eq(index).show(); //显示选中项对应内容
	});
	//checkbox
	$('span.checkbox').click(function(){
		$(this).toggleClass('checked');
	})
	//footer nav 
	$('.footerNav li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	});

	//category tabs
	$('.cate_tabs li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	});

})(jQuery);

