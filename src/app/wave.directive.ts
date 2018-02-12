import { Directive, ElementRef, HostListener } from '@angular/core';

import { WavePreset, WaveArray } from 'app/wave-preset';

@Directive({
	selector: '[appWave]'
})
export class WaveDirective {

	constructor(private el:ElementRef) { }
	wavesArray: WavePreset[] = [];
	varcontext = this.el.nativeElement.getContext("2d");
	canvasWidth: number = window.innerWidth;
	canvasHeight: number = window.innerHeight;
	private animateTimer: any = null;
	baseLineTimer: any;

	@HostListener("click") onclick(){
		console.log("click");
	}

	private resetCanvas(){
		this.el.nativeElement.width = window.innerWidth;
		this.el.nativeElement.height = window.innerHeight;
	}

	private addNewWave(){
		var newWave: WavePreset = {
			waveArray: [],
			fillStyle: "#aaaaaa",
			strokeWidth: 0,
			strokeStyle:"",
			waveStartPoint:0,
			waveEndPoint: this.canvasWidth,
			waveBasicLine: 400,
			waveClosePath: [[this.canvasWidth,this.canvasHeight],[0,this.canvasHeight]],
			waveHeight: [0,10],
			wavePost: [20,50],
			waveNextGet: [20,50],
			waveDistance: [40,50],
			animateFloatSpeed: 0.2,
			baseLineDistination: 0.5,
			animateWaveArea: {
				xarea: [-10,10],
				yarea: [-5,5],
				speed: [0.1,1]
			}
		}
		this.wavesArray.push(newWave);
	}

	private changeWavePreset(index:number, property:string, value:any){
		this.wavesArray[index][property] = value;
	}

	private wavecreate(i) {
		var onhold: WaveArray = {
			"x": this.wavesArray[i].waveStartPoint,
			"y": this.wavesArray[i].waveBasicLine + Math.random() * (this.wavesArray[i].waveHeight[1] - this.wavesArray[i].waveHeight[0]) + this.wavesArray[i].waveHeight[0],
			"post": Math.random() * (this.wavesArray[i].wavePost[1] - this.wavesArray[i].wavePost[0]) + this.wavesArray[i].wavePost[0],
			"nextget": Math.random() * (this.wavesArray[i].waveNextGet[1] - this.wavesArray[i].waveNextGet[0]) + this.wavesArray[i].waveNextGet[0],
			"basicX": 0,
			"basicY": 0,
			"horizonalPoint": 0,
			"horizonalSpeed": 0,
			"verticalPoint": 0,
			"verticalSpeed": 0,
			"horizonalTrack": true,
			"verticalTrack": true
		}
		onhold.basicX = onhold.x;
		onhold.basicY = onhold.y;
		onhold.horizonalPoint = Math.random() * (this.wavesArray[i].animateWaveArea.xarea[1] - this.wavesArray[i].animateWaveArea.xarea[0]) + this.wavesArray[i].animateWaveArea.xarea[0] + onhold.basicX;
		onhold.horizonalSpeed = Math.random() * (this.wavesArray[i].animateWaveArea.speed[1] - this.wavesArray[i].animateWaveArea.speed[0]) + this.wavesArray[i].animateWaveArea.speed[0];
		onhold.horizonalPoint > onhold.x ? onhold.horizonalTrack = true : onhold.horizonalTrack = false;
		onhold.verticalPoint = Math.random() * (this.wavesArray[i].animateWaveArea.yarea[1] - this.wavesArray[i].animateWaveArea.yarea[0]) + this.wavesArray[i].animateWaveArea.yarea[0] + onhold.basicY;
		onhold.verticalSpeed = Math.random() * (this.wavesArray[i].animateWaveArea.speed[1] - this.wavesArray[i].animateWaveArea.speed[0]) + this.wavesArray[i].animateWaveArea.speed[0];
		onhold.verticalPoint > onhold.y ? onhold.verticalTrack = true : onhold.verticalTrack = false;
		this.wavesArray[i].waveArray.push(onhold);
		this.waveTrackAdd(i);
	}

	private waveTrackAdd(i){
		while(this.wavesArray[i].waveArray[this.wavesArray[i].waveArray.length-1].x < this.wavesArray[i].waveEndPoint){
			this.waveAddNext(i);
		}
	}

	private waveAddNext(i){
		var upordown;
		if(this.wavesArray[i].waveArray[this.wavesArray[i].waveArray.length-1].y>this.wavesArray[i].waveBasicLine){
			upordown = 1;
		}else{
			upordown = 2;
		}
		var hold: WaveArray = {
			"x": this.wavesArray[i].waveArray[this.wavesArray[i].waveArray.length-1].x + this.wavesArray[i].waveArray[this.wavesArray[i].waveArray.length-1].nextget + this.wavesArray[i].waveArray[this.wavesArray[i].waveArray.length-1].post + Math.random() * (this.wavesArray[i].waveDistance[1] - this.wavesArray[i].waveDistance[0]) + this.wavesArray[i].waveDistance[0],
			"y": this.wavesArray[i].waveBasicLine + Math.pow(-1, upordown) * (Math.random() * (this.wavesArray[i].waveHeight[1] - this.wavesArray[i].waveHeight[0]) + this.wavesArray[i].waveHeight[0]),
			"post": Math.random() * (this.wavesArray[i].wavePost[1] - this.wavesArray[i].wavePost[0]) + this.wavesArray[i].wavePost[0],
			"nextget": Math.random() * (this.wavesArray[i].waveNextGet[1] - this.wavesArray[i].waveNextGet[0]) + this.wavesArray[i].waveNextGet[0],
			"basicX": 0,
			"basicY": 0,
			"horizonalPoint": 0,
			"horizonalSpeed": 0,
			"verticalPoint": 0,
			"verticalSpeed": 0,
			"horizonalTrack": true,
			"verticalTrack": true
		}
		hold.basicX = hold.x;
		hold.basicY = hold.y;
		hold.horizonalPoint = Math.random() * (this.wavesArray[i].animateWaveArea.xarea[1] - this.wavesArray[i].animateWaveArea.xarea[0]) + this.wavesArray[i].animateWaveArea.xarea[0] + hold.basicX;
		hold.horizonalSpeed = Math.random() * (this.wavesArray[i].animateWaveArea.speed[1] - this.wavesArray[i].animateWaveArea.speed[0]) + this.wavesArray[i].animateWaveArea.speed[0];
		hold.horizonalPoint > hold.x ? hold.horizonalTrack = true : hold.horizonalTrack = false;
		hold.verticalPoint = Math.random() * (this.wavesArray[i].animateWaveArea.yarea[1] - this.wavesArray[i].animateWaveArea.yarea[0]) + this.wavesArray[i].animateWaveArea.yarea[0] + hold.basicY;
		hold.verticalSpeed = Math.random() * (this.wavesArray[i].animateWaveArea.speed[1] - this.wavesArray[i].animateWaveArea.speed[0]) + this.wavesArray[i].animateWaveArea.speed[0];
		hold.verticalPoint > hold.y ? hold.verticalTrack = true : hold.verticalTrack = false;
		this.wavesArray[i].waveArray.push(hold);
	}

	hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}

	private waveDraw(index: number){
		let color =  this.hexToRgb(this.wavesArray[index].fillStyle);
		this.varcontext.fillStyle = "rgba("+color.r+", "+color.g+", "+color.b+", 0.65)";
		this.varcontext.lineWidth = this.wavesArray[index].strokeWidth;
		this.varcontext.beginPath();
		this.varcontext.moveTo(this.wavesArray[index].waveArray[0].x,this.wavesArray[index].waveArray[0].y);
		for(var i=1; i<this.wavesArray[index].waveArray.length; i++){
			this.varcontext.bezierCurveTo(
				this.wavesArray[index].waveArray[i-1].x + this.wavesArray[index].waveArray[i-1].post,
				this.wavesArray[index].waveArray[i-1].y,
				this.wavesArray[index].waveArray[i].x - this.wavesArray[index].waveArray[i-1].nextget,
				this.wavesArray[index].waveArray[i].y,
				this.wavesArray[index].waveArray[i].x,
				this.wavesArray[index].waveArray[i].y
			);
		}
		if(this.wavesArray[index].waveClosePath.length>1){
			for(var i=0; i<this.wavesArray[index].waveClosePath.length; i++){
				this.varcontext.lineTo(this.wavesArray[index].waveClosePath[i][0], this.wavesArray[index].waveClosePath[i][1]);
			}
			this.varcontext.lineTo(this.wavesArray[index].waveArray[0].x,this.wavesArray[index].waveArray[0].y);
		}
		if(this.wavesArray[index].fillStyle != ""){
			this.varcontext.fill();
		}
		if(this.wavesArray[index].strokeStyle != ""){
			this.varcontext.stroke();
		}
	}

	private waveClean(){
		this.varcontext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	}
	
	private animateWaving() {
		var selfFunc = this;
		this.stopAnimateWaving();
		this.animateTimer = setInterval(function(){
			selfFunc.waveClean();
			for(var u=0; u<selfFunc.wavesArray.length; u++){
				// console.log(u)
				var self = selfFunc.wavesArray[u];
				for(var i=0; i<self.waveArray.length; i++){
					self.waveArray[i].basicX -= self.animateFloatSpeed;
					self.waveArray[i].x -= self.animateFloatSpeed;
					self.waveArray[i].horizonalPoint -= self.animateFloatSpeed;
					if(self.waveArray[i].horizonalTrack){
						self.waveArray[i].x += self.waveArray[i].horizonalSpeed;
						if(self.waveArray[i].x > self.waveArray[i].horizonalPoint){
							self.waveArray[i].horizonalPoint = Math.random() * (self.animateWaveArea.xarea[1] - self.animateWaveArea.xarea[0]) + self.animateWaveArea.xarea[0] + self.waveArray[i].basicX;
							self.waveArray[i].horizonalSpeed = Math.random() * (self.animateWaveArea.speed[1] - self.animateWaveArea.speed[0]) + self.animateWaveArea.speed[0];
							self.waveArray[i].horizonalPoint > self.waveArray[i].x ? self.waveArray[i].horizonalTrack = true : self.waveArray[i].horizonalTrack = false;
						}
					}else{
						self.waveArray[i].x -= self.waveArray[i].horizonalSpeed;
						if(self.waveArray[i].x < self.waveArray[i].horizonalPoint){
							self.waveArray[i].horizonalPoint = Math.random() * (self.animateWaveArea.xarea[1] - self.animateWaveArea.xarea[0]) + self.animateWaveArea.xarea[0] + self.waveArray[i].basicX;
							self.waveArray[i].horizonalSpeed = Math.random() * (self.animateWaveArea.speed[1] - self.animateWaveArea.speed[0]) + self.animateWaveArea.speed[0];
							self.waveArray[i].horizonalPoint > self.waveArray[i].x ? self.waveArray[i].horizonalTrack = true : self.waveArray[i].horizonalTrack = false;
						}
					}
					if(self.waveArray[i].verticalTrack){
						self.waveArray[i].y += self.waveArray[i].verticalSpeed;
						if(self.waveArray[i].y > self.waveArray[i].verticalPoint){
							self.waveArray[i].verticalPoint = Math.random() * (self.animateWaveArea.yarea[1] - self.animateWaveArea.yarea[0]) + self.animateWaveArea.yarea[0] + self.waveArray[i].basicY;
							self.waveArray[i].verticalSpeed = Math.random() * (self.animateWaveArea.speed[1] - self.animateWaveArea.speed[0]) + self.animateWaveArea.speed[0];
							self.waveArray[i].verticalPoint > self.waveArray[i].y ? self.waveArray[i].verticalTrack = true : self.waveArray[i].verticalTrack = false;
						}
					}else{
						self.waveArray[i].y -= self.waveArray[i].verticalSpeed;
						if(self.waveArray[i].y < self.waveArray[i].verticalPoint){
							self.waveArray[i].verticalPoint = Math.random() * (self.animateWaveArea.yarea[1] - self.animateWaveArea.yarea[0]) + self.animateWaveArea.yarea[0] + self.waveArray[i].basicY;
							self.waveArray[i].verticalSpeed = Math.random() * (self.animateWaveArea.speed[1] - self.animateWaveArea.speed[0]) + self.animateWaveArea.speed[0];
							self.waveArray[i].verticalPoint > self.waveArray[i].y ? self.waveArray[i].verticalTrack = true : self.waveArray[i].verticalTrack = false;
						}
					}
				}
				if(self.waveArray[self.waveArray.length-1].x<selfFunc.canvasWidth){
					selfFunc.waveAddNext(u);
				}
				if(self.waveArray[1].x < 0){
					self.waveArray.shift();
				}
				selfFunc.waveDraw(u);
			}
		},40);
	}

	private stopAnimateWaving(){
		clearTimeout(this.animateTimer);
		this.animateTimer = null;
	}

	private waveToAnimate(index: number, distination: number){
		this.wavesArray[index].baseLineDistination = distination;
		var original = this.wavesArray[index].waveBasicLine;
		let addtion = (start: number) => {
			var self = this;
			setTimeout(function(){
				if(self.wavesArray[index].baseLineDistination == distination && start < 20){
					var dis = (distination - original) / 210 * (20 - start) + self.wavesArray[index].waveBasicLine;
					self.waveTo(index, dis);
					start++;
					addtion(start);
				}
			},20)
		}
		addtion(0);
	}

	private waveTo(index: number, distination: number){
		var change: number = distination - this.wavesArray[index].waveBasicLine;
		this.wavesArray[index].waveBasicLine = distination;
		for(var i=0; i<this.wavesArray[index].waveArray.length; i++){
			this.wavesArray[index].waveArray[i].y += change;
			this.wavesArray[index].waveArray[i].basicY += change;
			this.wavesArray[index].waveArray[i].verticalPoint += change;
		}
	}
}