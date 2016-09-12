
import React, { Component } from 'react';
import './css/drawscene.css';
import Button from './Button.jsx';

export default class DrawScene extends Component {
	render() {
		return (
			<div className='fly-draw-scene'>
				<header>开始绘制我的私人订制月亮吧</header>
				<div className='fly-draw-C'>
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
		 
		this.canvasInit(this.setSize());
	}

	canvasInit(size){
		let canvas = this.refs['draw'];
		var stage = new createjs.Stage(canvas);

		let shape = new createjs.Shape();

		shape.graphics.beginFill('').drawRect(0,0,size,size);
		shape.on('mousedown',()=>{
			alert(23)
		});

		stage.addChild(shape);
		stage.update();
	}

	setSize(){
		let size = document.documentElement.clientWidth;
		this.refs['draw'].width = size;
		this.refs['draw'].height = size;
		return size;
	}
}
