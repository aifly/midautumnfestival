
export default class DriftDown{
	constructor(props={}) {
		this.petal = props.petal;
		this.timer= null;
		this.angle = 0;
		this.startX = this.startY = 0;
		this.delay = Math.random()*500 + 500;
		this.speed = Math.random()+.1;
		this.speedY = Math.random()+.5;
		this.up = props.up;
		this.maxHeight=  props.maxHeight || 550;
		this.rotation = Math.random()*180;
	}

	startMove(startX=0,startY=0){
		this.petal.display = 'block';
		if(this.maxHeight<0){
			this.petal.style.WebkitTransform='translate3d('+this.startX+'px,'+this.startY+'px,0) scale('+(1-startY/this.maxHeight)+')';	
			//this.petal.style.WebkitFilter = 'blur('+(startY/this.maxHeight*6)+'px)';
		}
		else{
			this.petal.style.WebkitTransform='translate3d('+this.startX+'px,'+this.startY+'px,0) rotate('+this.rotation+'deg)';
		}
	}

	stop(){
		this.petal.display = 'none';
	}

}