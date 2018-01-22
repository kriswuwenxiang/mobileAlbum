# 移动端相册

这是一个利用zepto.js+animate.css+canvas简单的移动端手机相册。



## 1.使用Zepto.js
Zepto是一个轻量级的针对现代高级浏览器的JavaScript库， 它与jquery有着类似的api。 如果你会用jquery，那么你也会用Zepto。[Zepto.js API 中文版(1.2.0)](http://www.css88.com/doc/zeptojs_api)
本例子中除了Zepto的默认模块（`zepto event ajax form ie`），额外用到 `touch` 模块，所以需要手动建立Zepto。

**手动建立方法：**
 1. 进入Zepto的 [GitHub 网址](https://github.com/madrobby/zepto)，并 git 项目
 2. 进入zepto目录，使用 npm 命令安装模块 `npm install`
 3. 自定义构建Zepto模块 `SET MODULES=zepto event ajax form ie touch`
 4. 执行命令 `npm run-script dist`，即可在dist目录下发现 zepto.js、zepto.min.js 等文件
 5. 在html文件中引入 `zepto.min.js` 就可以开始使用，像jquery一样简单易用



## 2.使用Animate.css
一个简单易用的CSS动画跨浏览器库。[GitHub 网址](https://github.com/daneden/animate.css)
在您的网站上使用 animate.css，只要简单地把样式表插入到文档中，并为需要动画的元素添加一个`CSS类名`（动画名称）即可。就是这样！你就有了一个CSS动画效果。可以直接到这个[ 官方网址 ](https://daneden.github.io/animate.css)查看动画效果。

**使用方法：**
 1. 在html中引用 `animate.min.css` 
 2. 在标签元素添加 `class` 即可获取动画效果



## 3.使用HTML 5 canvas 标签
使用 canvas 的 drawImage() 方法在画布上绘制图像（使用Canvas代替Image），触发物理设备的GPU渲染，优化图片的加载速度。[HTML5 canvas drawImage() 参考手册](http://www.w3school.com.cn/tags/canvas_drawimage.asp)

**使用方法：**

    var imageObj=new Image();// 创建一个Image对象
    imageObj.index=i;// 设置图片标志
    imageObj.onload=function(){// 图片加载触发的方法
      var cvs=$('#cvs_'+this.index)[0].getContext('2d');
      cvs.width=this.width;
      cvs.height=this.height;
      cvs.drawImage(this,0,0,this.width,this.height);// 在画布上定位图像，并规定图像的宽度和高度
    }
    imageObj.src=imgSrc;// 加载图片

