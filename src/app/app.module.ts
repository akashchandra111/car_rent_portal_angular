import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import  { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { FetchJSONService } from './fetch-json.service';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
	  HttpClientModule,
    FormsModule
  ],
  providers: [
	  FetchJSONService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
