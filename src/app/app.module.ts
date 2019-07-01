import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

//import { AppRoutingModule, RouterComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';

//import { BookingComponent } from './booking/booking.component';

import { FetchJSONService } from './fetch-json.service';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    IndexComponent,
   
],
  imports: [
    BrowserModule,
  ],
  providers: [
	  FetchJSONService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
