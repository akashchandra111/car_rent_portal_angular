import { Component,ViewChild } from '@angular/core';
import { User } from './Interfaces/User';
import { FetchJSONService } from './fetch-json.service';
import { Router,NavigationEnd } from '@angular/router';
import {HeaderComponent} from './header/header.component'






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'RentOCar';
 

  constructor(private carData: FetchJSONService,private router: Router)	{

       }


  ngOnInit()	{

  }

 getUser(){

}

}
