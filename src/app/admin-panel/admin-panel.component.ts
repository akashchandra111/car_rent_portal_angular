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
car_aval:string;
car_id_update:string;
car_no_update:string;
updatestatus:string;
car_no_delete:string;
deletestatus:string;

	  constructor(private router:Router,private http: FetchJSONService) {

		  if(JSON.parse(localStorage.getItem('user'))== null)	{

			  this.router.navigate(['']);
		  }
	  }
  ngOnInit() {
  }

	addCar(){
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
		status: "available"
		};


		console.log(carstatus);

        this.http.addCarStatus(carstatus).subscribe(
            (data:Message) => {

				if(data.status=="success"){
           this.addstatus=data.status;
console.log("added");
}
else{
	this.addstatus=data.status;
	       this.addstatus="Car not added";
		   console.log("not added");
}
            }

        );
	}



	updateCar(){
		let car: Car = {
			carId: this.car_id_update,
			carType: "",
			mileage: "",
			seaters: "",
			description: "",
			carName: "",
			imgPath: "",
			cost: 0
		};


		let carstatus:CarStatus = {
		carNo: this.car_no_update,
		carId: car,
		userId: JSON.parse(localStorage.getItem('user')),
		status: this.car_aval
		};


		console.log(carstatus);

		this.http.updateCarStatus(carstatus).subscribe(
			(data:Message) => {

				if(data.status=="success"){
		   this.updatestatus=data.message;
	console.log("updated");

	}
	else{
		   this.updatestatus=data.status;
		   this.updatestatus=data.message;


	}
			}

		);
	}

	deleteCar(){
console.log(this.car_no_delete);
let carNo=this.car_no_delete;
		this.http.deleteCarStatus(carNo).subscribe(
			(data:Message) => {

				if(data.status=="success"){
		   this.deletestatus=data.message;
	console.log("deleted");
	}
	else{

		   this.deletestatus=data.message;
console.log("not deleted");
	}
			}

		);
	}


carstats(){
	console.log("car log clicked");
}

}
