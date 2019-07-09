// [Author => Akash Chandra]
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchJSONService } from '../fetch-json.service';
import { Car } from '../Interfaces/Car';
import { CarStatus } from '../Interfaces/CarStatus';
import { User } from '../Interfaces/User';
import { UserLog } from '../Interfaces/UserLog';
import { Message } from '../Interfaces/Message';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  carId: string;
  carNo: string;

  toastMessage: string;

  user: User;
  userLog: UserLog;
  car: Car;
  carStatus: CarStatus;
  message: Message;

  // View binded data
  startLocation: string;
  dropLocation: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  secretKey: string;
  paidAmount: string;
  calculatedBookingCost: number = 0;

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

  checkCost()	{
	  let startDateTime = new Date(this.startDate + ' ' + this.startTime).getTime();
	  let endDateTime = new Date(this.endDate + ' ' + this.endTime).getTime();

	  let dateDiffInHours = (endDateTime - startDateTime) / 36e5;

	  this.calculatedBookingCost = parseInt(dateDiffInHours * this.car.cost);
  }

  bookCar()	{
	  // Would calculate price and use it for sending in the userLog
	  this.checkCost();

	  // For testing purpose otherwise we will use object from session
	  this.user = {
		  userId: 'bb22',
		  firstName: 'string',
		  lastName: 'string',
		  mobileNo: 'string',
		  govtIdType: 'string',
		  govtIdNum: 'string',
		  drivingLicenseNum: 'string',
		  userName: 'string',
		  password: 'string',
		  email: 'string',
		  wallet: 0
	  }

	  // User booking object would be added to user_log table and car_status would be updated
	  this.userLog = {
		  userLogId: parseInt(Math.random() * 10e7).toString(),
		  userId: this.user,
		  startTime: parseInt(new Date(this.startDate + ' ' + this.startTime).getTime()).toString(),
		  endTime: parseInt(new Date(this.endDate + ' ' + this.endTime).getTime()).toString(),
		  currentLocation: this.startLocation,
		  dropLocation: this.dropLocation,
		  secretKey: parseInt(Math.random() * 10e7).toString(),
		  totalAmount: this.calculatedBookingCost,
		  paidAmount: this.calculatedBookingCost
	  }

	  // Getting free car from the car_status
	  this.http.getCarStatusByCarId(this.car.carId).subscribe(
		    (data)=>	{
				this.carStatus = data['body'];

				// Altering the car_status object
				this.carStatus.userId = this.user;
				this.carStatus.status = 'booked';

				// Changing the car_status
				this.http.updateCarStatus(this.carStatus).subscribe(
					(updatedData)=>	{
						this.message = updatedData;
						if(this.message.status == "success")	{
							 // Adding entry to user_log
							this.http.addUserLog(this.userLog).subscribe(
					  		  (data)=>	{
					  			  this.message == data;
								  if(this.message.status == "success")	{
									  this.toastMessage = "Booking success";
									  console.log(this.toastMessage)
								  }
								  else 	{
									  this.toastMessage = "Booking failure, please report and check after sometime.";
									  console.log(this.toastMessage);
								  }
					  		  }
					  	  );
						}
						else 	{
							this.toastMessage = "Booking failure, please report and check after sometime.";
							console.log(this.toastMessage);
						}
					}
				);
			}
	  );
  }
}
