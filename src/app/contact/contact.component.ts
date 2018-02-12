import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';

import { AppService } from '../app.service';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['../css/contact.component.css']
})
export class ContactComponent implements OnInit {

	form: boolean = false;
	directionBtn: boolean = true;
	animating = true;
	pageArray:string[] = ["welcome", "education", "experience", "skill"];
	touchpoint:object = {x:0,y:0};

	constructor(
		private appService: AppService,
		private router: Router,
		private http: Http
	) { }

	@HostListener("window:mousewheel",["$event"])
	onmousewheel(event){
		if(Math.abs(event.wheelDeltaX) < Math.abs(event.wheelDeltaY)){

		}else{
			if(!this.animating){
				if(event.wheelDelta > 0){
					// this.appService.getProjectIndex()
					// 				.then(index => this.router.navigate(["workDetail",index]));
					this.appService.getInfoIndex()
							.then(index => this.router.navigate(['intro/',this.pageArray[index]]));
				}else{

				}
			}
		}
	}

	@HostListener("window:keyup",["$event"])
	onkeyup(event){
		if(event.key == "ArrowLeft" && this.directionBtn){
			// this.appService.getProjectIndex()
			// 				.then(index => this.router.navigate(["workDetail",index]));
			this.appService.getInfoIndex()
							.then(index => this.router.navigate(['intro/',this.pageArray[index]]));
		}
	}
	@HostListener("window:touchstart",["$event"])
	ontouchstart(event){
		this.touchpoint={x:event.changedTouches[0].pageX,y:event.changedTouches[0].pageY};
	}
	@HostListener("window:touchend",["$event"])
	ontouchend(event){
		let moveX = Math.abs(event.changedTouches[0].pageX - this.touchpoint['x'])>100 ? event.changedTouches[0].pageX - this.touchpoint['x'] : 0 ;
		if(moveX > 0){
			this.appService.getInfoIndex()
							.then(index => this.router.navigate(['intro/',this.pageArray[index]]));
		}
		this.touchpoint = {x:0,y:0};
	}

	ngOnInit() {
		var self = this;
		setTimeout(function(){self.animating = false},850);
		this.appService.emitNav(4);
		this.appService.emitControlArray([false, true, false, false]);
	}

	onSubmit(value: any){
		var headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		var data = JSON.stringify(value)
		let order = 'order=' + data;
		this.http.post("http://jimmyoungyi.com/portfolio/old/old/mailG.php", order, {headers: headers})
		.subscribe(res => {
			console.log('post result %o', res);
		});

		this.switchForm();
	}

	switchForm(){
		this.form = !this.form;
	}

	onFocus(){
		this.directionBtn = false;
	}
	onBlur(){
		this.directionBtn = true;
	}
}
