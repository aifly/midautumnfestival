import React, { Component } from 'react';
import './css/star.css';

export default class Star extends Component {
	constructor(props) {
	  super(props);
		
	  this.state = {};
	}
	render() {
		let stars = [];
		let {count,width,height} = this.props;

		for(var i =0 ; i < count ; i++){
			let r = Math.random();
			let size = r*6|0;
			size <= 0 && (size =1 );
			let style = {
				width:size,
				height :size,
				left:Math.random()*width|0,
				top:Math.random()*height|0,
				opacity:r,
				WebkitAnimationDelay:size*400+'ms',
				WebkitAnimationDuration:(r+.1)+'s'
			}
			if(i % 8 === 0){
				style.opacity =1;
				style.width =7;
				style.height =7;
			}
			stars.push(
				<div key={i} className={'fly-star '+ (size>4?'animate':'')} style={style}></div>
			)
		}
		return (
			<div className='fly-star-C' style={{width:width,height:height}}>
				{stars}
			</div>
		);
	}
}

Star.defaultProps = {
	count : 110,
	width:320,
	height:568
}
