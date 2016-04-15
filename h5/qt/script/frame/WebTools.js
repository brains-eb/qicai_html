(function(window){ 
	var WT = window.WT = function(selector,parameter){
        return new WT.fn.init(selector,parameter);
    };
	WT.fn=WT.prototype={
        init:function(selector,parameter){
			this.el=selector;
            return this;
        },
		//input光标居中
		inputCenter:function(){
			return false;
			$(this.el).each(function(index, element) {
				var el=$(this).get(0);
				if(!el.parameter){el.parameter={}};
				el.parameter.height=el.offsetHeight;
				var padding=el.parameter.height/5;
				el.style.paddingTop=padding+"px";
				el.style.lineHeight=el.parameter.height-padding;
			});
		},
		//input--placeholder效果
		placeholder:function(){
			$(this.el).each(function(index, element) {
				var el=$(this).get(0);
				if(!el.parameter){el.parameter={}};
                el.parameter.value=el.value;
				el.parameter.color=el.style.color||"#000";
				$(this).css({"color":"#999999"});
				el.onmousedown=function(){
					if(this.value==this.parameter.value){
						this.value="";
						this.style.color=this.parameter.color;
					}
				}
				el.onblur=function(){
					if(this.value==""||this.value==this.parameter.value){
						this.value=this.parameter.value;
						this.style.color="#999999";
					}else{
						this.style.color=this.parameter.color;
					}
				}
            });
		},
		//图片列表左右切换效果
		//class="imagesList" data-base="{auto:false,spacing:20,arrow:['.left','.right']}"
		imagesListSpeed:function(){
			$(this.el).each(function(index, element) {
				new ImagesListAnimation($(this).get(0),$(this).get(0).getAttribute("data-base"));
			});
		},
		//加载图片(images)
		//class="xx"
		loadingImages:function(callback){
			new loadingAll(this.el,{COMPLETE:callback});
		},
		//class="xx" data-base={round:['.bannerNav','cur','det'],arrow:['.prev','.next'],width:980}
		//单张图片切换效果
		imagesSpeed:function(){
			$(this.el).each(function(index, element) {
				new ImagesAnimation($(this).get(0),$(this).get(0).getAttribute("data-base"));
			});
		},
		
		//视频列表
		videoList:function(){
			$(this.el).each(function(index, element) {
				var _dataBase=$(this).get(0).getAttribute("data-base");
				var _par=eval("("+_dataBase+")");
				var _show=_$.checkObj(_par,"show")?_par.show:false;
				if(_show){show($(this),$(this).index(),_dataBase);}
				$(this).click(function(){
					show($(this),$(this).index(),$(this).get(0).getAttribute("data-base"));
				});
			});
			
			function show(obj,index,par){
				obj.siblings().removeClass("cur");
				obj.addClass("cur")
				var _par=eval("("+par+")")
				var content=_$.checkObj(_par,"content")?_par.content:null;
				var img=_$.checkObj(_par,"bgImg")?_par.bgImg:"";
				$(content).find("img").attr("src",img);
				$(content).find("div").html("");
				new creatVideo($(content).find("div").get(0),par);
			}
		},
		//视频播放
		// class="videoInfo"  data-base="{flv:'mov_bbb_clip.flv',mp4:'video/mov_bbb.mp4',tips:true,width:640}" onclick="this.data.show();"
		video:function(){
			$(this.el).each(function(index, element) {
				var par=eval("("+$(this).get(0).getAttribute("data-base")+")");
				var _tips=_$.checkObj(par,"tips")?par.tips:false;
				if(!_tips){
					$(this).get(0).data=new creatVideo($(this).get(0),$(this).get(0).getAttribute("data-base"));
				}else{
					$(this).click(function(){
						$(this).get(0).data=new creatVideo($(this).get(0),$(this).get(0).getAttribute("data-base"));
					});
				}
			});
		},
		popup:function(){
			$(this.el).each(function(index, element) {
				$(this).get(0).data=new creatPopup($(this).get(0));
				$(this).click(function(){
					$(this).get(0).data.add();	
				});
			});
		}
    };
	WT.fn.init.prototype = WT.fn;
})(window)
//===============================================================框架=======================================================
function replaceHTML(){}
replaceHTML.prototype = {
	run:function(){this.searchWeb();},
	showLbiFile:function(obj,url){
		new loadAjax(obj,url);
	},
	searchWeb:function(){
		var self=this;
		$("[data-lbifile]").each(function(index, element) {
            self.showLbiFile($(this),$(this).attr("data-lbifile"));
        });
	}
}
function loadAjax(obj,url){
	$.get(url,function(data,status,xhr){
		obj.replaceWith(data);
	})
}
new replaceHTML().run();
//===============================================================touch======================================================
function touch(){
	 this._angle="";
}
touch.prototype={
	run: function() {
		if (this.isTouch) {
			this.bindEvent();
		}
	},
	testTouch:function(e){
		if (e.type == 'touchstart') {
			this.touch = true;
		} else if (this.touch) {
			this.touch = false;
			return false;
		}
		return true;
	},
	getCoord:function(e,c){
		 return /touch/.test(e.type) ? (e.originalEvent || e).changedTouches[0]['page' + c] : e['page' + c];
	},
	bindEvent:function(){
		var touch,action,diffX,diffY,endX,endY,scroll,sort,startX,startY,swipe,sortTimer;
		var self = this;
		this.$element.on('touchstart', onStart);
		this.$element.on('touchmove', onMove);
		this.$element.on('touchend touchcancel', onEnd);
		function onStart(ev){
			if (self.testTouch(ev) && !action) {
				action = true;
				startX = self.getCoord(ev, 'X');
				startY = self.getCoord(ev, 'Y');
				diffX = 0;
				diffY = 0;
				sortTimer = setTimeout(function () {
					sort = true;
				}, 200);
				self.touchStart();
			}
		}
		function onMove(ev){
			if (action) {
				endX = self.getCoord(ev, 'X');
				endY = self.getCoord(ev, 'Y');
				diffX = endX - startX;
				diffY = endY - startY;
		 		
				if (!sort && !swipe && !scroll) {
					if (Math.abs(diffY) > 10) { // It's a scroll
						scroll = true;
						// Android 4.0 will not fire touchend event
						$(this).trigger('touchend');
					} else if (Math.abs(diffX) > 7) { // It's a swipe
						swipe = true;
					}
				}
				if (swipe) {
					ev.preventDefault(); // Kill page scroll
				}
				if (sort) {
					ev.preventDefault(); // Kill page scroll
				}
				if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
					clearTimeout(sortTimer);
				}
			}
		}
		function onEnd(ev){
			if (action) {
				action = false;		 
				if (swipe) {
				} else if (sort) {
				} else if (!scroll && Math.abs(diffX) > 5 && Math.abs(diffY) > 5) { // Tap
					if (ev.type === 'touchend') { // Prevent phantom clicks
						ev.preventDefault();
					}
				}
				swipe = false;
				sort = false;
				scroll = false;
				clearTimeout(sortTimer);
				
				var x=Math.abs(startX-endX);
				var y=Math.abs(startY-endY);
				if(x>y||self._angle=="all"){
					if(startX>endX){
						self.touchMoveLeft();
					}else if(startX<endX){
						self.touchMoveRight();
					}
				}else if(x<y||self._angle=="all"){
					if(startY>endY){
						self.touchMoveDown();
					}else if(startY<endY){
						self.touchMoveUp();
					}
				}
				self.touchEnd();
			}
		}
	},
	isTouch: (("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch),
	bindTouch: function(options) {
		var option = $.extend({
			$element:$("body"),
			angle:null,
			touchMoveRight: function(){},
			touchMoveLeft: function(){},
			touchStart:function(){},
			touchEnd:function(){},
			touchMoveDown:function(){},
			touchMoveUp:function(){}
		},options);
		this.$element = option.$element;
		this._angle=option.angle;
		this.touchMoveRight = option.touchMoveRight;
		this.touchMoveLeft = option.touchMoveLeft;
		this.touchStart=option.touchStart;
		this.touchEnd=option.touchEnd;
		this.touchMoveDown=option.touchMoveDown;
		this.touchMoveUp=option.touchMoveUp;
		this.run();
	}
}
//================================================================创建视频====================================================
function creatVideo(obj,parameter){
	this._el=obj;
	var parameter=eval("("+parameter+")")||eval("("+this._el.getAttribute("data-base")+")");
	this._img=_$.checkObj(parameter,"img")?parameter.img:"";
	this._videoIcon=_$.checkObj(parameter,"videoIcon")?parameter.videoIcon:"images/play_03.png";
	this._flv=_$.checkObj(parameter,"flv")?parameter.flv:"";
	this._mp4=_$.checkObj(parameter,"mp4")?parameter.mp4:"";
	this._swfUrl=_$.checkObj(parameter,"swf")?parameter.swf:"video/video.swf";
	this._tips=_$.checkObj(parameter,"tips")?parameter.tips:false;
	this._width=_$.checkObj(parameter,"width")?parameter.width:this._el.offsetWidth;
	this._height=_$.checkObj(parameter,"height")?parameter.height:this._width*3/4;
	this._type=_$.checkObj(parameter,"type")?parameter.type:null;
	 this._html5_video='<video width="100%" height="100%" controls="controls" style="position:relative; z-index:1; 显示" 自动> <source src="'+this._mp4+'" type="video/mp4" /></video>';
	this._flv_video='<embed wmode="transparent" flashvars="url='+this._flv+'&amp;img='+this._img+'&amp;autoplay='+this._isAutoPlay+'&width='+this._width+'&height='+this._height+'" src='+this._swfUrl+' quality="high" name="video"  width="100%" height="100%" align="middle" allowscriptaccess="always" allowfullscreen="true" type="application/x-shockwave-flash" pluginspage="http://get.adobe.com/cn/flashplayer/"></embed>';
	this._videoTips=null;
	this._videoTipsClose=null;
	this.show();
}
creatVideo.prototype={
	show:function(){
		var self=this;
		if(this._img!=""){
			this._html5_video='<img src="'+this._img+'"  style="position:absolute;" width='+this._width+' height='+this._height+'/>'+this._html5_video;
		}
		if(this._isAutoPlay){
			this._html5_video=this._html5_video.replace("自动",'autoplay="autoplay"').replace("显示",'');
		}else{
			this._html5_video=this._html5_video.replace("自动","").replace("显示",'display:none');
			this._html5_video=this._html5_video+'<img style="width:auto;position:absolute;top:40%;left:45%; cursor:pointer" src="'+this._videoIcon+'" />';
		}
		this.judgeVideo();
		if(this._tips==true){
			 $(window).bind('resize', function (e) {
				self.scale();
			 }); 
		}
	},
	judgeVideo:function(){
		if(this._type){
			if(this._type=="flv"){
				this.showVideo(false);
			}else if(this._type=="mp4"){
				this.showVideo(true);
			}
		} else {
			if(_$.isFlash()||!_$.understands_video()){
				this.showVideo(false);
			}else{
				this.showVideo(true);
			}
		}
	},
	showVideo:function(isHtml5){
		var  self=this;
		var _newEl;
		if(this._tips){
				this.tips();
				_newEl=this._videoTips.getElementsByTagName("div")[1];
		}else{
			this.notTips();
			_newEl=this._el.getElementsByTagName("div")[0];
		}
		if(isHtml5){
			_newEl.innerHTML=this._html5_video;
			if(this._isAutoPlay){
				_newEl.getElementsByTagName("img")[0].style.display="none";
			}else{
				var _video_icon=this._img?_newEl.getElementsByTagName("img")[1]:_newEl.getElementsByTagName("img")[0];
				_video_icon.onclick=function (){
					self.html5VideoPlay(this);
				}
			}
		}else{
			_newEl.innerHTML=this._flv_video;
		}
	},
	notTips:function(){
		this._el.style.position="relative";
		var _div=document.createElement("div");
		_div.style.position="relative";
		_div.style.width=this._width+"px";
		_div.style.height=this._height+"px";
		_div.style.overflow="hidden";
		this._el.appendChild(_div);
	},
	tips:function(){
		var self=this;
		this._videoTips=document.createElement("div");
		this._videoTips.className="newTips";

		var _videoTipsBg=document.createElement("div");
		_videoTipsBg.className="newTipsBg";
		_videoTipsBg.onclick=function(){
			self.deleteEl();
		}
		
		var _div=document.createElement("div");
		_div.style.background="#484848";
		_div.style.position="absolute";
		_div.style.width=this._width+"px";
		_div.style.height=this._height+"px";
		
		this._videoTipsClose=document.createElement("div");
		this._videoTipsClose.className="newTipsClose";
		this._videoTipsClose.style.zIndex=1;
		new touch().bindTouch({
			$element:$(self._videoTipsClose),
			touchStart: function(){
				self.deleteEl();
			}
	   });
		this._videoTipsClose.onclick=function(){
			self.deleteEl();
		}
		
		this._videoTips.appendChild(_videoTipsBg);
		this._videoTips.appendChild(_div);
		this._videoTips.appendChild(this._videoTipsClose);
		document.body.appendChild(this._videoTips);
		this.scale();
	},
	deleteEl:function(){
		if(this._videoTips){
			document.body.removeChild(this._videoTips);
			this._videoTips=null;
			this._el.data=null;
		}
	},
	scale:function(){
		if (!this._tips) return false;
		if (!this._videoTips) return false;
		var _height=document.body.scrollHeight<=$(window).height()?$(window).height():document.body.scrollHeight;
		var _bg=this._videoTips.getElementsByTagName("div")[0];
		var _div=this._videoTips.getElementsByTagName("div")[1];
		_bg.style.width=$(window).width()+"px";
		_bg.style.height=_height+"px";
		
		_div.style.left=($(window).width()-this._width)/2+"px";
		_div.style.top=($(window).height()-this._height)/2+"px";
		this._videoTipsClose.style.top=($(window).height()-this._height)/2+"px";
		var closeLeft=_div.offsetLeft+_div.offsetWidth+20;
		if(closeLeft+40<$(window).width()){
			this._videoTipsClose.style.left=closeLeft+"px";
		}else{
			var top=($(window).height()-this._height)/2-40;
			top=top<=0?0:top;
			var left=_div.offsetLeft+_div.offsetWidth-40;
			left=left>$(window).width()-40?$(window).width()-40:left;
			this._videoTipsClose.style.top=top+"px";
			this._videoTipsClose.style.left=left+"px";
		}
		this._videoTipsClose.style.display="block";
	},
	html5VideoPlay:function(e){
		e.style.display="none";
		e.parentNode.getElementsByTagName("img")[0].style.display="none";
		e.parentNode.getElementsByTagName("video")[0].style.display="block";
		e.parentNode.getElementsByTagName("video")[0].play();
	}
	
}

//===================================================================图片列表效果==============================================
function ImagesListAnimation(obj,parameter){
	this._arr=[];
	this._isSpeed=false;
	this._setNum;
	this._div=obj;
	var parameter=eval("("+parameter+")")||eval("("+this._div.getAttribute("data-base")+")");
	var type=_$.checkObj(parameter,"type")?parameter.type:"li";
	this._el=this._div.getElementsByTagName(type);
	this._auto=_$.checkObj(parameter,"auto")?parameter.auto:true;
	this._time=_$.checkObj(parameter,"time")?parameter.time:4000;
	this._maxWidth=Math.max(_$.checkObj(parameter,"maxWidth")?parameter.maxWidth:0,this._div.offsetWidth);
	this._minWidth=Math.max(_$.checkObj(parameter,"minWidth")?parameter.minWidth:0,this._el[0].offsetWidth);
	this._spacing=_$.checkObj(parameter,"spacing")?parameter.spacing:0;
	this._speed=_$.checkObj(parameter,"speed")?parameter.speed:.4;
	this._moveNum=_$.checkObj(parameter,"moveNum")?parameter.moveNum:1;
	this._callBack=_$.checkObj(parameter,"callback")?parameter.callback:null;
	this._arrowArr=_$.checkObj(parameter,"arrow")?parameter.arrow:null;
	this._round=_$.checkObj(parameter,"round")?parameter.round:null;
	
	
	this._nowPage=1;
	this._roundArr=[];
	
	this._pageNum=Math.floor(this._maxWidth/this._minWidth);
	this._totalPage=Math.ceil(this._el.length/this._moveNum);
	//alert(this._totalPage+"--"+this._pageNum)
	if(this._moveNum!=1&&this._moveNum!=this._pageNum){
		this._moveNum=1;
	}
	this.init();
}
ImagesListAnimation.prototype={
	init:function (){
		this._div.style.position="relative";
		for(var i=0;i<this._el.length;i++){
			this._el[i].style.position="absolute";
			this._el[i].index=i;
			this._el[i].style.top=0;
			this._el[i].style.left=(this._minWidth+this._spacing)*i+"px";
			this._arr.push(this._el[i]);
		}
		this.touchEvent();
		if(this._callBack) this._callBack(this._nowPage);
		if(this._auto==true) this.openAuto();//判断是否自动播放
		if(this._arrowArr) this.arrowEvent();//判断是否有箭头
		if(this._round) this.roundEvent();//判断是否有原点
	},
	showImages:function(num,isRight){
		var _isRight=isRight||false;
		if(this._isSpeed==true) return false;
		this._isSpeed=true;
		this._nowPage=num;
		this.arrowStyle(this._nowPage);//修改箭头状态
		if(this._round)this.roundStyle(num);//修改原点状态
		if(this._callBack) this._callBack(num);
		this.moveImages(_isRight);//执行动画
	},
	moveImages:function (isRight){
		var self=this;
		this.closeAuto();
		var count=0;
		for(var i=0;i<this._arr.length;i++){
			TweenMax.to(this._arr[i],this._speed,{css:{left:(this._minWidth+this._spacing)*(i-this._moveNum*(this._nowPage-1))},onComplete:function(){
					count++;
					if(count==self._arr.length){
						self._isSpeed=false;
						if(self._auto==true){
							self.openAuto();
						}
					}
				}});
		}
	},
	roundEvent:function (){
		var self=this;
		var _round_el=$(this._round).get(0);
		_round_el.style.position="relative";
		var _current_url=_round_el.getAttribute("current_url");
		var _default_url=_round_el.getAttribute("default_url");
		if(!_current_url||!_default_url){alert("未配置图片路径");return false;};
		for(var i=0;i<this._totalPage;i++){
			var _round_img=document.createElement("img");
			_round_img.src=_default_url;
			_round_img.index=i;
			_round_img.parameter={"current_url":_current_url,"default_url":_default_url};
			_round_el.appendChild(_round_img);
			this._roundArr.push(_round_img);
			_round_img.onmousemove=function (){
				if(self._now!=this.index){
					TweenMax.to(this,.4,{css:{alpha:.7}});
				}
			}
			_round_img.onmouseout=function (){
				if(self._now!=this.index){
					TweenMax.to(this,.4,{css:{alpha:1}});
					
				}
			}
			_round_img.onclick=function (){
				if(self._now!=this.index){
					TweenMax.to(this,.4,{css:{alpha:1}});
					self.showImages(this.index+1,this.index>self._nowPage);
				}
			}
		}
		this.roundStyle(this._nowPage);
	},
	roundStyle:function (index){
		for(var i=0;i<this._roundArr.length;i++){
			if(i==index-1){
				this._roundArr[i].src=this._roundArr[i].parameter.current_url;
			}else{
				this._roundArr[i].src=this._roundArr[i].parameter.default_url;
			}
		}
	},
	touchEvent:function(){
		var self=this;
		new touch().bindTouch({
			$element:$(self._div),
			touchMoveRight: function(){
				if(self._nowPage!=1){
					self.count(false);
				}
			},
			touchMoveLeft: function(){
			  	if(self._nowPage<=self._totalPage-self._pageNum){
					self.count(true);
				}
			}
	   });	
	},
	arrowEvent:function (){
		var self=this;
		var _left=$(this._arrowArr[0]).get(0);
		var _right=$(this._arrowArr[1]).get(0);
		if(self._totalPage<=self._pageNum){
			TweenMax.to($(this._arrowArr[0]).get(0),.1,{css:{alpha:.4}});
			TweenMax.to($(this._arrowArr[1]).get(0),.1,{css:{alpha:.4}});
			return false;	
		}
		_left.onmouseover=function (){
			if(self._nowPage!=1){
				this.style.cursor="pointer";
				TweenMax.to(this,.4,{css:{alpha:.5}});
			}else{
				this.style.cursor="default";
			}
		}
		_left.onmouseout=function (){
			this.style.cursor="default";
			if(self._nowPage!=1){
				TweenMax.to(this,.4,{css:{alpha:1}});
			}
		}
		_right.onmouseover=function (){
			if(self._nowPage<=self._totalPage-self._pageNum){
				this.style.cursor="pointer";
				TweenMax.to(this,.4,{css:{alpha:.5}});
			}else{
				this.style.cursor="default";
			}
		}
		_right.onmouseout=function (){
			this.style.cursor="default";
			if(self._nowPage<=self._totalPage-self._pageNum){
				TweenMax.to(this,.4,{css:{alpha:1}});
			}
		}
		_left.onclick=function (){
			if(self._nowPage!=1){
				self.count(false);
			}
		}
		_right.onclick=function (){
			if(self._nowPage<=self._totalPage-self._pageNum){
				self.count(true);
			}
		}
		this.arrowStyle(this._nowPage);
	},
	arrowStyle:function(index){
		TweenMax.killTweensOf($(this._arrowArr[0]).get(0));
		TweenMax.killTweensOf($(this._arrowArr[1]).get(0));
		//console.log(index,"--",this._totalPage,"--",this._pageNum,"--",this._totalPage-this._pageNum+1);
		if(index==1){
			TweenMax.to($(this._arrowArr[0]).get(0),.1,{css:{alpha:.4}});
			TweenMax.to($(this._arrowArr[1]).get(0),.1,{css:{alpha:1}});
		}else if(index==this._totalPage-this._pageNum+1){
			TweenMax.to($(this._arrowArr[0]).get(0),.1,{css:{alpha:1}});
			TweenMax.to($(this._arrowArr[1]).get(0),.1,{css:{alpha:.4}});
		}else{
			TweenMax.to($(this._arrowArr[0]).get(0),.1,{css:{alpha:1}});
			TweenMax.to($(this._arrowArr[1]).get(0),.1,{css:{alpha:1}});
		}
	},
	openAuto:function (){
		var self=this;
		this._setNum=setInterval(function (){self.count(true);},self._time);
	},
	closeAuto:function (){
		clearInterval(this._setNum);
	},
	count:function (isRight){
		if(this._isSpeed==true) return false;
		if(isRight==true){
			this._nowPage++;
			if(this._nowPage>this._totalPage){
				this._nowPage=this._totalPage;
				return false;
			}
		}else{
			this._nowPage--;
			if(this._nowPage<1){
				this._nowPage=1;
				return false;
			}
		}
		this.showImages(this._nowPage,isRight);
	}
}
//===========================================================================单张图片切换===========================================
function ImagesAnimation(obj,parameter){
	this._arr=[];
	this._roundArr=[];
	this._thumArr=[];
	this._preObj=null;
	this._isSpeed=false;
	this._setNum;
	
	this._div=obj;
	var parameter=eval("("+parameter+")")||eval("("+this._div.getAttribute("data-base")+")");
	var type=_$.checkObj(parameter,"type")?parameter.type:"li";
	this._el=this._div.getElementsByTagName(type);
	this._show=_$.checkObj(parameter,"show")?parameter.show:true;
	this._now=_$.checkObj(parameter,"now")?parameter.now:0;
	this._auto=_$.checkObj(parameter,"auto")?parameter.auto:true;
	this._time=_$.checkObj(parameter,"time")?parameter.time:4000;
	this._loop=_$.checkObj(parameter,"loop")?parameter.loop:true;
	this._round=_$.checkObj(parameter,"round")?parameter.round:null;
	this._thum=_$.checkObj(parameter,"thum")?parameter.thum:null;
	this._thum_arrow=_$.checkObj(parameter,"thumArrow")?parameter.thumArrow:null;
	this._speed=_$.checkObj(parameter,"speed")?parameter.speed:.4;
	this._ani=_$.checkObj(parameter,"ani")?parameter.ani:"move";//目前就两种形式，  move和alpha
	this._callBack=_$.checkObj(parameter,"callback")?parameter.callback:null;
	this._num=_$.checkObj(parameter,"num")?parameter.num:null;
	this._maxWidth=Math.max(_$.checkObj(parameter,"width")?parameter.width:0,this._div.offsetWidth);
	this._arrowArr=_$.checkObj(parameter,"arrow")?parameter.arrow:null;
	if(this._el.length==0){
		return false;	
	}
	if(this._num){
		this._total=Math.ceil(this._el.length/this._num);
	}else{
		this._total=this._el.length;
	}
	if(this._show==true) this.init();
}
ImagesAnimation.prototype={
	init:function (){
		for(var i=0;i<this._el.length;i++){
			this._el[i].style.position="absolute";
			//this._el[i].style.display="none";
			this._el[i].style.top=0;
			this._el[i].style.left=0;
			this._el[i].style.opacity=0;
			this._el[i].style.filter="alpha(opacity=0)";
			this._arr.push(this._el[i]);
		}
		if(this._ani!="single"){
			this._arr[this._now].style.display="block";
			this._arr[this._now].style.opacity=1;
			this._arr[this._now].style.filter="alpha(opacity=100)";
		}
		this._preObj=this._arr[this._now];
		this.touchEvent();//touch事件
		if(this._callBack) this._callBack(this._now);
		if(this._auto==true){if(this._el.length>1) this.openAuto();}//判断是否自动播放
		if(this._arrowArr) this.arrowEvent();//判断是否有箭头
		if(this._round) this.roundEvent();//判断是否有原点
		if(this._thum) this.thumEvent();//判断是否有缩略图
		if(this._thum_arrow){
			if(!this._thum){alert("没有找到缩略图");}else{
				this.thumArrowEvent();
			}
		}
	},
	showImages:function(num,isRight){
		var _isRight=isRight||false;
		if(this._isSpeed==true) return false;
		this._isSpeed=true;
		this._now=num;
		this.arrowStyle(this._now);
		if(this._round)this.roundStyle(this._now);
		if(this._thum)this.thumMove(this._now);
		if(this._callBack) this._callBack(num);
		switch(this._ani){
			case "move":
				this.moveImages(num,_isRight);
			break;
			case "alpha":
				this.alphaImages(num);
			break;
			case "single":
				this.singleImages();
			break;
			default:
				this.moveImages(num,_isRight);
			break;
		}
	},
	singleImages:function(){
		//this._div.style.display="block";
		for(var i=0;i<this._arr.length;i++){
			TweenMax.to(this._arr[i],this._speed,{css:{alpha:1,display:"block"},delay:i*.2});
		}
	},
	moveImages:function (num,isRight){
		var self=this;
		this.closeAuto();
		if(isRight){
			this._arr[num].style.left=this._maxWidth+'px';
		}else{
			this._arr[num].style.left=-this._maxWidth+'px';
		}
		if(this._preObj!=null){
			this._preObj.style.zIndex=0;
			if(isRight){
				TweenMax.to(this._preObj,this._speed,{css:{left:-this._maxWidth}});
			}else{
				TweenMax.to(this._preObj,this._speed,{css:{left:this._maxWidth}});
			}
		}
		//this._arr[num].style.display="block";
		this._arr[num].style.opacity=1;
		this._arr[num].style.filter="alpha(opacity=100)";
		this._arr[num].style.zIndex=1;
		TweenMax.to(this._arr[num],this._speed,{css:{left:0},onComplete:function(){
			self._isSpeed=false;
			self._preObj=self._arr[num];
			if(self._auto==true){
				self.openAuto();
			}
		}});
	},
	alphaImages:function (num){
		var self=this;
		this.closeAuto();
		this._arr[num].style.display="block";
		this._arr[num].style.zIndex=1;
		if(this._preObj!=null){
			this._preObj.style.zIndex=0;
			TweenMax.to(this._preObj,this._speed,{css:{alpha:0}});
		}
		TweenMax.to(this._arr[num],this._speed,{css:{alpha:1},onComplete:function(){
			self._isSpeed=false;
			self._preObj=self._arr[num];
			if(self._auto==true){
				self.openAuto();
			}
		}});
	},
	touchEvent:function(){
		var self=this;
		new touch().bindTouch({
			$element:$(self._div),
			touchMoveRight: function(){
				self.count(false);
			},
			touchMoveLeft: function(){
			  	self.count(true);
			},
			touchStart:function(){
				self.closeAuto();
			}
	   });	
	},
	arrowEvent:function (){
		var self=this;
		var _left=$(this._arrowArr[0]).get(0);
		var _right=$(this._arrowArr[1]).get(0);
		_left.onmouseover=function (){
			if(self._loop==true||self._now!=0){
				this.style.cursor="pointer";
				TweenMax.to(this,.4,{css:{alpha:.5}});
			}else{
				this.style.cursor="default";
			}
		}
		_left.onmouseout=function (){
			this.style.cursor="default";
			if(self._loop==true||self._now!=0){
				TweenMax.to(this,.4,{css:{alpha:1}});
			}
		}
		_right.onmouseover=function (){
			if(self._loop==true||self._now!=self._total-1){
				this.style.cursor="pointer";
				TweenMax.to(this,.4,{css:{alpha:.5}});
			}else{
				this.style.cursor="default";
			}
		}
		_right.onmouseout=function (){
			this.style.cursor="default";
			if(self._loop==true||self._now!=self._total-1){
				TweenMax.to(this,.4,{css:{alpha:1}});
			}
		}
		_left.onclick=function (){
			if(self._loop==true||self._now!=0){
				self.count(false);
			//	TweenMax.to(this,.4,{css:{alpha:1}});
			}
		}
		_right.onclick=function (){
			if(self._loop==true||self._now!=self._total-1){
				self.count(true);
				//TweenMax.to(this,.4,{css:{alpha:1}});
			}
		}
		this.arrowStyle(this._now);
	},
	arrowStyle:function(index){
		if(!this._loop||this._loop!=true){
			TweenMax.killTweensOf($(this._arrowArr[0]).get(0));
			TweenMax.killTweensOf($(this._arrowArr[1]).get(0));
			if(index==0){
				TweenMax.to($(this._arrowArr[0]).get(0),.1,{css:{alpha:.4}});
				TweenMax.to($(this._arrowArr[1]).get(0),.1,{css:{alpha:1}});
			}else if(index==this._total-1){
				TweenMax.to($(this._arrowArr[0]).get(0),.1,{css:{alpha:1}});
				TweenMax.to($(this._arrowArr[1]).get(0),.1,{css:{alpha:.4}});
			}else{
				TweenMax.to($(this._arrowArr[0]).get(0),.1,{css:{alpha:1}});
				TweenMax.to($(this._arrowArr[1]).get(0),.1,{css:{alpha:1}});
			}
		}
	},
	roundEvent:function (){
		var self=this;
		var _round_el=$(this._round[0]).get(0);
		for(var i=0;i<this._total;i++){
			var _round_img=document.createElement("em");
			_round_img.className=this._round[2];
			_round_img.index=i;
			_round_img.parameter={"current_url":this._round[1],"default_url":this._round[2]};
			_round_el.appendChild(_round_img);
			this._roundArr.push(_round_img);
			_round_img.onmousemove=function (){
				if(self._now!=this.index){
					TweenMax.to(this,.4,{css:{alpha:.7}});
				}
			}
			_round_img.onmouseout=function (){
				if(self._now!=this.index){
					TweenMax.to(this,.4,{css:{alpha:1}});
					
				}
			}
			_round_img.onclick=function (){
				if(self._now!=this.index){
					TweenMax.to(this,.4,{css:{alpha:1}});
					self.showImages(this.index,this.index>self._now);
				}
			}
		}
		this.roundStyle(this._now);
	},
	roundStyle:function (index){
		for(var i=0;i<this._roundArr.length;i++){
			if(i==index){
				$(this._roundArr[i]).addClass(this._roundArr[i].parameter.current_url).removeClass(this._roundArr[i].parameter.default_url);
			}else{
				$(this._roundArr[i]).addClass(this._roundArr[i].parameter.default_url).removeClass(this._roundArr[i].parameter.current_url);
			}
		}
	},
	thumEvent:function(){
		var self=this;
		var _thum=$(this._thum[0]).get(0);
		_thum.style.position="relative";
		var _thumHeight=this._thum[1];
		var _thumSpacing=this._thum[2]||0;
		var _thum_type=this._thum[3]||"li";
		var _thum_page_num=Math.floor(_thum.offsetHeight/_thumHeight);
		var _thum_center=Math.floor(_thum_page_num/2);
		var _thum_el=_thum.getElementsByTagName(_thum_type);
		if(_thum_el.length!=this._el.length){alert("缩略图和大图数量不一致");return false;};
		for(var i=0;i<_thum_el.length;i++){
			_thum_el[i].style.position="absolute";
			_thum_el[i].style.top=(_thumHeight+_thumSpacing)*i+"px";
			_thum_el[i].style.left=0;
			_thum_el[i].index=i;
			_thum_el[i].parameter={"width":_thumHeight,spacing:_thumSpacing,center:_thum_center,pageNum:_thum_page_num};
			this._thumArr.push(_thum_el[i]);
			_thum_el[i].onmouseover=function(){
				if(this.index!=self._now){
					this.style.cursor="pointer";
					//TweenMax.to(this,self._speed,{css:{alpha:1}});
				}else{
					this.style.cursor="default";
				}
			}
			_thum_el[i].onmouseout=function(){
				if(this.index!=self._now){
					//TweenMax.to(this,self._speed,{css:{alpha:.5}});
				}
				this.style.cursor="default";
			}
			_thum_el[i].onclick=function(){
				if(this.index!=self._now){
					self.showImages(this.index,this.index>self._now);
				}
			}
		}
		this.thumMove(this._now);
	},
	thumMove:function(index){
		var _parameter=this._thumArr[0].parameter;
		for(var i=0;i<this._thumArr.length;i++){
			//样式
			if(i==index){
				$(this._thumArr[i]).addClass("cur");
			}else{
				$(this._thumArr[i]).removeClass("cur");
			}
			//移动
			if(_parameter.pageNum<this._thumArr.length){
				if(index-_parameter.center<=0&&_parameter.center+index<this._thumArr.length){
					TweenMax.to(this._thumArr[i],this._speed,{css:{top:(_parameter.width+_parameter.spacing)*i}});
				}else if(_parameter.center+index>this._thumArr.length-_parameter.center){
					TweenMax.to(this._thumArr[i],this._speed,{css:{top:(_parameter.width+_parameter.spacing)*(i-(this._thumArr.length-_parameter.pageNum))}});
				}else{
					TweenMax.to(this._thumArr[i],this._speed,{css:{top:(_parameter.width+_parameter.spacing)*(i-(this._now-_parameter.center))}});
				}
			}
		}
	},
	thumArrowEvent:function (){
		var self=this;
		var _parameter=this._thumArr[0].parameter;
		var _left=$(this._thum_arrow[0]).get(0);
		var _right=$(this._thum_arrow[1]).get(0);
		/*if(_parameter.pageNum>=this._thumArr.length) {
			//_left.style.display="none";
			//_right.style.display="none";
			return false;
		}*/
		if(_parameter.pageNum<this._thumArr.length) {
			_left.onmouseover=_right.onmouseover=function (){
				TweenMax.to(this,.4,{css:{alpha:.5}});
			}
			_left.onmouseout=_right.onmouseout=function (){
				TweenMax.to(this,.4,{css:{alpha:1}});
			}
			_left.onclick=function (){
				self.thumArrowMove(false);
			}
			_right.onclick=function (){
				self.thumArrowMove(true);
			}
		}else{
			_left.style.opacity=.4;
			_right.style.opacity=.4;
		}
	},
	thumArrowMove:function (isRight){
		var _parameter=this._thumArr[0].parameter;
		var index=this._now;
		var _num=this.getThumLeft(_parameter.width+_parameter.spacing);
		for(var i=0;i<this._thumArr.length;i++){
			if(isRight){
				if(_num>-(this._thumArr.length-_parameter.pageNum)){
					TweenMax.to(this._thumArr[i],this._speed,{css:{top:(_parameter.width+_parameter.spacing)*(i+_num-1)}});
				}
			}else{
				if(_num<0){
					TweenMax.to(this._thumArr[i],this._speed,{css:{top:(_parameter.width+_parameter.spacing)*(i+_num+1)}});
				}
			}
		}
	},
	getThumLeft:function (width){
		return Math.floor(this._thumArr[0].offsetTop/width);
	},
	openAuto:function (){
		var self=this;
		this._setNum=setInterval(function (){self.count(true);},self._time);
	},
	closeAuto:function (){
		clearInterval(this._setNum);
	},
	count:function (isRight){
		if(this._el.length<=1) return false;
		if(this._isSpeed==true) return false;
		if(isRight==true){
			this._now++;
			if(this._now>=this._total){
				if(!this._loop||this._loop!=true) {this._now=this._total-1;return false};
				this._now=0;
			}
		}else{
			this._now--;
			if(this._now<0){
				if(!this._loop||this._loop!=true) {this._now=0;return false};
				this._now=this._total-1;
			}
		}
		this.showImages(this._now,isRight);
	}
}
//===========================================================================loading加载===========================================
function loadingAll($el,parameter){
	this._$el=$el;
	this.imgNum=0;
	this.bitmapArr=[];
	this.loading_num=0;
	this.imgArr=[];
	this._parameter=parameter;
	this._loading_el=_$.checkObj(parameter,"loadingEl")?parameter.loadingEl:".laodingBox";	
	this._type=_$.checkObj(parameter,"type")?parameter.type:"data_src";	
	this._COMPLETE=_$.checkObj(parameter,"COMPLETE")?parameter.COMPLETE:null;	
	this._PROGRESS=_$.checkObj(parameter,"PROGRESS")?parameter.PROGRESS:null;
	this._num=_$.checkObj(parameter,"num")?parameter.num:0;
	this.start();
}
loadingAll.prototype={
	start:function(){
		var _el=$(this._$el).get(0).getElementsByTagName("img");
		for(var i=0;i<_el.length;i++){
			if(_el[i].getAttribute(this._type)){
				this.imgArr.push(_el[i].getAttribute(this._type));
			}
		}
		this.loadStartImg();
	},
	loadStartImg:function (){
		var self=this;
		if(this.imgArr.length==0){
			if(self._COMPLETE){
				self._COMPLETE();
			}
			return false;	
		}
		this.imgNum=0;
		for(var i=0;i<this.imgArr.length;i++){
			this.loadImg(this.imgArr[i],i);
		}
	},
	loadImg:function (str,index){
		var item=this;
		var img=new Image();
		img.src=str;
		img.index=index;
			
		if (img.complete) { 
			this.imgData(img);
			return false;
		}
		img.onload = function () { 
			item.imgData(img);
			return false;
		}
	},
	imgData:function (obj){
		this.imgNum++;
		this.bitmapArr.push({img:obj,id:obj.index});
		this.ProgressEvent();
		if(this.imgNum==this.imgArr.length){
			this.CompleteEvent();
		}
	},
	ProgressEvent:function (){
		this.loading_num=this.imgNum/this.imgArr.length;
		if(this._PROGRESS){
			this._PROGRESS(this.loading_num);
		}
		this.showLoading(this.loading_num);
	},
	CompleteEvent:function (){
		this.bitmapArr.sort(this.sortOn("id"));//排序
		this.showImage();
		var self=this;
		if(self._COMPLETE){
			self._COMPLETE(self._parameter);
		}
		TweenMax.to($(this._loading_el).get(0),.4,{css:{alpha:0},onComplete:function(){$(self._loading_el).css({"display":"none"})}});
	},
	showLoading:function(num){
		var _num=Math.floor(num*(100-this._num));
		$(this._loading_el).find("span").text((this._num+_num)+"%");
	},
	showImage:function(){
		var self=this;
		$(this._$el).find("img").each(function(index, element) {
            $(this).attr("src",$(this).attr(self._type)).removeAttr(self._type);
        });
	},
	sortOn:function(propertyName){
		return function(object1, object2){
			var value1 = object1[propertyName];
			var value2 = object2[propertyName];
			if(value1 < value2){
				return -1;
			}else if(value1 > value2){
				return 1;
			}else{
				return 0;
			}
		};
	}
}
//===========================================================================小工具===============================================
var _$={
	checkObj:function(obj,str){
		for(var i in obj){
			if(i==str) return true;
		}
		return false;
	},
	isFlash:function(){
		var i_flash;
		var v_flash;
		if (navigator.plugins) {
			for (var i = 0; i < navigator.plugins.length; i++) {
				if (navigator.plugins[i].name.toLowerCase().indexOf("shockwave flash") >= 0) {
					i_flash = true;
					v_flash = navigator.plugins[i].description.substring(navigator.plugins[i].description.toLowerCase().lastIndexOf("flash ") + 6, navigator.plugins[i].description.length);
				}
			}
		}
		if(!i_flash&&navigator.userAgent.search('MSIE 8.0')>-1||!i_flash&&navigator.userAgent.search('MSIE 7.0')>-1||!i_flash&&navigator.userAgent.search('MSIE 9.0')>-1){
			return true;
		}
		if (i_flash) {
			if (v_flash) {
				if(parseFloat(v_flash.substring(0,2))>=8){
					return true;
				}else{
					return false;
				}
			}else{
				return false;
			}
		} else {
			return false;
		}
	},
	understands_video:function(){
		return !!document.createElement('video').canPlayType;
	}
}
//============================================================================浏览器判断============================================
var isHandle = {
    Android: function() {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    isIE8: function() {
        return navigator.userAgent.toLowerCase().indexOf("msie 8") > -1;
    },
    isIE9: function() {
        return navigator.userAgent.toLowerCase().indexOf("msie 9") > -1;
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function() {
        return (isHandle.Android() || isHandle.BlackBerry() || isHandle.iOS() || isHandle.Windows());
    },
    iPad: function() {
        return navigator.userAgent.match(/iPad/i) ? true : false;
    },
    Status: function() {
        return checkLayout();
    },
    isLess640px: function() {
        return document.documentElement.clientWidth <= this.clinetSize;
    },
    microMsg: function() {
        var ua = window.navigator.userAgent.toLowerCase();
        return (ua.match(/MicroMessenger/i) == 'micromessenger') ? true : false;
    },
    clinetSize: 640,
    isMIUI: function() {
        return navigator.userAgent.match(/MiuiBrowser/i) ? true : false;
    },
	lowerIE: function () {
		return navigator.userAgent.toLowerCase().indexOf("msie") >0;
	},
	lowerIE8: function () {
		var agent=navigator.userAgent.toLowerCase();
		if(agent.indexOf("msie")<0) return false;
		var ieAgent=agent.split("msie");
		return parseInt(ieAgent[1].split(";")[0]) < 8;
     }
};
//===========================================================================手机缩放----ort.js====================================
var adaptUILayout = (function () {
    var regulateScreen = (function () {
        var cache = {};
        var defSize = {width: window.screen.width,height: window.screen.height};
        var ver = window.navigator.appVersion;
        var s = window.orientation;
        var _ = null;
        var check = function (key) {return key.constructor == String ? ver.indexOf(key) > -1 : ver.test(key);};
        var add = function (name, key, size) {if (name && key)cache[name] = {key: key,size: size};};
        var del = function (name) {if (cache[name])delete cache[name];};
        var cal = function () {
            if (_ != null)return _;
            for (var name in cache) {if (check(cache[name].key)) { _ = cache[name].size;break;}}
            if (_ == null)_ = defSize;
			return _;
        };
        return {add: add,del: del,cal: cal,s: s};

    })();
    var adapt = function (uiWidth) {
        var deviceWidth,devicePixelRatio,targetDensitydpi,initialContent,head,viewport,ua;
        ua = navigator.userAgent.toLowerCase();
        isiOS = ua.indexOf('ipad') > -1 || ua.indexOf('iphone') > -1;
        devicePixelRatio = window.devicePixelRatio;
        devicePixelRatio < 1.5 ? 2 : devicePixelRatio;
        if (window.orientation == 0 || window.orientation == 180) {
            if (regulateScreen.s != 0) {
                if (regulateScreen.cal().width < regulateScreen.cal().height) {
                    deviceWidth = regulateScreen.cal().width;
                } else {
                    deviceWidth = regulateScreen.cal().height;
                }
            } else {
                deviceWidth = regulateScreen.cal().width;
            }
        } else {
            if (regulateScreen.s != 0) {
                if (regulateScreen.cal().width > regulateScreen.cal().height) {
                    deviceWidth = regulateScreen.cal().width;
                } else {
                    deviceWidth = regulateScreen.cal().height;
                }
            } else {
                deviceWidth = regulateScreen.cal().height;
            }
        }
        if (devicePixelRatio == 2 && (deviceWidth == 320 || deviceWidth == 360 || deviceWidth == 592 || deviceWidth == 640)) { deviceWidth *= 2;};
        if (devicePixelRatio == 1.5 && (deviceWidth == 320)) {deviceWidth *= 2;devicePixelRatio = 2;};
        if (devicePixelRatio == 1.5 && (deviceWidth == 640)) {devicePixelRatio = 2;};

        targetDensitydpi = uiWidth / deviceWidth * devicePixelRatio * 160;
        initialContent = isiOS ? 'width=' + uiWidth + 'px, user-scalable=no' : 'target-densitydpi=' + targetDensitydpi + ', width=' + uiWidth + ', user-scalable=no';
        $("#viewport").remove();
        head = document.getElementsByTagName('head');
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.id = 'viewport';
        viewport.content = initialContent;
        if (isiOS && window.orientation != 0 && window.orientation != 180) {
            viewport.content = 'width=640';
            head.length > 0 && head[head.length - 1].appendChild(viewport);
        } else {
            head.length > 0 && head[head.length - 1].appendChild(viewport);
        }
		//document.body.style.display="block";
		$("body").show();
    };
    return {
        regulateScreen: regulateScreen,
        adapt: adapt
    };
})();
if(isHandle.isLess640px()){
  adaptUILayout.adapt(640);
}
$(window).bind('orientationchange', function (e) {
    //adaptUILayout.adapt(640);
});
//=============================================================强转==============================
function orien(){
	var _horiPrompt=document.createElement("div");
	_horiPrompt.id="horiPrompt";
	document.body.appendChild(_horiPrompt);
	this.initialize();
}
orien.prototype={
	initialize:function () {
        if(isHandle.any()){
            this.run();
        }else{
            $("#horiPrompt").remove();
        }
	},
	run: function () {
		if(isHandle.any() && isHandle.isLess640px()){
			this.phoneHori();
		}else if(isHandle.iPad()){
			this.iPadHori();
		}
	},
	iPadHori: function(){
		orientationchange();
		function orientationchange(){
			if (window.orientation == 0 || window.orientation == 180) {
				$("#horiPrompt").show();
			} else {
				$("#horiPrompt").hide();
			}
		}
		window.onorientationchange = function() {
			orientationchange();
		};
	},
	phoneHori:function(){
		orientationchange();
		function orientationchange(){
			if (window.orientation == 0 || window.orientation == 180) {
				$("#horiPrompt").hide();        
			} else {
				$("#horiPrompt").show();
			}
		}
		window.onorientationchange = function() {
			orientationchange();
		};
	}
}
if(window.location.toString().indexOf("BuyTools")<0)new orien();