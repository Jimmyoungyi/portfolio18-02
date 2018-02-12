import { Component, OnInit, ViewChild } from '@angular/core';
import { WaveDirective } from "./wave.directive";
import { Router } from '@angular/router';

import { AppService } from "./app.service";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./css/app.component.css']
})

export class AppComponent implements OnInit {
	constructor(
		private appService: AppService,
		private router: Router
	){
		appService.ControlArrayEmitted$.subscribe(data => this.controlArray = data);
		appService.navEmitted$.subscribe(nav => {
			this.currentNav = nav;
			if(this.currentNav == 1){
				this.directive.waveToAnimate(0, this.totalHeight*0.85);
				this.directive.waveToAnimate(1, this.totalHeight*0.85);
				this.showCanvas = -1;
				this.directive.changeWavePreset(0,"animateFloatSpeed", 0.4);
				this.directive.changeWavePreset(1,"animateFloatSpeed", 1.0);
				this.directive.animateWaving();
				this.canvasRotate = 0;
				this.canvasPosition = 'fixed';
				this.directive.changeWavePreset(0,"fillStyle","#3355FF");
				this.directive.changeWavePreset(1,"fillStyle","#3399FF");
			}else if(this.currentNav == 2){
				this.directive.waveToAnimate(0, this.totalHeight*0.55);
				this.directive.waveToAnimate(1, this.totalHeight*0.55);
				this.showCanvas = -1;
				this.directive.changeWavePreset(0,"animateFloatSpeed", 0.15);
				this.directive.changeWavePreset(1,"animateFloatSpeed", 0.3);
				this.directive.animateWaving();
				this.canvasRotate = 0;
				this.canvasPosition = 'fixed';
			}else if(this.currentNav == 3){
				this.directive.waveToAnimate(0, this.totalHeight*-0.3);
				this.directive.waveToAnimate(1, this.totalHeight*-0.3);
				var self = this;
				setTimeout(function(){
					self.directive.waveToAnimate(0, self.totalHeight*1.2);
					self.directive.waveToAnimate(1, self.totalHeight*1);
					self.canvasRotate = 180;
				},400)
				setTimeout(function(){
					self.directive.stopAnimateWaving();
					self.showCanvas = -1;
				},800)
				this.showCanvas = 10;
				this.canvasPosition = 'absolute';
			}else if(this.currentNav == 4){
				this.directive.waveToAnimate(0, this.totalHeight*0.85);
				this.directive.waveToAnimate(1, this.totalHeight*0.85);
				this.showCanvas = -1;
				this.directive.animateWaving();
				this.canvasRotate = 0;
				this.canvasPosition = 'fixed';
			}else{
				this.directive.waveToAnimate(0, this.totalHeight*-0.1);
				this.directive.waveToAnimate(1, this.totalHeight*-0.1);
			}
		});
		appService.colorEmitted$.subscribe(colorArray =>{
			if(this.directive.animateTimer == null){
				this.directive.animateWaving();
				this.directive.changeWavePreset(0,"fillStyle",colorArray[0]);
				this.directive.changeWavePreset(1,"fillStyle",colorArray[1]);
				var self = this;
				setTimeout(function(){self.directive.stopAnimateWaving();},40)
			}else{
				this.directive.changeWavePreset(0,"fillStyle",colorArray[0]);
				this.directive.changeWavePreset(1,"fillStyle",colorArray[1]);
			}
				
		})
	}
	@ViewChild(WaveDirective) directive = null;

	totalHeight: number = window.innerHeight;
	controlArray: boolean[] = [false, false, true, true];
	currentNav: number = 1;
	showCanvas: number = 1;
	canvasRotate: number = 0;
	canvasPosition: string = "fixed";

	pageArray:string[] = ["welcome", "education", "experience", "skill"];

	ngOnInit(){
		// wave
		this.directive.resetCanvas();

		this.directive.addNewWave();
		this.directive.changeWavePreset(0,"fillStyle","#3355FF");
		this.directive.changeWavePreset(0,"waveBasicLine", this.totalHeight*-0.1);
		this.directive.changeWavePreset(0,"waveHeight", [Math.random() * 0.02 * this.totalHeight,Math.random() * 0.07 * this.totalHeight]);
		this.directive.changeWavePreset(0,"wavePost", [30,60]);
		this.directive.changeWavePreset(0,"waveNextGet", [40,60]);
		this.directive.changeWavePreset(0,"waveDistance", [50,60]);
		this.directive.changeWavePreset(0,"animateFloatSpeed", 0.4);
		this.directive.changeWavePreset(0,"animateWaveArea", {xarea: [-25,25],yarea: [- Math.random() * 0.07 * this.totalHeight, Math.random() * 0.07 * this.totalHeight],speed: [0.05,0.1]})
		this.directive.wavecreate(0);
		this.directive.waveDraw(0);
		
		this.directive.addNewWave();
		this.directive.changeWavePreset(1,"fillStyle","#3399FF");
		this.directive.changeWavePreset(1,"waveBasicLine",this.totalHeight*-0.1);
		this.directive.changeWavePreset(1,"waveHeight", [Math.random() * 0.01 * this.totalHeight,Math.random() * 0.05 * this.totalHeight]);
		this.directive.changeWavePreset(1,"wavePost", [30,60]);
		this.directive.changeWavePreset(1,"waveNextGet", [40,60]);
		this.directive.changeWavePreset(1,"waveDistance", [50,60]);
		this.directive.changeWavePreset(1,"animateFloatSpeed", 1.0);
		this.directive.changeWavePreset(1,"animateWaveArea", {xarea: [-15,15],yarea: [- Math.random() * 0.05 * this.totalHeight, Math.random() * 0.05 * this.totalHeight],speed: [0.05,0.08]})
		this.directive.wavecreate(1);
		this.directive.waveDraw(1);

		this.directive.animateWaving();
	}

	navHome(){
		this.appService.getInfoIndex()
						.then(index => this.router.navigate(['intro/',this.pageArray[index]]));
	}

	navWorkList(){
		this.appService.getProjectListStyle()
							.then(style => {
								if(style == "list"){
									this.router.navigate(['workList/list/0']);
								}else if(style == "page"){
									this.appService.getProjectIndex()
										.then(order => {
											this.router.navigate(['workList/page/'+(order+1)]);
										})
								}
							})
	}

	navWorkDetail(){
		this.appService.getProjectIndex()
						.then(index => this.router.navigate(["workDetail",index]));
	}

	navContact(){
		this.router.navigate(['contact']);
	}

}
