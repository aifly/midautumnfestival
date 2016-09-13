import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Button from './components/Button.jsx';
import Star from './components/star.jsx';

import DriftDown from './libs/driftdown';
import DrawScene from './components/draw-scene.jsx';

import ShareCard from './components/share-card.jsx';

import './assets/css/share.css';



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
	  	 	'latern',
	  	 	'latern',
	  	 	'latern',
	  	 	'plum',
	  	 	'house',
	  	 	'window',
	  	 	'rabbit-r',
	  	 	'box',
	  	 	'petal',
	  	 	'petal',
	  	 	'petal',

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
				
				

				{this.state.images.map((item,i)=>{
					return(
						<div key={i}  className={'fly-'+item}>
							<img src={'./assets/images/'+item+'.png'}/>
						</div>
					)
				})}

				<div className='fly-box-btn'>
					<Button text='点击礼盒' click={false}  className='vertical-btn'></Button>
				</div>

				<ShareCard></ShareCard>


				<Star {...starProps}></Star>

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
			this.setState({shadow:true});//
			let cardC = document.querySelector('.fly-card-C');
			cardC.classList.add('active');
			cardC.addEventListener('webkitTransitionEnd',function(){
				this.classList.add('big');
			});
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
		setTimeout(()=>{
			main.classList.add('active');
			this.float(this); 
		},1000);

		main.querySelector('.fly-rabbit-r').addEventListener('webkitTransitionEnd',()=>{
			setTimeout(()=>{
				main.querySelector('.fly-rabbit-r img').src ='./assets/images/rabbit-l.png';
			},500);
		});
		
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

