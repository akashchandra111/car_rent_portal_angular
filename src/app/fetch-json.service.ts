import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Car } from './Interfaces/Car';
import { CarStatus } from './Interfaces/CarStatus';
import { User } from './Interfaces/User';
import { UserLog } from './Interfaces/UserLog';
import { Message } from './Interfaces/Message';
import { Login } from './Interfaces/Login';
import { CarsBookStat } from './Interfaces/CarsBookStat';
import { Email } from './Interfaces/Email';
import { LicenseImg } from './Interfaces/LicenseImg';

@Injectable({
  providedIn: 'root'
})
export class FetchJSONService {
	baseUrl: string = 'http://9.202.17.174:8080';
	adminBaseUrl: string = 'http://9.202.17.174:8081';
	// baseUrl: string = 'http://localhost:8080';
	// adminBaseUrl: string = 'http://localhost:8081';

  constructor(private http: HttpClient) {
  }

  httpOptions = {
	headers: new HttpHeaders(
		{
			'Content-Type': 'application/json'
		}
	)
  };

  //************************** User APIs ***********************************
  // User login
  login(login: Login)	{
	  return this.http.post<User>(this.baseUrl + '/user/login', login, this.httpOptions);
  }
  // User logout
  logout()	{
	  return this.http.post<Message>(this.baseUrl + '/user/logout', {}, this.httpOptions);
  }

  // User deregister
  deRegister(userId: string)	{
	  // Send the login object and it would automatically delete user from db
	  return this.http.delete<Message>(this.baseUrl + '/user/deregister/' + userId, this.httpOptions);
  }

  // Update user properties
  updateUser(user: User)	{
	  // Updates the user by passing the user object [don't change userId in any case]
	  return this.http.put<Message>(this.baseUrl + '/user/update', user, this.httpOptions);
  }

  // User register
  register(register: User)	{
	  // Construct the user object by giving random userId and all other fields
	  return this.http.post<Message>(this.baseUrl + '/user/register', register, this.httpOptions);
  }

  // Get user_profile
  getUser(login: Login)	{
	  // As login functionality is removed you have to send login object
	  return this.http.post<User>(this.baseUrl + '/user/get_user', login, {observe: 'response'});
  }

  // User wallet add money
  addMoney(user: User, money: number)	{
	  user.wallet += money;
	  return this.updateUser(user);
  }

  // Account Recovery this will send mail to user mail id if it is matched correctly
  recoverAccount(drivingLicenseNum: String)	{
	  return this.http.get<Message>(this.adminBaseUrl + '/account_recovery/' + drivingLicenseNum, {observe: 'response'});
  }

  //************************** Car APIs ***********************************
  // Add car
  addCar(car: Car)	{
	  return this.http.post<Message>(this.baseUrl + '/car/add', car, this.httpOptions);
  }

  // Get car by type
  getCarByType(carType: string)	{
	  return this.http.get<Car[]>(this.baseUrl + '/car/type/' + carType, {observe: 'response'});
  }

  // Get car by id
  getCarById(carId: string)	{
	  return this.http.get<Car>(this.baseUrl + '/car/get/' + carId, {observe: 'response'});
  }

  // Update car
  updateCar(car: Car)	{
	  return this.http.put<Message>(this.baseUrl + '/car/update/' + car.carId, car, this.httpOptions);
  }

  // Delete car
  deleteCar(carId: string)	{
	  return this.http.delete<Message>(this.baseUrl + '/car/delete/' + carId, this.httpOptions);
  }

  //************************** user log APIs ***********************************
  // Add user log
  addUserLog(userLog: UserLog)	{
	  return this.http.post<Message>(this.baseUrl + '/user_log/add', userLog, this.httpOptions);
  }

  // Get latest history
  getLatestUserHistory(userId: string)	{
	  // Send the userId from the user object to get its history
	  return this.http.get<UserLog>(this.baseUrl + '/user_log/latest/' + userId, {observe: 'response'});
  }

  // Get complete history
  getCompleteHistory(userId: string)	{
	  // Send the userId from the user object to get its history
	  return this.http.get<UserLog[]>(this.baseUrl + '/user_log/history/' + userId, {observe: 'response'});
  }

  // Cancel booking or delete history value
  cancelBooking(bookingId: string)	{
	  return this.http.delete<Message>(this.baseUrl + '/user_log/cancel/' + bookingId, this.httpOptions);
  }

  // Update booking
  updateBooking(bookingId: string, userLog: UserLog)	{
	  return this.http.put<Message>(this.baseUrl + '/user_log/update/' + bookingId, userLog, this.httpOptions);
  }

  //************************** carStatus log APIs ***********************************
  // Add CarStatus
  addCarStatus(carStatus: CarStatus)	{
	  return this.http.post<Message>(this.baseUrl + '/car_status/add', carStatus, this.httpOptions);
  }

  // Get carStatus
  getCarStatusByCarNo(carNo: string)	{
	  return this.http.get<CarStatus>(this.baseUrl + '/car_status/get/' + carNo, {observe: 'response'});
  }

  // Get car status by car id, if it is not booked the first car would be returned
  getCarStatusByCarId(carId: string)	{
	  return this.http.get<CarStatus>(this.baseUrl + '/car_status/by_id/get/' + carId, {observe: 'response'});
  }

  // Update car status
  updateCarStatus(carStatus: CarStatus)	{
	  return this.http.put<Message>(this.baseUrl + '/car_status/update/' + carStatus.carNo, carStatus, this.httpOptions);
  }

  // Delete car status
  deleteCarStatus(carNo: string)	{
	  return this.http.delete<Message>(this.baseUrl + '/car_status/delete/' + carNo, this.httpOptions);
  }

  //************************** admin method APIs ***********************************
  getTotalUser()	{
	  return this.http.get<number>(this.adminBaseUrl + '/admin/total_users', {observe: 'response'});
  }

  getCarStats()	{
	  return this.http.get<CarsBookStat[]>(this.adminBaseUrl + '/admin/stats/cars', {observe: 'response'});
  }

  sendMail(email: Email)	{
	  return this.http.post<Message>(this.adminBaseUrl + '/mail', email, this.httpOptions);
  }

  checkLicense(userId: string)	{
	  return this.http.get<LicenseImg>(this.adminBaseUrl + '/get_license/' + userId, {observe: 'response'});
  }
}
