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
	  	showTeam:false,
	  	indexShow:true,
	  	shareShow:false,
	  	 images:[
	  	 	'window',

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
			<div ref='main' className='fly-main-C ' >
				<div className='fly-shadow' style={shadowStyle}></div>
				{/*<div className='fly-meteor-C'>
					<img src='./assets/images/meteor.png' className='meteor'/>
				</div>
				<div className='fly-meteor-C fly-meteor-C1'>
					<img src='./assets/images/meteor.png' className='meteor'/>
				</div>

				<div className='fly-meteor-C fly-meteor-C2'>
					<img src='./assets/images/meteor.png' className='meteor'/>
				</div>*/}
				
				<audio autoPlay loop src='./assets/images/bg.mp3'></audio>
				

				{this.state.indexShow && this.state.images.map((item,i)=>{
					return(
						<div key={i}  className={'fly-'+item}>
							<img src={'./assets/images/'+item+'.png'}/>
						</div>
					)
				})}

				{this.state.indexShow && <div className="fly-box">
					<img src='./assets/images/box.png'  onTouchTap={this.showBox}/>
				</div>}
				
 				{this.state.indexShow && <div className="fly-text-img">
					<img src='./assets/images/text.png'/>
				</div>}
				{this.state.indexShow && <div className={'fly-share-btn'}>
					<img src={'./assets/images/share-btn.png'}/>
				</div>}

				<div className='fly-team' onTouchTap={this.showTeam.bind(this)}>制作团队</div>
				<ShareCard></ShareCard>

				{this.state.showTeam && <div className='fly-team-img' onTouchTap={()=>{this.setState({showTeam:false})}} style={{background:'url(./assets/images/copyright.jpg) no-repeat center',backgroundSize:'cover'}}></div>}


				<div className='fly-share' onTouchTap={()=>{this.setState({shareShow:true})}}>
					<img src='./assets/images/share.png'/>
				</div>

				{this.state.shareShow && <div onTouchTap={()=>{this.setState({shareShow:false})}} className='fly-share-info' style={{background:'url(./assets/images/arron1.png) no-repeat center top',backgroundSize:'cover'}}></div>}

			</div>

		);
	}


	showTeam(){
		this.setState({
			showTeam:true
		})
	}

	showBox(e){//打开盒子
		
		let self = this;
		e.target.src='./assets/images/boxopen.png';

		this.setState({shadow:true});//
		let cardC = document.querySelector('.fly-card-C');
		cardC.classList.add('active');

		cardC.addEventListener('webkitTransitionEnd',function(){
			self.setState({
				indexShow:false
			})
			this.classList.add('big');

		});
	}

	
	 
	componentDidMount() {
		//this.showShine();
		let main = this.refs['main'];
		this.main=  main;
		setTimeout(()=>{
			main.classList.add('active');
			this.float(this); 
		},1000);
		
	}

	float(_this){

		return;

		/*let main = document.querySelector('.fly-main-C');

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
		},1000/60);*/
	}

	showShine(){
		var shines = this.refs['main'].querySelectorAll('.fly-shine'),
			len = shines.length;
		for(var i = 0; i < len ; i++){
			shines[i].classList.add('active');
		}
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

