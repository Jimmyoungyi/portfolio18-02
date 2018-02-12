import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { trigger, state, style, animate, transition } from "@angular/animations";
import 'rxjs/add/operator/switchMap';

import { AppService } from './../app.service';

@Component({
	selector: 'app-intro',
	templateUrl: './intro.component.html',
	styleUrls: ['../css/intro.component.css'],
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
export class IntroComponent implements OnInit {

	constructor(
		private router:Router,
		private activatedRoute: ActivatedRoute,
		private appService: AppService
	) { }

	pageArray:string[] = ["welcome", "experience", "education", "skill"];
	titleArray:string[] = ["Hello:", "Experience:", "Education:", "Skills:"];
	stateArray:string[] = ["showdown","showdown","showdown","showdown"];
	stateDirection:string = "showup";
	currentPage:string = "welcome";
	currentPageIndex:number = 0;
	animating:boolean = true;
	touchpoint:object = {x:0,y:0};

	@HostListener("window:mousewheel",["$event"])
	onmousewheel(event){
		if(Math.abs(event.wheelDeltaX) < Math.abs(event.wheelDeltaY)){
			if(event.wheelDelta > 0){
				this.prepPage();
			}else{
				this.nextPage();
			}
		}else{
			if(event.wheelDelta < -10 && !this.animating){
				// this.goWorkListPage();
				this.router.navigate(["contact"]);
			}else if(event.wheelDelta > 10 && !this.animating){
				this.appService.getProjectIndex()
								.then(index => this.router.navigate(["workDetail",index]));
			}
		}
	}

	@HostListener("window:keyup",["$event"])
	onkeyup(event){
		if(event.key == "ArrowUp"){
			this.prepPage();
		}else if(event.key == "ArrowDown"){
			this.nextPage();
		}else if(event.key == "ArrowRight"){
			// this.goWorkListPage();
			this.router.navigate(["/contact"]);
		}else if(event.key == "ArrowLeft"){
			this.appService.getProjectIndex()
							.then(index => this.router.navigate(["workDetail",index]));
		}
	}

	@HostListener("window:touchmove",["$event"])
	ontouchmove(event){
		event.preventDefault();
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
				this.appService.getProjectIndex()
								.then(index => this.router.navigate(["workDetail",index]));
			}else if(moveX < 0){
				this.router.navigate(["/contact"]);
			}
		}
		this.touchpoint = {x:0,y:0};
	}

	ngOnInit() {
		this.appService.emitNav(1);
		var self = this;
		setTimeout(function(){self.animating = false},850);
		this.activatedRoute.params
						.switchMap((params: Params) => this.currentPage = (params['content']))
						.subscribe(() => {
							this.currentPageIndex = this.fetchCurrentPage(this.currentPage);
							if(this.currentPageIndex == 0){
								this.appService.emitControlArray([false, true, true, true]);
							}else if(this.currentPageIndex == this.pageArray.length-1){
								this.appService.emitControlArray([true, true, false, true]);
							}else{
								this.appService.emitControlArray([true, true, true, true]);
							}
						});
	}
	fetchCurrentPage(target) :number {
		for(let i=0; i<this.pageArray.length; i++){
			if(target == this.pageArray[i]){
				return i;
			}
		}
		this.router.navigate(['intro/welcome']);
		return -1;
	}

	nextPage(){
		this.stateDirection = "showup";
		if(!this.animating){
			this.animating = true;
			var self = this;
			setTimeout(function(){self.animating = false},850);
			if(this.currentPageIndex < this.pageArray.length-1){
				this.currentPageIndex++;
				self.appService.uploadInfoIndex(self.currentPageIndex);
				setTimeout(function(){self.router.navigate(['intro/'+self.pageArray[self.currentPageIndex]])},10);
			}
		}
	}

	prepPage(){
		this.stateDirection = "showdown";
		if(!this.animating){
			this.animating = true;
			var self = this;
			setTimeout(function(){self.animating = false},850);
			if(this.currentPageIndex > 0){
				this.currentPageIndex--;
				self.appService.uploadInfoIndex(self.currentPageIndex);
				setTimeout(function(){self.router.navigate(['intro/'+self.pageArray[self.currentPageIndex]])},10);
			}
		}
	}

	goWorkListPage(){
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
