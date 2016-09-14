
import React, { Component } from 'react';
import './css/drawscene.css';
import Button from './Button.jsx';
import $ from 'zeptojs';

export default class DrawScene extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	 cardShow:false,
	  	 current:0,
	  	 showTeam:false,
	  	 isNext:false,
	  	 isEdit:true,
	  	 placeholder:'请输入我的祝福语(50字以内)',
	  	 face:'',
	  	 style:{},
	  	 wishContent:'中秋节，月圆是画，月缺是诗。如诗如画，良辰美景，送给我心爱的你。遥远的星空下，共同仰望同样的美月，是你我心灵的契约！ ',
	  	 wishAuthor:'某某某',
	  	 textClass:''
	  };
	}
	render() {
		let imgShow =this.props.imgShow;
		return (
			<div className={'fly-draw-scene '+ this.props.className} ref='fly-draw-scene'>
					{imgShow && <img src='./assets/images/text.png' className={'fly-text-img '+ this.state.textClass} ref='fly-text-img'/>}
				{!this.state.cardShow && <div>
					<header>开始绘制我的私人订制月亮吧</header>
					<div className='fly-draw-C' ref='fly-draw-C'>
						<canvas ref='draw'></canvas>
						<div className='fly-center-circle'></div>
						
					</div>
					<div className='fly-btn-C'>
						<Button callBack={this.reDraw.bind(this)} text='重画'></Button>
						<Button callBack={this.clipImg.bind(this)} text='确定'></Button>
					</div>
				</div>}
				{this.state.cardShow && <div className='fly-card-C' ref='fly-card-C'>
					{imgShow && <img src='./assets/images/card.png'/>}
					{this.state.face && <img src={this.state.face} ref='fly-face' className='fly-face' style={this.state.style} />}
					<p className='fly-wish-words' ref='fly-wish-words'>{this.state.wishContent}</p>
					<p className='fly-wish-name' ref='fly-wish-name'>{this.state.wishAuthor}</p>
					<div className='fly-edit-wish'>
						<section>{this.state.isEdit&& <Button callBack={this.editMyWish.bind(this)}  text='编写我的祝福语'></Button>}</section>
						{this.state.isNext&& <Button callBack={this.next.bind(this)} text='下一步' ></Button>}
					</div>
					{this.state.showNext && <div className='fly-wish-btns' ref='fly-wish-btns'>
						<Button callBack={this.clearWish.bind(this)}></Button>
						<Button callBack={this.prepareShare.bind(this)} text='确定'></Button>	
					</div>}
					{this.state.current&&<div className='fly-edit-C'>
						<section>
							<textarea ref='fly-wish-text' placeholder={this.state.placeholder}></textarea>
							<Button text='确定' callBack={this.updateWish.bind(this)}></Button>
						</section>
					</div>}
				</div>
			}

			</div>
		);
	}


	showTeam(){
		this.setState({
			showTeam:true
		})
	}

	next(){
		this.setState({
			current:2,
			isNext:false,
			placeholder:'请输入祝福者'
		});
	}

	updateWish(e){
		//console.log(e.nativeEvent.target.parentNode.querySelector('span'))
		if(this.state.current === 1){
			this.setState({
				wishContent:this.refs['fly-wish-text'].value,
				isEdit:false,
				current:0,
				isNext:true
			});	
		}
		else if(this.state.current === 2){
			this.setState({
				wishAuthor:this.refs['fly-wish-text'].value,
				isEdit:false,
				current:0,
				isNext:false,
				showNext:true
			});	
		}
		
	}

	editMyWish(){//填写我的祝福语
		this.setState({
			current:1,
			placeholder:'请输入我的祝福语(50字以内)'
		});
	}
	componentDidMount() {
		 
		setTimeout(()=>{
			this.canvasInit(this.setSize());
		},1);
		
	}

	wishContentfocus(e){
		//document.getElementById('fly-main').style.WebkitTransform='translate3d(0,0,0)';
		let isName =e.target.classList.contains('fly-wish-author');
		//document.getElementById('fly-main').style.WebkitTransform='translate3d(0,'+(isName?'-8.7rem':'-7.7rem')+',0)'
		e.target.style.WebkitTransform =  'translate3d(0,'+(isName ? '-7.7rem' : '-6rem')+',0)';
		//e.target.position = 'fixed';
		e.target.style.background =  '#fff';

	}
	wishContentblur(e){
		//document.getElementById('fly-main').style.WebkitTransform='translate3d(0,0,0)'
		e.target.style.WebkitTransform =  'translate3d(0,0,0)';
		e.target.style.background =  'transparent';
	}

	checkWords(e){//检查输入的祝福内容的字数
		if(e.target.value.length > 50){
			e.target.value = e.target.value.substr(0,50);
		}
	}

	clearWish(){//清空祝福语
		this.setState({
			wishContent:'',
			wishAuthor:'',
			 current:0,
		  	 isNext:false,
		  	 isEdit:true,
		});
		
	}

	prepareShare(){//点击确定准备开始跳转到分享的页面去。
		//this.refs['fly-wish-words'].innerHTML = this.refs['fly-wish-content'].value;
		//this.refs['fly-wish-name'].innerHTML = this.refs['fly-wish-author'].value;
		let card=this.refs['fly-card-C'];
		card.style.WebkitTransform = 'scale(.1)';
		card.style.WebkitTransformOrigin = 'top';
		let doc = document;
		doc.querySelector('.fly-window').classList.add('active');
		let box = doc.querySelector('.fly-box');
		box.classList.add('active');
		box.style.WebkitTransitionDelay = '4s';
		
		setTimeout(()=>{
			doc.querySelector('.fly-box img').src='./assets/images/boxopen.png';			
			card.style.WebkitTransform = 'scale(.1) translate(24rem,80rem)';
			card.style.WebkitTransition = '2s 1s';
			card.style.opacity = 0;
			setTimeout(()=>{
				doc.querySelector('.fly-box img').src='./assets/images/box.png';
				
				setTimeout(()=>{
					let data ={
						img:this.state.face,
						content:encodeURI(this.state.wishContent),
						author:encodeURI(this.state.wishAuthor)
					}
	 				let json = encodeURI(JSON.stringify(data));
					window.location.href='./share.html?data='+json;
				},4000)
			},4000);

			//window.float();
			
			this.setState({
				textClass:'active'
			});

		},3*1000);

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
			},
			cardShow:true

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
							self.refs['fly-card-C'].style.WebkitTransform = 'translate3d(0,-1.7rem,0)';
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
			let i =0 ;
		let touchmoveHandler = e=>{
			
			//e.preventDefault();
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
		let imgs = [
			'./assets/images/face1.png',
			'./assets/images/face2.png',
			'./assets/images/face3.png',
			'./assets/images/face4.png',
			'./assets/images/face5.png'
		];
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
		let index = Math.random()*5|0;
		img.src=  imgs[index];
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
