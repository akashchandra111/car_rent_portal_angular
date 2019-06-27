import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, RouterComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { FetchJSONService } from './fetch-json.service';

@NgModule({
  declarations: [
    AppComponent,
    RouterComponents,
    HeaderComponent,
    FooterComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
	  FetchJSONService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
