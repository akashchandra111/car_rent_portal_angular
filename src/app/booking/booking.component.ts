import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchJSONService } from '../fetch-json.service';
import { Car } from '../Interfaces/Car';
import { User } from '../Interfaces/User';
import { UserLog } from '../Interfaces/UserLog';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  carId: string;
  user: User;
  car: Car;
  userBooking: UserLog;

  startLocation: string;
  dropLocation: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  secretKey: string;
  paidAmount: string;
  calculatedBookingCost: number;

  constructor(private route: ActivatedRoute, private router: Router, private http: FetchJSONService) {
  }

  ngOnInit() {
	  this.carId = this.route.snapshot.paramMap.get('carId');

	  // Getting car from carId name
	  this.http.getCarById(this.carId).subscribe(
		  (data) =>	{
			  this.car = data['body'];
		  }
	  );
  }

  bookCar()	{
	  this.userBooking = {
		  userLogId: 'random id',
		  userId: this.user,
		  startTime: new Date(this.startTime + ' ' +this.startDate).toDateString(),
		  endTime: new Date(this.endTime + ' ' + this.endDate).toDateString(),
		  currentLocation: this.startLocation,
		  dropLocation: this.dropLocation,
		  secretKey: 'calculated randomly',
		  totalAmount: this.calculatedBookingCost,
		  paidAmount: this.calculatedBookingCost
	  }

	  console.log(this.userBooking);
  }

}
