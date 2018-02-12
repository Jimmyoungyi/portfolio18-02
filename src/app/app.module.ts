import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WaveDirective } from './wave.directive';
import { AppRoutingModule } from "./app-routing.module";
import { AppService } from "./app.service";

import { IntroComponent } from './intro/intro.component';
import { WorkListComponent } from './work-list/work-list.component';
import { WorkDetailComponent } from './work-detail/work-detail.component';
import { ContactComponent } from './contact/contact.component';
import { CoverComponent } from './cover/cover.component';

import {enableProdMode} from '@angular/core';

enableProdMode();

@NgModule({
	declarations: [
		AppComponent,
		WaveDirective,
		IntroComponent,
		WorkListComponent,
		WorkDetailComponent,
		ContactComponent,
		CoverComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpModule
	],
	providers: [
		AppService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
