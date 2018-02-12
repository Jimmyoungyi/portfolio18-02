import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IntroComponent } from "./intro/intro.component";
import { WorkListComponent } from './work-list/work-list.component';
import { WorkDetailComponent } from './work-detail/work-detail.component';
import { ContactComponent } from './contact/contact.component';
import { CoverComponent } from './cover/cover.component';

const routes: Routes =[
	{
		path: "",
		component: CoverComponent
	},
	{
		path: 'intro/:content',
		component: IntroComponent
	},
	{
		path: 'workList/:type/:order',
		component: WorkListComponent
	},
	{
		path: 'workDetail/:num',
		component: WorkDetailComponent
	},
	{
		path: 'contact',
		component: ContactComponent
	}
]

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true }) ],
	exports: [RouterModule]
})
export class AppRoutingModule { }
