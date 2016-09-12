
import React, { Component } from 'react';
import './css/drawscene.css';
import Button from './Button.jsx';

export default class DrawScene extends Component {
	render() {
		return (
			<div className='fly-draw-scene'>
				<header>开始绘制我的私人订制月亮吧</header>
				<div className='fly-draw-C' ref='fly-draw-C'>
					<canvas ref='draw'></canvas>
					<div className='fly-center-circle'></div>
				</div>
				<div className='fly-btn-C'>
					<Button text='重画'></Button>
					<Button text='确定'></Button>
				</div>
			</div>
		);
	}
	componentDidMount() {
		 
		setTimeout(()=>{
			this.canvasInit(this.setSize());
		},1)
	}

	canvasInit(size){
		let canvas = this.refs['draw'],
			offsetTop = this.refs['fly-draw-C'].offsetTop;
			 
		var stage = new createjs.Stage(canvas);

		let shape = new createjs.Shape();


		this.shape = shape;

		let touchmoveHandler = e=>{
			var x = e.changedTouches[0].pageX,
				y = e.changedTouches[0].pageY-offsetTop;
			this.draw(x,y,false);
			stage.update();
		}

		stage.addChild(shape);

		let touchendHandler = e=>{
			document.removeEventListener('touchmove',touchmoveHandler);
			document.removeEventListener('touchend',touchendHandler);
		}		

		console.log(offsetTop)
		
		canvas.addEventListener('touchstart',e=>{
			var x = e.changedTouches[0].pageX,
				y = e.changedTouches[0].pageY-offsetTop;
			this.draw(x,y);
			
			document.addEventListener('touchmove',touchmoveHandler);
			document.addEventListener('touchend',touchendHandler);

		});

	}

	draw(x,y,flag = true){
		this.target = this.target || this.shape.graphics.beginStroke('#fff');
		if(flag){
			//var target = this.shape.graphics.beginStroke('#fff');
		}
		this.target[flag ? "moveTo":'lineTo'](x,y);
	}

	setSize(){
		let size = document.documentElement.clientWidth;
		this.refs['draw'].width = size;
		this.refs['draw'].height = size;
		return size;
	}
}
