import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { AppService } from "../app.service";

@Component({
	selector: 'app-work-detail',
	templateUrl: './work-detail.component.html',
	styleUrls: ['../css/work-detail.component.css']
})
export class WorkDetailComponent implements OnInit {

	constructor(
		private appService: AppService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) { }

	key = 0
	project:any = {};
	animating = true;
	projectCanvasColor = [["#ffbd31","#ffd75b"],["#4F525F","#818593"],["#7a6fc7","#a198df"],["#f43f3e","#fdb55a"]];
	pageArray:string[] = ["welcome", "education", "experience", "skill"];
	touchpoint:object = {x:0,y:0};
	
	@HostListener("window:mousewheel",["$event"])
	onmousewheel(event){
		if(Math.abs(event.wheelDeltaX) < Math.abs(event.wheelDeltaY)){

		}else{
			if(!this.animating){
				if(event.wheelDelta > 10){
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
				}else if(event.wheelDelta < -10){
					this.appService.getInfoIndex()
							.then(index => this.router.navigate(['intro/',this.pageArray[index]]));
					// this.router.navigate(["/contact"]);
				}
			}
		}
	}

	@HostListener("window:keydown",["$event"])
	onkeydown(event){
		if(event.key == "ArrowUp"){
			let smooth = (index: number) => {
				setTimeout(function() {
					window.scrollBy(0, -window.innerHeight*0.65/20);
					if(index < 20){
						index ++;
						smooth(index);
					}
				}, 10);
			}
			smooth(0);
		}else if(event.key == "ArrowDown"){
			let smooth = (index: number) => {
				setTimeout(function() {
					window.scrollBy(0, window.innerHeight*0.65/20);
					if(index < 20){
						index ++;
						smooth(index);
					}
				}, 10);
			}
			smooth(0);
		}
	}
	@HostListener("window:keyup",["$event"])
	onkeyup(event){
		if(event.key == "ArrowUp"){
		}else if(event.key == "ArrowDown"){
		}else if(event.key == "ArrowRight"){
			this.appService.getInfoIndex()
							.then(index => this.router.navigate(['intro/',this.pageArray[index]]));
			// this.router.navigate(["/contact"]);
		}else if(event.key == "ArrowLeft"){
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
	}

	@HostListener("window:touchstart",["$event"])
	ontouchstart(event){
		this.touchpoint={x:event.changedTouches[0].pageX,y:event.changedTouches[0].pageY};
	}
	@HostListener("window:touchend",["$event"])
	ontouchend(event){
		let moveX = Math.abs(event.changedTouches[0].pageX - this.touchpoint['x'])>100 ? event.changedTouches[0].pageX - this.touchpoint['x'] : 0 ,
			moveY = Math.abs(event.changedTouches[0].pageY - this.touchpoint['y'])>100 && Math.abs(event.changedTouches[0].pageY - this.touchpoint['y'])>Math.abs(event.changedTouches[0].pageX - this.touchpoint['x']) ? event.changedTouches[0].pageY - this.touchpoint['y'] : 0;
		if(moveX > 0){
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
		}else if(moveX < 0){
			this.appService.getInfoIndex()
							.then(index => this.router.navigate(['intro/',this.pageArray[index]]));
		}
		this.touchpoint = {x:0,y:0};
	}

	ngOnInit() { 
		this.appService.emitNav(3);
		this.appService.emitControlArray([false, true, false, true]);
		var self = this;
		setTimeout(function(){self.animating = false},850);
		this.activatedRoute.params
						.switchMap((params: Params) => this.appService.getProject(params['num']))
						.subscribe((project) => {
							this.project = project;
							this.project.role = this.project.role.toString().replace(/,/g," / ");
							this.project.tool = this.project.tool.toString().replace(/,/g," / ");
							this.appService.uploadProjectIndex(this.project.id);
							this.appService.emitColor(this.projectCanvasColor[this.project.id]);
						})
	}
	goPage(){
		console.log(this.project.link);
		var win = window.open(this.project.link, '_blank');
		win.focus();
	}

}
