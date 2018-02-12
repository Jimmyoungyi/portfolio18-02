import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../app.service';

@Component({
	selector: 'app-cover',
	templateUrl: './cover.component.html',
	styleUrls: ['../css/cover.component.css']
})
export class CoverComponent implements OnInit {

	constructor(
		private appService: AppService,
		private router: Router
	) { }

	@HostListener("click")
	onclick(){
		this.router.navigate(["workList","page","1"]);
	}

	@HostListener("window:mousewheel",["$event"])
	onmousewheel(event){
		this.router.navigate(["workList","page","1"]);
	}

	@HostListener("window:keyup",["$event"])
	onkeyup(event){
		if(event.key == "ArrowUp" || event.key == "ArrowDown" || event.key == "ArrowRight" || event.key == "ArrowLeft"){
			this.router.navigate(["workList","page","1"]);
		}
	}

	@HostListener("window:touchend",["$event"])
	ontouchend(event){
		this.router.navigate(["workList","page","1"]);
	}

	ngOnInit() {
		this.appService.emitNav(5);
		this.appService.emitControlArray([true, true, true, true]);
	}

}
// workList/page/1