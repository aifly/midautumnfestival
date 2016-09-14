import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Button from './components/Button.jsx';
/*import Star from './components/star.jsx';*/

import DriftDown from './libs/driftdown';
import DrawScene from './components/draw-scene.jsx';
import {utilMethods, _$, $$} from './libs/utilMethod.js';
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
	constructor(props) {
		super(props);
	  this.state = {
	  	indexShow : true,
	  	smailShow:false,
	  	loadingShow:true,
	  	textShow:true,
	  	moonShow:true,
	  	dialogShow:false,
	  	DrawSceneShow:false,
	  	windowShow:true,
	  	boxShow:true,
	  	laternPlumShow:true,
	  	rabbitShow:true,
	  	shadow:false,
		showTeam:false,
		progress:0,
		imgShow:false,
		showTeamBtn:false,
	  	 images:[
	  	 	'moon-heart',
	  	 	'rabbit',
	  	 	'women'
	  	 ],
	  	 loadingImgs:[
	  	 	'./assets/images/300.jpg',
	  	 	'./assets/images/box.png',
	  	 	'./assets/images/boxopen.png',
	  	 	'./assets/images/dialog.png',
	  	 	'./assets/images/face1.png',
	  	 	'./assets/images/face2.png',
	  	 	'./assets/images/face3.png',
	  	 	'./assets/images/face4.png',
	  	 	'./assets/images/face5.png',
	  	 	//'./assets/images/finger.png',
	  	 	//'./assets/images/logo.png',
	  	 	'./assets/images/moon.png',
	  	 	'./assets/images/moon-heart.png',
	  	 	'./assets/images/rabbit-r.png',
	  	 	'./assets/images/rabbit-l.png',
	  	 	'./assets/images/shadow.png',
	  	 	'./assets/images/share-btn.png',
	  	 	'./assets/images/smail.gif',
	  	 	'./assets/images/sun-sm.png',
	  	 	'./assets/images/text.png',
	  	 	'./assets/images/window.png',
	  	 	'./assets/images/women.png'
	  	 ]
	  };
	  this.showBox = this.showBox.bind(this);

	}
	render() {
		let starProps = {
			width:data.width,
			height : data.height/2
		}

		let shadowStyle = {
			background:'url(./assets/images/shadow.png) no-repeat right center',
			backgroundSize:'cover',
			display:this.state.shadow?'block':'none'
		}

		return (
			<div ref='main' className='fly-main-C ' onTouchTap={this.showBox}>
				<div className='fly-shadow' style={shadowStyle}></div>
				{/*<div className='fly-meteor-C'>
					<img src='./assets/images/meteor.png' className='meteor'/>
				</div>
				<div className='fly-meteor-C fly-meteor-C1'>
					<img src='./assets/images/meteor.png' className='meteor'/>
				</div>*/}

				{this.state.moonShow &&<div className='fly-moon' ref='moon'>
					{this.state.imgShow && <img src='./assets/images/moon.png'/> }
					{/*<div className='fly-shine'></div>
										<div className='fly-shine'></div>
										<div className='fly-shine'></div>
										<div className='fly-shine'></div>*/}
				</div>}

				
				{this.state.textShow && this.state.imgShow && <article ref='fly-text' className='fly-text'>
					<p>一轮圆月，温暖有你陪伴的时光</p>
					<p>一段心声，跨越咫尺天涯的距离</p>
				</article>}

				{this.state.indexShow && this.state.images.map((item,i)=>{
					return(
						<div key={i}  className={'fly-'+item}>
							{this.state.imgShow && <img src={'./assets/images/'+item+'.png'}/>}
						</div>
					)
				})}

				

				{/*<div className='fly-logo'>
					{this.state.imgShow && <img src={'./assets/images/logo.png'}/>}
				</div>

				<div className='fly-plum'>
					{this.state.imgShow && <img src={'./assets/images/plum.png'}/>}
				</div>*/}

				{this.state.rabbitShow && <div className='fly-rabbit-r'>
					{this.state.imgShow && <img src={'./assets/images/anniu.png'}/>}
				</div>}

				{this.state.windowShow&&<div className='fly-window'>
					{this.state.imgShow && <img src={'./assets/images/window.png'}/>}
				</div>}

				{this.state.boxShow&&<div className='fly-box'>
					{this.state.imgShow && <img src={'./assets/images/box.png'}/>}
				</div>}

				{this.state.smailShow && <div className='fly-sun-sm ' ref='fly-sun-sm'>
					{this.state.imgShow && <img src='./assets/images/smail.gif' className='smail'/>}
				{/*this.state.dialogShow||*/}
					{this.state.dialogShow && <div className="fly-dialog " ref='fly-dialog'>
						{this.state.imgShow && <img src='./assets/images/dialog.png'/>}
						<Button countX={24} text='制作我的月亮信笺' className="horizontal-btn my-moon-letterhead" callBack={this.entryDrawPannel.bind(this)}></Button>	
					</div>}
				</div>}

				

				<audio autoPlay loop src='./assets/images/bg.mp3'></audio>
 
				{this.state.DrawSceneShow  && <DrawScene imgShow={this.state.imgShow } className='active'></DrawScene>}
 
				{this.state.loadingShow && <div className='fly-mask' ref='fly-mask'>
					<div className='fly-loading-C'>
						<img src='./assets/images/loading.png'/>
						<img src='./assets/images/loading-cloud.png'/>
					</div>
					<div className='loading-text'>
						loading...<span className='process' ref='progress'>{this.state.progress}%</span>
					</div>
				</div>}

				

				{/*
				<Button callBack={this.reDraw}></Button>

				<div style={{height:30}}></div>

				<Button text='确定' callBack={this.ok}></Button>

				<div style={{height:30}}></div>
				
				<Button text='分享'  className='vertical-btn' callBack={this.ok}></Button>		*/}		
			</div>

		);
	}


	showBox(e){//打开盒子

		this.isShowBox = this.isShowBox || 1;
		if(this.getStyle(e.target.parentNode,'opacity')<=.5 || this.isShowBox === 2){
			return;
		}
		if(e.target.parentNode.classList.contains('fly-box')){
			this.isShowBox = 2;
			//clearTimeout(this.entryTime);
			e.target.src='./assets/images/boxopen.png';
			this.refs['main'].querySelector('.fly-sun-sm').classList.add('active');
			this.setState({shadow:true});
		}
	}

	getStyle(ele,val){

	  var style = null;
      
      if(window.getComputedStyle) {
          style = window.getComputedStyle(ele, null);
      }else{
          style = ele.currentStyle;
      }
   	  return style[val];

	}
	 
	componentDidMount() {
		///this.showShine();
		let main = this.refs['main'];
		this.main=  main;

		
		window.float = this.float;

		let progress = this.refs['progress']

		utilMethods.loading(this.state.loadingImgs,(p)=>{
			this.setState({
				progress:Math.round(p * 100)
			})

		},()=>{

			this.setState({
				loadingShow:false,
				imgShow:true
			});

			let startX=0,
			startY = 0;

			var t = setTimeout(()=>{
				this.init();
			},5000);

			this.use = 1;
			document.addEventListener('touchstart',e=>{
				if(this.use === 1){
					var e = e.changedTouches[0];
					startY = e.pageY;
				}
			});
			document.addEventListener('touchend',e=>{
				if(this.use === 1){
					this.use = 2;
					var e = e.changedTouches[0];
					if(Math.abs(e.pageY - startY )> 50){
						clearTimeout(t);
						this.init();

					}
				}
			});
			 
		});

		
	}

	init(){
		let main = this.refs['main'];
		main.classList.add('active');
		//this.float(this);
		this.setState({
			smailShow:true
		});

		this.refs['fly-text'].addEventListener('webkitTransitionEnd',()=>{
			this.setState({
				indexShow:false,
				dialogShow:true,
				textShow:false,
				moonShow:false
			});
			
			//this.refs['fly-dialog'].classList.add('active');
		});

		this.refs['fly-sun-sm'].addEventListener('webkitTransitionEnd',(e)=>{
			if(e.propertyName.indexOf('transform')>-1){
				this.refs['fly-dialog'].classList.add('active');
				this.setState({
					rabbitShow:false
				})
			}
		});


	}

	float(_this){

 
	}

	showShine(){
		var shines = this.refs['main'].querySelectorAll('.fly-shine'),
			len = shines.length;
		for(var i = 0; i < len ; i++){
			shines[i].classList.add('active');
		}
	}

	entryDrawPannel(){//进入绘制区域
		
		this.main.classList.remove('active');
		this.main.classList.add('drawscene');
		
		this.timer && clearInterval(this.timer);
		
		this.refs['fly-dialog'].classList.add('hide');

		this.refs['fly-dialog'].addEventListener('webkitTransitionEnd',()=>{

			this.setState({
				smailShow:false,
				dialogShow:false,
				DrawSceneShow:true,
				laternPlumShow:false,
				rabbitShow:false,
				indexShow:false,
				showTeamBtn:true
			});

		});  
	}

	rabbitOut(){
		//this.main.querySelector('.fly-rabbit-r').classList.add('hide');
		

	}

	plumOut(){
		/*this.main.querySelector('.fly-plum').style.opacity=0;
		let petal= this.main.querySelectorAll('.fly-petal');
		let latern= this.main.querySelectorAll('.fly-latern');
		petal[0].style.opacity=0;
		petal[1].style.opacity=0;
		petal[2].style.opacity=0;
		latern[0].style.opacity=0;
		latern[1].style.opacity=0;
		latern[2].style.opacity=0;*/
		
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