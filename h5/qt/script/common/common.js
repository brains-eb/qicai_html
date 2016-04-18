$(function(){ 

	//footer nav 
	$('.footerNav li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	});

	//category tabs
	$('.cate_tabs li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
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

	
}); 

