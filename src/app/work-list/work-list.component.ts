import { Component, OnInit, HostListener } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition } from "@angular/animations";
import { Location } from '@angular/common';

import { AppService } from '../app.service';

@Component({
	selector: 'app-work-list',
	templateUrl: './work-list.component.html',
	styleUrls: ['../css/work-list.component.css'],
	animations: [
		trigger('sectionChange', [
			state('showup', style({transform: 'translateY(0)',opacity: 1})),
			state('showdown', style({transform: 'translateY(0)',opacity: 1})),
			transition('showup => showdown', [
				animate(0)
			]),
			transition('showdown => showup', [
				animate(0)
			]),
			transition('void => showup', [
				style({transform: 'translateY(50px)',opacity: 0}),
				animate(400, style({transform: 'translateY(0)',opacity: 1}))
			]),
			transition('showup => void', [
				style({transform: 'translateY(0)',opacity: 1}),
				animate(400, style({transform: 'translateY(-50px)',opacity: 0}))
			]),
			transition('void => showdown', [
				style({transform: 'translateY(-50px)',opacity: 0}),
				animate(400, style({transform: 'translateY(0)',opacity: 1}))
			]),
			transition('showdown => void', [
				style({transform: 'translateY(0)',opacity: 1}),
				animate(400, style({transform: 'translateY(50px)',opacity: 0}))
			])
		])
	]
})
export class WorkListComponent implements OnInit {

	constructor(
		private appService: AppService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private location: Location
	) { }

	stateDirection:string = "showup";
	workList: any = [];
	currentpage: number = 0;
	animating: boolean = true;
	listStyle: string = "list";
	projectCanvasColor = [["#4F525F","#818593"],["#ffbd31","#ffd75b"],["#7a6fc7","#a198df"],["#f43f3e","#fdb55a"]];
	pageArray:string[] = ["welcome", "education", "experience", "skill"];
	touchpoint:object = {x:0,y:0};

	@HostListener("window:mousewheel",["$event"])
	onmousewheel(event){
		// var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
		// if(delta>0){
		// 	this.prepPage();
		// }else{
		// 	this.nextPage();
		// }
		if(Math.abs(event.wheelDeltaX) < Math.abs(event.wheelDeltaY)){
			if(event.wheelDelta > 0){
				this.prepPage();
			}else{
				this.nextPage();
			}
		}else{
			if(!this.animating){
				if(event.wheelDelta > 5){
					// this.appService.getInfoIndex()
					// 				.then(index => this.router.navigate(['intro/',this.pageArray[index]]));
				}else if(event.wheelDelta < -5){
					if(this.listStyle == "page"){
						this.goDetailPage(this.currentpage);
					}
				}
			}
		}
	}

	@HostListener("window:keyup",["$event"])
	onkeyup(event){
		if(event.key == "ArrowUp"){
			this.prepPage();
		}else if(event.key == "ArrowDown"){
			this.nextPage();
		}else if(event.key == "ArrowRight" && this.listStyle == "page"){
			this.goDetailPage(this.currentpage);
		}else if(event.key == "ArrowLeft"){
			// this.appService.getInfoIndex()
			// 				.then(index => this.router.navigate(['intro/',this.pageArray[index]]));
		}
	}
	
	@HostListener("window:touchmove",["$event"])
	ontouchmove(event){
		if(this.listStyle == "page"){
			event.preventDefault();
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
		if(moveY != 0){
			if(moveY > 0){
				this.prepPage();
			}else{
				this.nextPage();
			}
		}else{
			if(moveX > 0){
			}else if(moveX < 0){
				this.goDetailPage(this.currentpage);
			}
		}
		this.touchpoint = {x:0,y:0};
	}

	ngOnInit() {
		var self = this;
		setTimeout(function(){self.animating = false},850);
		this.appService.emitNav(2);
		this.appService.getLoginInfo()
						.then(worklist => {
							this.workList = worklist;
							this.activatedRoute.params
											.switchMap((params: Params) => (this.currentpage = params['order']-1, this.listStyle = params['type']))
											.subscribe(() => {
												if(this.listStyle == "list"){
													this.currentpage = 0;
													this.appService.uploadProjectListStyle("list");
													this.appService.emitColor(["#3355FF","#3399FF"]);
												}else{
													this.appService.emitColor(this.projectCanvasColor[this.currentpage]);
												}
												this.appService.uploadProjectIndex(this.currentpage);
												this.setControl();
											})
						});
	}

	changeListStyle(style: string) {
		this.listStyle = style;
		if(this.listStyle == "list"){
			this.appService.uploadProjectListStyle("list");
			this.location.replaceState('/workList/list/0');
			this.appService.emitColor(["#3355FF","#3399FF"]);
		}
		if(this.listStyle == "page"){
			this.appService.uploadProjectListStyle("page");
			this.currentpage = 0;
			this.appService.emitColor(this.projectCanvasColor[this.currentpage]);
			this.appService.uploadProjectIndex(this.currentpage);
			this.location.replaceState('/workList/page/'+(this.currentpage+1));
		}
	}

	listCheck(index: number){
		if(this.listStyle == "list"){
			this.router.navigate(["workDetail", index]);
		}
	}

	nextPage(){
		this.stateDirection = "showup";
		if(!this.animating && this.listStyle == "page"){
			this.animating = true;
			var self = this;
			setTimeout(function(){self.animating = false},850);
			if(this.currentpage < this.workList.length-1){
				setTimeout(function(){
					self.currentpage++;
					self.appService.uploadProjectIndex(self.currentpage);
					self.appService.emitColor(self.projectCanvasColor[self.currentpage]);
					self.location.replaceState('/workList/page/'+(self.currentpage+1));
					self.setControl();
				},10);
			}
		}
	}

	prepPage(){
		this.stateDirection = "showdown";
		if(!this.animating && this.listStyle == "page"){
			this.animating = true;
			var self = this;
			setTimeout(function(){self.animating = false},850);
			if(this.currentpage > 0){
				setTimeout(function(){
					self.currentpage--;
					self.appService.uploadProjectIndex(self.currentpage);
					self.appService.emitColor(self.projectCanvasColor[self.currentpage]);
					self.location.replaceState('/workList/page/'+(self.currentpage+1));
					self.setControl();
				},10);
			}
		}
	}

	setControl(){
		if(this.currentpage == 0){
			this.appService.emitControlArray([false, false, true, true]);
		}else if(this.currentpage == this.workList.length-1){
			this.appService.emitControlArray([true, false, false, true]);
		}else{
			this.appService.emitControlArray([true, false, true, true]);
		}
		if(this.listStyle == "list"){
			this.appService.emitControlArray([false, false, false, false]);
		}
	}

	goDetailPage(index: number){
		this.router.navigate(["workDetail", index]);
	}
}
