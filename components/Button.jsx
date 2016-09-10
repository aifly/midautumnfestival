import React, { Component } from 'react';
import './css/button.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
export default class Button extends Component {
	constructor(option){
		super(option);
		this.state = {

		};
		this.touchStart = this.touchStart.bind(this);
		this.touchEnd = this.touchEnd.bind(this);
	}
	
	touchStart(){
		this.refs['fly-button-C'].classList.add('active');
	}

	touchEnd(){
		this.refs['fly-button-C'].classList.remove('active');
	}

	render() {

		let {color,text,className,callBack} = this.props;
		let linesX = [],
			linesY = [];
		if(className === 'horizontal-btn'){
			for(var i = 0 ; i <23 ; i++){
				var style = {
					left:(4+i * 4 )+"%",
					WebkitTransform:'rotate('+(-Math.random()*30|0)+'deg)'
				}

				if(i===0){
					style.left ='3%',
					style.marginTop ='-2px';
					style.WebkitTransform='rotate('+(-30)+'deg)'
				}
				
				linesX.push(
					<div key={i} style={style}  className='linex'></div>
				)
			}

			for(var i = 0 ; i <9 ; i++){
				var style = {
					top:(0+i*10)+"%",
					WebkitTransform:'rotate('+(Math.random()*20|0)+'deg)'
				}
				if(i===0){
					style.marginTop ='8px';
					style.WebkitTransform='rotate(32deg)';
					//borderRadius = '10px';
				}
				if(i>=7){
					style.WebkitTransform='rotate(32deg) translate(-4px,-4px)';
				}
				linesY.push(
					<div key={i} style={style}  className='liney'></div>
				)
			}
		}
		else{
			for(var i = 0 ; i <9 ; i++){
				var style = {
					left:(4+ i * 10 )+"%",
					WebkitTransform:'rotate('+(Math.random()*40|0)+'deg)'
				}

				if(i===0){
					style.left ='3%',
					style.marginTop ='-2px';
					style.WebkitTransform='rotate('+(-30)+'deg)'
				}
				
				linesX.push(
					<div key={i} style={style}  className='linex'></div>
				)
			}

			for(var i = 0 ; i <10 ; i++){
				var style = {
					top:(0+i*10)+"%",
					WebkitTransform:'rotate('+(-Math.random()*40|0)+'deg)'
				}
				if(i===0){
					style.marginTop ='8px';
					style.WebkitTransform='rotate(-42deg)';
					//borderRadius = '10px';
				}
				if(i>=9){
					style.WebkitTransform='rotate(-32deg) translate(3px,-4px)';
					//style.borderColor='#fff';
				}
				linesY.push(
					<div key={i} style={style}  className='liney'></div>
				)
			}
		}
		

		
		return (
			<div onTouchTap={callBack} ref='fly-button-C' className={'fly-button-C  ' + className } onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}>
				<div className='fly-button-t'>{text}</div>
				<div className='fly-button-b'>
					{linesX}
					{linesY}
				</div>
				
			</div>
		);
	}
}

Button.defaultProps = {
	color:'#fff',
	className:'horizontal-btn',
	text:'清空',
	callBack:(e)=>{
		console.log(e);
	}
}
