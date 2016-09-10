import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Moon from './libs/moon';
import Button from './components/Button.jsx';
import './assets/css/index.css';
/*let moon = new Moon({
	width:document.documentElement.clientWidth,
	height:document.documentElement.clientHeight

});*/

let data = {
	width:document.documentElement.clientWidth,
	height:document.documentElement.clientHeight	
}



var util = {

	init(){	
		this.setDefault();
	},
	setDefault(){
		document.querySelector('html').style.fontSize = data.width / 10 + 'px';
	}

}

util.init();

class App extends Component {
	render() {
		return (
			<div style={{margin:20}}>
				<Button callBack={this.reDraw}></Button>

				<div style={{height:30}}></div>

				<Button text='确定' callBack={this.ok}></Button>

				<div style={{height:30}}></div>
				
				<Button text='分享'  className='vertical-btn' callBack={this.ok}></Button>				
			</div>

		);
	}
	reDraw(){
		console.log('reDraw()');
	}
	ok(){
		console.log('ok');
	}

}

ReactDOM.render(<App></App>,document.getElementById('fly-main'));







/*

data.canvas.addEventListener("touchstart",e=>{
	var e = e.targetTouches[0];
	moon.beginDraw();
	moon.draw(e.pageX,e.pageY);
	isCanDraw = true;

});
document.addEventListener('touchmove',e=>{
	e.preventDefault();
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
});*/