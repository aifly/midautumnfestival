
import Moon from './libs/moon';
let data = {
	canvas:document.getElementById('canvas'),
}


let moon = new Moon({
	canvas:data.canvas,
	width:document.documentElement.clientWidth,
	height:document.documentElement.clientHeight

});


let timer = null;
let isCanDraw= false;
data.canvas.addEventListener("touchstart",e=>{
	var e = e.targetTouches[0];
	moon.beginDraw();
	moon.draw(e.pageX,e.pageY);
	isCanDraw = true;

});
document.addEventListener('touchmove',e=>{
	if(isCanDraw){
		var e = e.targetTouches[0];
		moon.draw(e.pageX,e.pageY);	
		console.log(moon.pointArr.length)
	}
	return 0;
});
document.addEventListener('touchend',e=>{
	isCanDraw =false;

});

document.getElementById('clear').addEventListener('touchstart',()=>{
	moon.clear();
});