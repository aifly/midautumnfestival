
export default class Moon{
	constructor(option={}){
		let s = this;
		s.canvas = option.canvas;
		s.context = s.canvas.getContext('2d');
		s.width = option.width || 320;
		s.height = option.height || 568;
		s.startX = option.startX;
		s.startY = option.startY;
		s.color = option.color || 'red';
		s.iNow = 0;
		s.pointArr = [];
		s.setSize();
	}

	setSize(){
		let s = this;
		s.canvas.width = s.width;
		s.canvas.height = s.height;
	}

	clear(){
		let s = this;
		s.context.clearRect(0,0,s.width,s.height);
		s.iNow = 0;
	}

	beginDraw(){
		let s = this;
		s.iNow =0;
		s.context.beginPath();
	}

	draw(x,y){
		let s = this;
		
		s.context.strokeStyle = s.color;
		if(s.iNow === 0 ){
			s.context['moveTo'](s.startX,s.startY);	
			s.pointArr.push({
				x:s.startX,
				y:s.startY
			})
		}
		else{
			s.context.lineTo(x,y);
			s.pointArr.push({
				x,y
			})
		}
		s.context.stroke();
		s.iNow++;
	}
}