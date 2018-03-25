

// 初始化页面
 window.onload = function(){

        search();

        banner();

        downTime();

        move();

        load();

        infeed();
      
};		
    
   /*监听滚动事件*/
 
  var search = function(){

    // Es6
   var [search,banner] = [document.querySelector('.jd_header_box'),document.querySelector('.jd_banner')]

   /*距离范围*/
   var height = banner.offsetHeight; 

   window.onscroll = function(){	
      /*当前页面距离*/
     var top = document.documentElement.scrollTop;
   
     var opacity = 0;
       
      if(top > height){
      	// 滚动距离超过轮播图距离，保持不变
      	opacity = 0.85;
      	}
      else{
      	//当滚动距离随着离顶部距离变大，透明度变大
        opacity = 0.85*(top/height);
      }
    
      search.style.background = "rgba(216,80,92,"+opacity+")";
  }
   
};

var banner=function(){
	
    var banner = document.querySelector('.jd_banner');
    
    var width = banner.offsetWidth;
    
    var imageBox=banner.querySelector('ul:first-child');

    var pointBox=banner.querySelector('ul:last-child');

    var points=pointBox.querySelectorAll('li');
    
   /*添加过渡*/
    var addTransition = function () {
        imageBox.style.webkitTransition = "all .2s";
        imageBox.style.transition = "all .2s";
    };
    /*删除过渡*/
    var removeTransition = function () {
        imageBox.style.webkitTransition = "none";
        imageBox.style.transition = "none";
    };
    /*改变位置*/
    var setTranslateX = function(translateX){
        imageBox.style.webkitTransform = "translateX("+translateX+"px)";
        imageBox.style.transform = "translateX("+translateX+"px)";
    };
       

   // 无缝滚动和无缝滑动 (定时器，过渡，位移)
   var index = 1;
   var timer = setInterval(function(){
           index++;
           
   	    addTransition();        
      
        setTranslateX(-index*width);

   }, 3000);

     //绑定过渡结束事件
   banner.addEventListener('transitionend', function(){
         //无缝滚动
          if(index>=9){
          	 index=1;
        
   	     removeTransition();
     
         setTranslateX(-index*width);        	 
          }
          //无缝滑动
          else if(index<=0){
          	//定位到第八张
             index=8;  
            // 清除过渡
            removeTransition();
            setTranslateX(-index*width);    
          }
         /*index 1-8  索引范围*/
        /*point 0-7 */
        setPoint();
   });

       /*.点随之滚动起来     （改变当前点元素的样式）*/
    var setPoint = function(){
        /*把所有点的样式清除*/
        for(var i = 0 ; i < points.length ; i ++){
            points[i].className = " ";
           /* points[i].classList.remove('now');*/
        }
        //当前的加上样式
        points[index-1].className = "now";
    };

     /*图片滑动 touch事件）*/

     //记录开始的x坐标
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    //  记录是否点击
    var isMove = false;

    banner.addEventListener('touchstart',function(e){
     
        clearInterval(timer);
        // 当前的触摸点 touches
        //记录当前位置
        startX = e.touches[0].clientX;
    });
    banner.addEventListener('touchmove',function(e){
        isMove = true;
        moveX = e.touches[0].clientX;
        //当distanceX 大于0的时候 向右滑动 否则反之
        distanceX = moveX - startX;/*distanceX  值  正负*/

        /*算出当前图片盒子需要定位的位置*/
        /*将要去做定位*/
        var currX = -index*width + distanceX;
       
        removeTransition();
        
        setTranslateX(currX);

    });
    banner.addEventListener('touchend',function(e){

        /*当超过了一定的距离的时候 */
        if(isMove && (Math.abs(distanceX) > width/3)){
            /*5.当超过了一定的距离的时候    滚动  到上一张 或 下一张  （一定的距离  1/3  屏幕宽度  过渡）*/
            if(distanceX > 0){
                index --;/*向右滑  上一张*/
            }else{
                index ++;/*向左滑 下一张*/
            }
            addTransition();
            setTranslateX(-index * width);
        }
        /*当不超过一定的滑动距离的时候*/
        else {
            /*当不超过一定的滑动距离的时候  吸附回去  定位回去     （一定的距离  1/3  屏幕宽度  过渡）*/
            addTransition();
            setTranslateX(-index * width);
        }

        /*重置*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;

        /*添加定时器*/
        clearInterval(timer);
        timer = setInterval(function(){
            /*箱子滚动*/
            index  ++ ;
            /*定位  过渡来做定位的  这样才有动画*/
          
            addTransition();
          
            setTranslateX(-index*width);
        },4000);
    });
}     

   
   // 横向滑动
    var infeed = function(){
     
    var parent = document.querySelector('.product_box_con');
    var banner = document.querySelector('#infeed');

    var parentWidth = parent.offsetWidth;
    var bannerWidth = banner.offsetWidth;

    //最大的定位区间
    var maxPosition = 0;
    //最小的定位区间
    var minPosition = parentWidth-bannerWidth;

   
      /*滑动区间*/
      // 最大滑动区间 
    var maxSwipe = maxPosition + 100; 
      // 最小滑动区间       
    var minSwipe = minPosition - 100;         

   
    var addTransition = function () {
        banner.style.webkitTransition = "all .2s";
        banner.style.transition = "all .2s";
    };

    var removeTransition = function () {
        banner.style.webkitTransition = "none";
        banner.style.transition = "none";
    };

    var setTranslateX = function(translateX){
        banner.style.webkitTransform = "translateX("+translateX+"px)";
        banner.style.transform = "translateX("+translateX+"px)";
    };

    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
 
    /*记录当前定位*/
    var currX = 0;

    banner.addEventListener('touchstart',function(e){

        startX = e.touches[0].clientX;

    });

    banner.addEventListener('touchmove',function(e){

        moveX = e.touches[0].clientX;

        distanceX = moveX - startX;

         /*.在一定的区间范围内  滑动  通过控制  滑动定位的区间的实现*/
        /*我们将要去做定位的位置 要在  滑动区间范围内*/
        if((currX + distanceX) < maxSwipe && (currX + distanceX) > minSwipe){
            /*删除过渡*/
           console.log(currX)
            removeTransition();
            /*做定位*/
            setTranslateX(currX + distanceX);
        }
       
    })

    /*避免模拟器上的bug问题   事件冒泡机制*/
    window.addEventListener('touchend',function(e){
        /*3.在一定的区间内 做定位     定位区间*/
        /*将要定位的位置 大于  最大定位的时候*/
        if((currX + distanceX) > maxPosition){          // 左边吸附回去
       
            currX = maxPosition;
       
            addTransition();

            setTranslateX(currX);
        }
        /*将要定位的位置 小于  最小定位的时候*/
        else  if ((currX + distanceX) < minPosition){   //  右边吸附回去
            currX = minPosition;

            addTransition();

            setTranslateX(currX);
        }
        /*正常*/
        else {
            /*设置当前的定位*/
            currX = currX + distanceX;
        }

        /*重置参数*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
    });

  }


var downTime = function(){
    
    /*需要倒计时的时间*/
    var time = 5 * 60 * 60 ;
    var skTime = document.querySelector('.sk_time');
    var spans = skTime.querySelectorAll('span');
    //初始化
    setInterval(timer,1000);

    function timer(){     
      	if(time <= 0){
            clearInterval(timer);
            return false;
        }
        time -- ;

        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = time%60;

        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;
    };
    timer();

}	


   function move(){

         var data = [
            {msg:'小藏獒给奶奶养了一个月，再见却不认识了'},
            {msg:'为什么现在很多的车，都取消了雾灯？'},
            {msg:'花十万装修的新房，客厅太好看了！'},
            {msg:'为什么酒店的床尾要放一块布？涨知识了！'},
            {msg:'买了20年鞋子，才知道鞋盒里白布这样'},
            {msg:'小藏獒给奶奶养了一个月，再见却不认识了'}
         ];
        var box1 = document.querySelector('.box1');
        var box = document.querySelector('.box');
         
        
        for(let i = 0; i< data.length;i++){
            let odiv = document.createElement('div');
            odiv.innerHTML += '<li class="inner">'+data[i].msg+'</li>';
            box.appendChild(odiv)
        }

        var index = 0;
        timer = setInterval(() => {   

           index++;

           box.style.transition = 'all 0.6s';               
          // 位移
           box.style.transform = 'translateY('+(-index*box1.offsetHeight)+'px)';                   
        }, 3000);

        box.addEventListener('transitionend',function(){     

             if(index >= 5){

               index = 0;

             box.style.transition = 'none';                
             // 位移
             box.style.transform='translateY('+(-index*box1.offsetHeight)+'px)';

             }
        });           
  };

  // 图片加载
 function load(){ 
    
  window.addEventListener('scroll',function(){
   
    var [html,clientH,scrollTop,scrollHeight] = [null,document.documentElement.clientHeight,
        document.documentElement.scrollTop,document.documentElement.scrollHeight]
        
     if(clientH + scrollTop + 250 > scrollHeight && scrollTop + 300 < 2000){
         $.ajax({
           url: "data.json",
           type: "get",
           dataType: "json",
           data: null,
           cache: false,  // 是否走缓存item
           success: function (data) {
               data.forEach((item) => {        
                   html = `<div><img src="images/dafult1-1.png" data-src="${item.img}" class="Img">
                   <p class="product_info">${item.title}</p>
                       <span>${item.price}</span></div>` 
                   $('.recommend').append(html)                                                    
               });                 
            }      
           });      
       } 
       var parent = document.querySelector('.recommend');
       var Img = parent.querySelectorAll('img');
       //console.log(Img)
       delayLoad(Img);       
    });      
   
 }    

function delayLoad(imgList) {

    // Es6
    let [scrollTop,clientHeight,timer] = [document.documentElement.scrollTop,
                                          document.documentElement.clientHeight,null]
    
    window.addEventListener('scroll',function(){

     for (var i = 0; i < imgList.length; i++) {

        if (scrollTop + clientHeight >= imgList[i].offsetTop + imgList[i].offsetHeight) {
            // 监听img
            var img = new Image;
            img.src = imgList[i].getAttribute("data-src");
            img.index = i;
            // 加载img onload事件
            img.onload = function () {
                imgList[this.index].src = this.src;
                //img = null;
            }
          
          imgList[i].style.opacity = 1;
          
         }
       }
    })  
}

  // 改变窗口重新刷新
    window.addEventListener("resize",function(){
         
        window.location.reload(); 

    },false)

  



   
    
    
   

