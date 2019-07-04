import { Component, OnInit } from '@angular/core';
import { FetchJSONService } from '../fetch-json.service';
import { Car } from '../Interfaces/Car';

@Component({
  selector: 'app-choose-car',
  templateUrl: './choose-car.component.html',
  styleUrls: ['./choose-car.component.css']
})
export class ChooseCarComponent implements OnInit {
	cars: Car[];

  constructor(private http: FetchJSONService) { }

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
