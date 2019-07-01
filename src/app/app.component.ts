import { Component } from '@angular/core';
import { FetchJSONService } from './fetch-json.service';
import { Car } from './Interfaces/Car';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RentOCar';
  cars: Car;

  constructor(private carData: FetchJSONService)	{
  }

  ngOnInit()	{
	  this.getCar();
  }

  getCar()	{
	  this.carData.getData().subscribe(
		  (data)=>	{
			  this.cars= data['body'];
			  console.log("Car Name: " + this.cars.carName);
			  console.log("Car Mileage: " + this.cars.mileage);
		  }
	  );
  }
}
