import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Moon from './libs/moon';
import Button from './components/Button.jsx';
import Star from './components/star.jsx';

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
		let starProps = {
			width:data.width,
			height : data.height
		}
		return (
			<div ref='main' className='fly-main-C'>
				<div className='fly-meteor-C'>
					<img src='./assets/images/meteor.png' className='meteor'/>
				</div>
				<div className='fly-meteor-C fly-meteor-C1'>
					<img src='./assets/images/meteor.png' className='meteor'/>
				</div>
				
				<div className='fly-moon' ref='moon'>
					<img src='./assets/images/moon.png'/> 
					<div className='fly-shine'></div>
					<div className='fly-shine'></div>
					<div className='fly-shine'></div>
					<div className='fly-shine'></div>
				</div>

				<div className='fly-moon-heart'>
					<img src='./assets/images/moon-heart.png'/>
				</div>
				<article className='fly-text'>
					<p>一轮圆月，温暖有你陪伴的时光；</p>
					<p>一段心声，跨越咫尺天涯的距离。</p>
				</article>
				<div className='fly-window'>
					<img src='./assets/images/window.png'/>
				</div>
				<div className='fly-women'>
					<img src='./assets/images/women.png'/>
				</div>
				<div className='fly-rabbit'>
					<img src='./assets/images/rabbit.png'/>
				</div>

				<div className='fly-box'>
					<img src='./assets/images/box.png' />
				</div>

				<div className='fly-rabbit-r'>
					<img src='./assets/images/rabbit_r.png' />
				</div>

				<Star {...starProps}></Star>


				{/*
				<Button callBack={this.reDraw}></Button>

				<div style={{height:30}}></div>

				<Button text='确定' callBack={this.ok}></Button>

				<div style={{height:30}}></div>
				
				<Button text='分享'  className='vertical-btn' callBack={this.ok}></Button>		*/}		
			</div>

		);
	}
	reDraw(){
		console.log('reDraw()');
	}
	ok(){
		console.log('ok');
	}
	componentDidMount() {
		this.showShine();
		//this.showMoon();
		setTimeout(()=>{
			this.refs['main'].classList.add('active');
		},1000);
	}

	showShine(){
		var shines = this.refs['main'].querySelectorAll('.fly-shine'),
			len = shines.length;
			for(var i = 0; i < len ; i++){
				shines[i].classList.add('active');
			}
		
	}
	showMoon(){
		setTimeout(()=>{
			this.refs['moon'].classList.add('active');
		},1500)
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