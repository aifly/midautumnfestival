
import React, { Component } from 'react';
import './css/drawscene.css';
import Button from './Button.jsx';
import $ from 'zeptojs';

export default class DrawScene extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	 face:'',
	  	 style:{}
	  };
	}
	render() {
		return (
			<div className='fly-draw-scene' ref='fly-draw-scene'>
				<header>开始绘制我的私人订制月亮吧</header>
				<div className='fly-draw-C' ref='fly-draw-C'>
					<canvas ref='draw'></canvas>
					<div className='fly-center-circle'></div>
					
				</div>
				<div className='fly-btn-C'>
					<Button callBack={this.reDraw.bind(this)} text='重画'></Button>
					<Button callBack={this.clipImg.bind(this)} text='确定'></Button>
				</div>
				<div className='fly-card-C' ref='fly-card-C'>
					<img src='./assets/images/card.png'/>
					{this.state.face && <img src={this.state.face} ref='fly-face' className='fly-face' style={this.state.style} />}
					<p className='fly-wish-words' ref='fly-wish-words'>中秋节 月圆是画，月缺是诗。如诗如画，良辰美景，送给我心爱的你。遥远的星空下，共同仰望同样的美月，是你我心灵的契约！ </p>
					<p className='fly-wish-name' ref='fly-wish-name'>@某某某</p>
					<textarea onChange={this.checkWords.bind(this)} ref='fly-wish-content' className='fly-wish-content' placeholder='输入我的祝福语(50字以内)'></textarea>
					<input ref='fly-wish-author' className='fly-wish-author' placeholder='祝福人'/>
					<div className='fly-wish-btns' ref='fly-wish-btns'>
						<Button callBack={this.clearWish.bind(this)}></Button>
						<Button callBack={this.prepareShare.bind(this)} text='确定'></Button>	
					</div>
				</div>

			</div>
		);
	}
	componentDidMount() {
		 
		setTimeout(()=>{
			this.canvasInit(this.setSize());
		},1)
	}

	checkWords(e){
		if(e.target.value.length > 50){
			e.target.value = e.target.value.substr(0,50);
		}
	}

	clearWish(){
		this.refs['fly-wish-author'].value = '';
		this.refs['fly-wish-content'].value = '';
	}

	prepareShare(){//点击确定准备开始跳转到分享的页面去。
		this.refs['fly-wish-words'].innerHTML = this.refs['fly-wish-content'].value;
		this.refs['fly-wish-name'].innerHTML = this.refs['fly-wish-author'].value;
	}

	reDraw(){//重绘
		this.stage.removeAllChildren();
		this.stage.update();
		this.target = null;
	}
	clipImg(){//点击确定后，上传并裁剪图片。
		if(!this.stage.children.length){
			return false;
		}
		this.data.setcontents= this.refs['draw'].toDataURL();
		var cacheCanvas = document.createElement('canvas');
		let size = Math.max(this.data.setimage_w,this.data.setimage_w)
		cacheCanvas.width = size;
		cacheCanvas.height = size;
		this.setState({
			style:{
				left:'1.5rem',
				width:'2rem',
				height:'2rem'
			}
		})
		var context = cacheCanvas.getContext('2d');
		context.drawImage(this.refs['draw'],this.data.setimage_x,this.data.setimage_y,size,size,0,0,size,size);
		this.data.setimage_w = this.data.setimage_h = size;
		//this.data.setcontents = cacheCanvas.toDataURL();

		
		let self = this;
		
		let rem = document.documentElement.clientWidth/ 10;
		$.ajax({
			type:"POST",
			url:"http://api.zmiti.com/v2/share/base64_image/",
			data:{
				setcontents:cacheCanvas.toDataURL()
			},
			success(da){
				if(da.getret === 0 ){//上传正确
					cacheCanvas = null;
					self.data = null;
					
					self.setState({
						face:da.getimageurl
					},()=>{
						self.refs['fly-face'].onload = function(){
							this.style.WebkitTransition = '3.6s';
							//this.style.WebkitTransform = 'translate3d('+(-2)+'rem,0,0)';
							self.refs['fly-card-C'].style.WebkitTransform = 'translate3d(0,0,0)';
							self.refs['fly-draw-scene'].classList.add('hide');
						}
					})
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
		img.src=  './assets/images/face1.png';
	}

	draw(x,y,flag = true,flag1 = false){

		this.target = this.target || this.shape.graphics.setStrokeStyle(3).beginStroke('#fff');
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
