

window.onload = function(){

    //左侧滑动
    leftswipe();

    //右侧滑动
    // right();
}

var leftswipe = function(){

    //1.上下滑动 (touch事件，位移)

    var parentBox=document.querySelector('.jd_category_left');

    var childBox=parentBox.querySelector('ul');

    var startY=0;
    var distanceY=0;

     //当前的位置
     var currentY=0;

    childBox.addEventListener('touchstart',function(e){
       startY=e.touches[0].clientY;

    });
    childBox.addEventListener('touchmove',function(e){
    	var moveY=e.touches[0].clientY;
    	distanceY=moveY-startY;
    	console.log(distanceY);
           
    	var translateY = currentY+distanceY;
    	childBox.style.transform='translateY('+translateY+'px)';
    	childBox.style.webkitTransform='translateY('+translateY+'px)';
    });
    childBox.addEventListener('touchend',function(e){
    	
    	/*滑动完成后记录位置*/
         currentY  = currentY+distanceY;
    })



}

// var rightswipe=function(){
	
// }