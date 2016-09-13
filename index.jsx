import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Button from './components/Button.jsx';
import Star from './components/star.jsx';

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
	  	shadow:false,
	  	 images:[
	  	 	'moon-heart',
	  	 	'latern',
	  	 	'latern',
	  	 	'latern',
	  	 	'plum',
	  	 	'house',
	  	 	'window',
	  	 	'rabbit',
	  	 	'rabbit-r',
	  	 	'women',
	  	 	'box',
	  	 	'petal',
	  	 	'petal',
	  	 	'petal',

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
	  	 	'./assets/images/finger.png',
	  	 	'./assets/images/house.png',
	  	 	'./assets/images/latern.png',
	  	 	'./assets/images/logo.png',
	  	 	'./assets/images/meteor.png',
	  	 	'./assets/images/moon.png',
	  	 	'./assets/images/moon-heart.png',
	  	 	'./assets/images/petal.png',
	  	 	'./assets/images/plum.png',
	  	 	'./assets/images/rabbit.png',
	  	 	'./assets/images/rabbit-r.png',
	  	 	'./assets/images/rabbit-l.png',
	  	 	'./assets/images/shadow.png',
	  	 	'./assets/images/share-btn.png',
	  	 	'./assets/images/smail.gif',
	  	 	'./assets/images/sun-sm.png',
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
			height : data.height
		}

		let shadowStyle = {
			background:'url(./assets/images/shadow.png) no-repeat right center',
			backgroundSize:'cover',
			display:this.state.shadow?'block':'none'
		}

		return (
			<div ref='main' className='fly-main-C ' onTouchTap={this.showBox}>
				<div className='fly-shadow' style={shadowStyle}></div>
				<div className='fly-meteor-C'>
					<img src='./assets/images/meteor.png' className='meteor'/>
				</div>
				<div className='fly-meteor-C fly-meteor-C1'>
					<img src='./assets/images/meteor.png' className='meteor'/>
				</div>

				<div className='fly-meteor-C fly-meteor-C2'>
					<img src='./assets/images/meteor.png' className='meteor'/>
				</div>
				
				<div className='fly-moon' ref='moon'>
					<img src='./assets/images/moon.png'/> 
					<div className='fly-shine'></div>
					<div className='fly-shine'></div>
					<div className='fly-shine'></div>
					<div className='fly-shine'></div>
				</div>

				
				<article className='fly-text'>
					<p>一轮圆月，温暖有你陪伴的时光；</p>
					<p>一段心声，跨越咫尺天涯的距离。</p>
				</article>

				{this.state.images.map((item,i)=>{
					return(
						<div key={i}  className={'fly-'+item}>
							<img src={'./assets/images/'+item+'.png'}/>
						</div>
					)
				})}

				<div className='fly-sun-sm'>
					<img src='./assets/images/smail.gif'/>
				</div>

				<div className='fly-box-btn'>
					<Button text='点击礼盒' click={false}  className='vertical-btn'></Button>
				</div>


				<div className="fly-dialog" ref='fly-dialog'>
					<img src='./assets/images/dialog.png'/>
					<Button countX={24} text='制作我的月亮信笺' className="horizontal-btn my-moon-letterhead" callBack={this.entryDrawPannel.bind(this)}></Button>	
				</div>

				<DrawScene></DrawScene>

				<Star {...starProps}></Star>

				<div className='fly-mask' ref='fly-mask'>
					<div className='fly-loading-C'>
						<img src='./assets/images/loading.png'/>
						<img src='./assets/images/loading-cloud.png'/>
						
					</div>
					<div className='loading-text'>
							loading...<span className='process' ref='progress'>0%</span>
					</div>
				</div>


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
		this.isShowBox = 2;
		if(e.target.parentNode.classList.contains('fly-box')){
			clearTimeout(this.entryTime);
			e.target.src='./assets/images/boxopen.png';
			this.refs['main'].querySelector('.fly-sun-sm').classList.add('active');
			setTimeout(()=>{
				this.refs['fly-dialog'].classList.add('active');
				this.setState({shadow:true});//
			},8*1000);
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
		this.showShine();
		let main = this.refs['main'];
		this.main=  main;
		

		main.querySelector('.fly-rabbit-r').addEventListener('webkitTransitionEnd',()=>{
			setTimeout(()=>{
				main.querySelector('.fly-rabbit-r img').src ='./assets/images/rabbit-l.png';
			},500);
		});
		window.float = this.float;

		let progress = this.refs['progress']

		utilMethods.loading(this.state.loadingImgs,(p)=>{
			progress.innerHTML = Math.round(p * 100)+"%"; 
		},()=>{
			this.refs['fly-mask'].style.display = 'none';
			setTimeout(()=>{
				this.init();
			},3000);
		});
		
	}

	init(){
		let main = this.refs['main'];
		main.classList.add('active');
		this.float(this);
		this.entryTime = setTimeout(()=>{
			main.querySelector('.fly-sun-sm').classList.add('active');
			main.querySelector('.fly-box img').src='./assets/images/boxopen.png';
			setTimeout(()=>{
				this.refs['fly-dialog'].classList.add('active');
				this.setState({shadow:true});//
			},8*1000);
		},8000);

	}

	float(_this){

		let main = document.querySelector('.fly-main-C');

		let petals =main.querySelectorAll('.fly-petal'),
			latern =  main.querySelectorAll('.fly-latern'),
			plun = main.querySelector('.fly-plum'),
			petalArr = [];
			this.petalArr= petalArr;
			//plun.style.opacity =1;
		for(var i =0 ;i<petals.length;i++){
			//petals[i].style.opacity =1;
			let petal = new DriftDown({
				petal:petals[i],

			});
			petalArr.push(petal);
		}
		
		for(var i =0 ;i<latern.length;i++){
			latern[i].style.opacity =1;
			let petal = new DriftDown({
				petal:latern[i],
				up:true,
				maxHeight:-750
			});
			petalArr.push(petal);
		}
		
		var m = Math;

		this.timer = setInterval(()=>{

			petalArr.forEach((petal)=>{
				petal.angle+=(petal.speed);
				petal.angle>=360 && (petal.angle = 0);
				m.abs(petal.startY) > m.abs(petal.maxHeight) &&(petal.startY = 0,petal.angle =0,petal.speedY = Math.random()+.5,petal.startX = 0,petal.rotation = Math.random()*180);
				petal.startX += m.sin(petal.angle/180*m.PI)/2;

				if(petal.up){
					petal.startY-=petal.speedY/2;
					petal.startX += m.sin(petal.angle/180*m.PI)/2*m.random();
				}
				else{
					petal.startY+=petal.speedY;
				}
				
				petal.startMove(petal.startX,petal.startY);
			});
		},1000/60);
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
		
		this.petalArr.forEach((petal)=>{
			petal.stop();
		});

		this.timer && clearInterval(this.timer);

		let dialog =this.main.querySelector('.fly-dialog');
		dialog.classList.add('hide');
		dialog.addEventListener('webkitTransitionEnd',()=>{
			dialog.classList.add('none');
			this.main.querySelector('.fly-sun-sm').classList.remove('active');
			document.querySelector('.fly-draw-scene').classList.add('active');
		});
		this.plumOut();
	}

	rabbitOut(){
		this.main.querySelector('.fly-rabbit-r').classList.add('hide');
		this.main.querySelector('.fly-box-btn').classList.add('hide');

	}

	plumOut(){
		this.main.querySelector('.fly-plum').style.opacity=0;
		let petal= this.main.querySelectorAll('.fly-petal');
		let latern= this.main.querySelectorAll('.fly-latern');
		petal[0].style.opacity=0;
		petal[1].style.opacity=0;
		petal[2].style.opacity=0;
		latern[0].style.opacity=0;
		latern[1].style.opacity=0;
		latern[2].style.opacity=0;
		
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