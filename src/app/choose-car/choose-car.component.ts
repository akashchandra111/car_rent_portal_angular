import { Component, OnInit } from '@angular/core';
import { FetchJSONService } from '../fetch-json.service';
import { Car } from '../Interfaces/Car';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-choose-car',
  templateUrl: './choose-car.component.html',
  styleUrls: ['./choose-car.component.css']
})
export class ChooseCarComponent implements OnInit {
	cars: Car[];

  constructor(private http: FetchJSONService, private router: Router) {
	  if(JSON.parse(localStorage.getItem('user'))== null)	{
		  this.router.navigate(['']);
	  }
  }

  ngOnInit() {
  }

	getCarByTypeOnClick(carType: string)	{
		this.http.getCarByType(carType).subscribe(
			(data)=>	{
				this.cars = data['body'];
			}
		);
	}
}
