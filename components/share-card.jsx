import React, { Component } from 'react';
import './css/sharecard.css';
import Button from './Button.jsx';
import {utilMethods, _$, $$} from '../libs/utilMethod.js';
export default class ShareCard extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	face:'',
	  	wishContent:'',
	  	wishAuthor:''
	  };
	}
	render() {
		return (
			<div className='fly-card-C' ref='fly-card-C'>
				<img src='./assets/images/card.png'/>
				{this.state.face && <img src={this.state.face} ref='fly-face' className='fly-face' style={this.state.style} />}
				<p className='fly-wish-words' ref='fly-wish-words'>{this.state.wishContent}</p>
				<p className='fly-wish-name' ref='fly-wish-name'>@{this.state.wishAuthor}</p>
				<div className='fly-wish-btns' ref='fly-wish-btns'>
					<Button countX={24} text='制作我的月亮信笺' callBack={()=>{window.location.href='./'}} className="horizontal-btn my-moon-letterhead"></Button>
				</div>
			</div>
		);
	}
	componentDidMount() {
		var img =utilMethods.getQueryString('data');
		/*var content =utilMethods.getQueryString('content');
		var author =utilMethods.getQueryString('author');*/
		let data = JSON.parse(img);
		this.setState({
			wishContent:decodeURI(data.content),
			wishAuthor:decodeURI(data.author),
			face:data.img
		})

	}
}
