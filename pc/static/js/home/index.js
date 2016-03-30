$(document).ready(function() {
	$('.bs-slide').bxSlider({
		controls:false,
		auto: 1,
		pause: 3000,
	});
	
	$('.bx-slide1').bxSlider({
		controls:false,
		auto: 1,
		pause: 3000,
	});
	$('.bx-slide2').bxSlider({
		controls:false,
		auto: 1,
		pause: 3000,
	});
	$('.bx-slide3').bxSlider({
		controls:false,
		auto: 1,
		pause: 3000,
	});
	$('.bx-slide4').bxSlider({
		controls:false,
		auto: 1,
		pause: 3000,
	});

	
	//判断复购清单
	if($('.rebuglist li').length < 1){
		$(".tempty").show();
	}
});


$(function(){
	//关于我们
	$(".about_us").hover(function(){
		$(this).find('i').toggleClass('fa-rotate-180');
		$(this).find('.about_info').slideToggle();
	});
	
	//购物车
	$(".cart").bind('mouseover', function(){
		$(this).find('.fa').addClass('fa-rotate-180');
		$(this).find('.cart_list').fadeIn();
		
		if($('.mOrder').length < 1){
			$(".tEmpty").show();
		}
	});
	$(".cart").bind('mouseleave', function(){
		$(this).find('.fa').removeClass('fa-rotate-180');
		$(this).find('.cart_list').fadeOut();
	});
	
	//购买数量增加，减少
	$('.tMinus, .tPlus').click(function(){
		var now = Math.max(1, Number($(this).siblings('.tAmountVal').val()) + ($(this).is('.tMinus') ? -1 : 1));
		$(this).siblings('.tAmountVal').val(now);
		if(now > 1){
			$(this).parents('.tAmount').find('.tMinus').removeClass('tOff');
		}else{
			$(this).parents('.tAmount').find('.tMinus').addClass('tOff');
		};
	});
	
	//删除商品
	$(".tDel").click(function(){
		$(this).parents('.mOrder').remove();
	});
		
	//复购清单
	$(".listbox").find('.fa').click(function(){
		$(this).toggleClass('fa-check');
	});
	
	//菜单列表
	$(".m-list").bind('mouseover', function(){
        var $p = $(this);
        var index = $p.index();
        var overHeight = 521 - 65 * parseInt(index);
		var popHeight = $p.find('.list-detail').outerHeight();
        if(popHeight > overHeight){
            $p.find('.list-detail').css('bottom','0');
        }else{
            $p.find('.list-detail').css('top',0);
        }
		$(this).find('.list-detail').show();
	});
	$(".m-list").bind('mouseleave', function(){
		$(this).find('.list-detail').hide();	
	});
	
	//办公设备菜单切换
	$(".equiptitles li").click(function(){
		var $this = $(this);
		$this.addClass('cur').siblings().removeClass('cur');
		$(".equipconts .m-equip").eq($this.index()).show().siblings().hide();
	});
	
})
