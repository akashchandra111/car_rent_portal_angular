// [Author => Akash Chandra]
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchJSONService } from '../fetch-json.service';
import { Car } from '../Interfaces/Car';
import { Login } from '../Interfaces/Login';
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
  checkCurrentCarStatus: boolean = true;
  toastMessage: string;
  todaysDate: string;

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
	  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
	  this.todaysDate = new Date().toISOString().slice(0, 10);
	  this.carId = this.route.snapshot.paramMap.get('carId');

	  // Getting car from carId name
	  this.http.getCarById(this.carId).subscribe(
		  (data) =>	{
			  this.car = data['body'];
		  }
	  );

	  // For testing purpose otherwise we will use object from session
	  let login: Login = {
		  id: JSON.parse(localStorage.getItem('user')).userId,
		  password: JSON.parse(localStorage.getItem('user')).password
	  }

	  this.http.getUser(login).subscribe(
		(data)=>	{
			this.user = data['body'];
		}
	  );

	  this.http.getCarStatusByCarId(this.carId).subscribe(
		  (data)=>	{
			  this.carStatus = data['body'];
			  if(this.carStatus.carNo == null)	{
				  this.checkCurrentCarStatus = false;
			  }
			  else	{
				  this.checkCurrentCarStatus = true;
			  }
		  }
	  );
  }

  checkCost()	{
	  let startDateTime = new Date(this.startDate + ' ' + this.startTime).getTime();
	  let endDateTime = new Date(this.endDate + ' ' + this.endTime).getTime();

	  let dateDiffInHours = (endDateTime - startDateTime) / 36e5;

	  this.calculatedBookingCost = Math.floor(dateDiffInHours * this.car.cost);
  }

  bookCar()	{
	  // Would calculate price and use it for sending in the userLog
	  this.checkCost();

	// User booking object would be added to user_log table and car_status would be updated
	this.userLog = {
		userLogId: Math.floor(Math.random() * 10e7).toString(),
		userId: this.user,
		startTime: Math.floor(new Date(this.startDate + ' ' + this.startTime).getTime()).toString(),
		endTime: Math.floor(new Date(this.endDate + ' ' + this.endTime).getTime()).toString(),
		currentLocation: this.startLocation,
		dropLocation: this.dropLocation,
		secretKey: Math.floor(Math.random() * 10e7).toString(),
		totalAmount: this.calculatedBookingCost,
		paidAmount: this.calculatedBookingCost
	}

	  // Getting free car from the car_status
	  this.http.getCarStatusByCarId(this.car.carId).subscribe(
		    (data)=>	{
				this.carStatus = data['body'];

				if(this.carStatus.carNo == null)	{
					// That means either car doesn't exist or is already booked
					this.toastMessage = "All the cars have been booked, please choose another or come after sometime";
					return;
				}
				// Altering the car_status object
				this.carStatus.userId = this.user;
				this.carStatus.status = 'booked';

				// Changing the car_status
				if(this.user.wallet >= this.calculatedBookingCost)	{
					this.http.updateCarStatus(this.carStatus).subscribe(
						(updatedData)=>	{
							this.message = updatedData;
							if(this.message.status == "success")	{

								 // Adding entry to user_log
								this.http.addUserLog(this.userLog).subscribe(
						  		  (data)=>	{
						  			  this.message = data;
									  if(this.message.status == "success")	{
										  this.user.wallet = this.user.wallet - this.calculatedBookingCost;
										  //console.log(this.toastMessage);
										  this.http.updateUser(this.user).subscribe(
											  (data)=>	{
												  this.message = data;
												  if(this.message.status == "success")	{
													  console.log(this.userLog);
													  this.toastMessage = "Booking success";
													  return;
												  }
											  }
										  );
									  }
									  else 	{
										  this.toastMessage = "Booking failure, please report and check after sometime.";
										  //console.log(this.toastMessage);
									  }
						  		  }
						  	  );
							}
							else 	{
								this.toastMessage = "Booking failure, please report and check after sometime.";
								console.log(this.user);
							}
						}
					);
				}
				else	{
					this.toastMessage = "You balance is low, please recharge your wallet first";
					//console.log(this.message);
				}
			}
	  );
  }
}
