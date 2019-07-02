import { Component } from '@angular/core';
import { FetchJSONService } from './fetch-json.service';
import { CarStatus } from './Interfaces/CarStatus';
import { Car } from './Interfaces/Car';
import { User } from './Interfaces/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RentOCar';
  car: Car[];

  constructor(private carData: FetchJSONService)	{
  }

  ngOnInit()	{
	  this.getCar();
  }

  getCar()	{
	  this.carData.getCarByType('mini').subscribe(
		  (data) =>	{
			  this.car = data['body'];
			  console.log(this.car);
		  }
	  );
  }
}
