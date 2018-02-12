import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Data, WebStorage } from './data';

@Injectable()
export class AppService {

	constructor() { }

	// get project list
	getLoginInfo(): Promise<Object> {
		var returnVal = [];
		for(var i=0; i<Data.length; i++){
			var item = [];
			item.push((i+1)+"/"+Data.length);
			item.push(Data[i].name);
			item.push(Data[i].time);
			item.push(Data[i].type);
			item.push(Data[i].role.toString().replace(/,/g," / "));
			item.push(Data[i].tool.toString().replace(/,/g," / "));
			item.push(Data[i].summary);
			item.push(Data[i].image);
			item.push(Data[i].id);
			returnVal.push(item);
		}
		return Promise.resolve( returnVal );
	}

	// get project
	getProject(order: number): Promise<Object>{
		return Promise.resolve( Data[order] );
	}

	//get current project list style
	getProjectListStyle(): Promise<string>{
		return Promise.resolve( WebStorage.workPageListStyle );
	}

	// upload current project list style
	uploadProjectListStyle(style: string){
		WebStorage.workPageListStyle = style;
	}

	// get current project index
	getProjectIndex(): Promise<number>{
		return Promise.resolve( WebStorage.workPage );
	}

	// upload current project index
	uploadProjectIndex(index: number){
		WebStorage.workPage = index;
	}

	// get current info index
	getInfoIndex(): Promise<number>{
		return Promise.resolve( WebStorage.infoPage );
	}

	// upload current info index
	uploadInfoIndex(index: number){
		WebStorage.infoPage = index;
	}

	// current nav
	private emitNavSource = new Subject<number>();
	navEmitted$ = this.emitNavSource.asObservable();
	emitNav(currentNav: number) {
		this.emitNavSource.next(currentNav);
	}

	// current project
	private emitCanvasColor = new Subject<string[]>();
	colorEmitted$ = this.emitCanvasColor.asObservable();
	emitColor(colorArray: string[]){
		this.emitCanvasColor.next(colorArray);
	}

	//controlers
	private emitControlArraySource = new Subject<boolean[]>();
	ControlArrayEmitted$ = this.emitControlArraySource.asObservable();
	emitControlArray(ControlArray: boolean[]) {
		this.emitControlArraySource.next(ControlArray);
	}

}
