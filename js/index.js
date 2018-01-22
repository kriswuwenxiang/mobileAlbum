$(function(){
	var zWin = $(window);
	var total = 16;// 相册中照片的个数
	$('#total_img').html(total);
	var render = function(){
		var marginWith = 1;// 图片间距
		var scrollBarWidth = 1;
		var winWidth = zWin.width();// 设备宽度
		var picWidth = Math.floor((winWidth-marginWith*8-scrollBarWidth)/4);// 计算单张图片的宽度
		var tmpl = '';
		for(var i=1;i<=total;i++){
			var imgSrc='img/'+i+'.jpg';
			tmpl+='<li data-id="'+i+'" class="animated bounceIn" style="width:'+picWidth+'px;height:'+picWidth+'px;margin:'+marginWith+'px;"><canvas id="cvs_'+i+'"></canvas></li>';
			var imageObj=new Image();
			imageObj.index=i;
			imageObj.onload=function(){// 在画布上绘制图像（使用Canvas代替Image），触发物理设备的GPU渲染
				var cvs=$('#cvs_'+this.index)[0].getContext('2d');
				cvs.width=this.width;
				cvs.height=this.height;
				cvs.drawImage(this,0,0,this.width,this.height);// 在画布上定位图像，并规定图像的宽度和高度
			}
			imageObj.src=imgSrc;// 加载图片
		}
		$('#container').html(tmpl);
	}
	render();// 加载相册

	var wImage = $('#large_img');// 大图对象
	var domImage = wImage[0];
	var loadImg = function(id,callback){// 加载大图
		$('#cur_img').html(id);
		$('#large_container').css({
			width:zWin.width(),
			height:zWin.height()
		}).show();
		var imgsrc = 'img/'+id+'.large.jpg';
		var imageObj = new Image();
		imageObj.onload = function(){
			var w = this.width;// 图片宽度
			var h = this.height;// 图片高度
			var winWidth = zWin.width();// 设备宽度
			var winHeight = zWin.height();// 设备高度
		  var wSpacing = parseInt((winWidth - winHeight*w/h)/2);// 左间距：窗口宽度减去图片真实宽度然后再除以2
			var hSpacing = parseInt((winHeight - winWidth*h/w)/2);// 上间距：窗口高度减去图片真实高度然后再除以2
			wImage.css('width','auto').css('height','auto');
			wImage.css('padding-left','0px').css('padding-top','0px');
			if(h/w > winHeight/winWidth){// 判断图片是竖图还是横图
				 wImage.attr('src',imgsrc).css('height',winHeight).css('padding-left',wSpacing+'px');// 竖图
			}else{
				 wImage.attr('src',imgsrc).css('width',winWidth).css('padding-top',hSpacing+'px');// 横图
			}

			callback&&callback();// 若有回掉方法则执行
		}
		imageObj.src = imgsrc;// 加载图片
	}
	
	var imgId;// 当前放大图片的编号
	$('#container li').tap(function(){
		var _id = imgId = $(this).attr('data-id');
		loadImg(_id);
	});
	$('#large_container').tap(function(){// 点击
		$('#large_container').hide();
	}).swipeLeft(function(){// 左滑动
		imgId++;
		if(imgId>total){
			imgId=total;
		}else{
			loadImg(imgId,function(){
				domImage.addEventListener('webkitAnimationEnd',function(){// 添加监听事件
					wImage.removeClass('animated bounceInRight');
					domImage.removeEventListener('webkitAnimationEnd',function(){},false);// 移除监听事件
				},false);// 指定需要移除的EventListener函数是否为事件捕获
				wImage.addClass('animated bounceInRight');
			});
		}
	}).swipeRight(function(){// 右滑动
		imgId--;
		if(imgId<1){
			imgId=1;
		}else{
			loadImg(imgId,function(){
				domImage.addEventListener('webkitAnimationEnd',function(){
					wImage.removeClass('animated bounceInLeft');
					domImage.removeEventListener('webkitAnimationEnd',function(){},false);
				},false);
				wImage.addClass('animated bounceInLeft');
			});
		}
	});
});