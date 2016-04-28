$(function(){ 
	$(".bindnav li").click(function(){
		var $this = $(this);
		$this.addClass("cur").siblings().removeClass("cur");
		$(".bindcont .m-cont").eq($this.index()).removeClass("fn-hide").siblings().addClass("fn-hide");
	});
	
	$(".checkbox").click(function(){
		$(this).toggleClass("checked");
	});
	
	$("#submit").click(function(){
		$("#pop").show();
	});
	
	$(".close").click(function(){
		$("#pop").hide();
	});
}); 

