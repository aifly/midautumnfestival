
import React, { Component } from 'react';
import './css/drawscene.css';
import Button from './Button.jsx';
import $ from 'zeptojs';

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
					<Button callBack={this.reDraw.bind(this)} text='重画'></Button>
					<Button callBack={this.clipImg.bind(this)} text='确定'></Button>
				</div>
			</div>
		);
	}
	componentDidMount() {
		 
		setTimeout(()=>{
			this.canvasInit(this.setSize());
		},1)
	}

	reDraw(){//重绘
		this.stage.removeAllChildren();
		this.stage.update();
		this.target = null;
	}
	clipImg(){//点击确定后，上传并裁剪图片。
		if(!this.data){
			return;
		}
		this.data.setcontents= this.refs['draw'].toDataURL();
		console.log(this.data);
		return;
		let self = this;
		$.ajax({
			type:"POST",
			url:"http://api.zmiti.com/v2/share/base64_image/",
			data:self.data,
			success(da){
				if(da.getret === 0 ){//上传正确
					console.log(da.getimageurl);
				}
			}
		})
	}
	canvasInit(size){
		let canvas = this.refs['draw'],
			offsetTop = this.refs['fly-draw-C'].offsetTop;
			 
		var stage = new createjs.Stage(canvas);
		this.stage = stage;


		let	startX = 0,
			startY = 0,
			posX = [],
			posY = [];


			


		let touchmoveHandler = e=>{

			e.preventDefault();
			var x = e.changedTouches[0].pageX,
				y = e.changedTouches[0].pageY-offsetTop;
				posX.push(x);
				posY.push(y);
			this.draw(x,y,false);
			stage.update();
			return 0;
		}

		

		let touchendHandler = e=>{
			
			this.draw(startX,startY,false,true);
			
			this.masks(size);
			this.data = {
				
				setimage_x : Math.min.apply(null,posX)|0,
				setimage_y : (Math.min.apply(null,posY) + 1) | 0,
				setimage_w : (Math.max.apply(null,posX) - Math.min.apply(null,posX) + 1)|0,
				setimage_h : (Math.max.apply(null,posY) - Math.min.apply(null,posY) + 1)|0
			}

			
			document.removeEventListener('touchmove',touchmoveHandler);
			document.removeEventListener('touchend',touchendHandler);

		}		
		
		canvas.addEventListener('touchstart',e=>{
			var x = e.changedTouches[0].pageX,
				y = e.changedTouches[0].pageY-offsetTop;
				posX.length = 0;
				posY.length = 0;
			startX =x;
			startY = y;
			let shape = new createjs.Shape();
			this.reDraw();
			this.shape = shape;
			stage.addChild(shape);

			this.draw(x,y);
			
			document.addEventListener('touchmove',touchmoveHandler);
			document.addEventListener('touchend',touchendHandler);
			return 0;
		});

	}

	masks(size){
		var img = new Image();
		let self = this;
		img.onload = function(){
			let bitMap = new createjs.Bitmap(this);
			bitMap.x = size/ 2 - this.width /2;
			bitMap.y = size/ 2 - this.height /2;

			self.stage.addChild(bitMap);
			
			bitMap.mask = self.shape;
			self.stage.update();
		}
		img.src=  './assets/images/sun-sm.png';
	}

	draw(x,y,flag = true,flag1 = false){

		this.target = this.target || this.shape.graphics.setStrokeStyle(3).beginStroke('transparent');
		if(flag){
			//var target = this.shape.graphics.beginStroke('#fff');
		}

		this.target[flag ? "moveTo":'lineTo'](x,y);
		flag1 && this.target.lineTo(x,y);
	}

	setSize(){
		let size = document.documentElement.clientWidth;
		this.refs['draw'].width = size;
		this.refs['draw'].height = size;
		return size;
	}
}
