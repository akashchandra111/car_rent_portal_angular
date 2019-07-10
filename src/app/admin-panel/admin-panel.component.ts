import { Component, OnInit} from '@angular/core';
import { FetchJSONService } from '../fetch-json.service';
import { HttpClientModule } from '@angular/common/http';
import { Router,NavigationEnd } from '@angular/router';
import { Car } from '../Interfaces/Car';
import { User } from '../Interfaces/User';
import { Message } from '../Interfaces/Message';
import { CarStatus } from '../Interfaces/CarStatus';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

	 carNumber: string;
	carId: string;
addstatus:string;


	  constructor(private router:Router,private http: FetchJSONService) {

		  if(JSON.parse(localStorage.getItem('user'))== null)	{

			  this.router.navigate(['']);
		  }
	  }
  ngOnInit() {
  }

	addCar(){
		this.addstatus=this.carId;
		console.log(this.carId);
		let car: Car = {
			carId: this.carId,
			carType: "",
			mileage: "",
			seaters: "",
			description: "",
			carName: "",
			imgPath: "",
			cost: 0
		};
		let carstatus:CarStatus = {
		carNo: this.carNumber,
		carId: car,
		userId: JSON.parse(localStorage.getItem('user')),
		status: "avialable"
		};


		console.log(carstatus);

        this.http.addCarStatus(carstatus).subscribe(
            (data:Message) => {

				if(data.status=="success"){
           this.addstatus=data.status;
console.log("added");
}
else{
	       this.addstatus="Car not added";
		   console.log("not added");
}
            }

        );
	}

}
