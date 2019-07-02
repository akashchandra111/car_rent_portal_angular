import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Car } from './Interfaces/Car';
import { CarStatus } from './Interfaces/CarStatus';
import { User } from './Interfaces/User';
import { UserLog } from './Interfaces/UserLog';
import { Message } from './Interfaces/Message';
import { Login } from './Interfaces/Login';

@Injectable({
  providedIn: 'root'
})
export class FetchJSONService {
	baseUrl: string = 'http://localhost:8080';

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
  deRegister(login: Login)	{
	  return this.http.post<Message>(this.baseUrl + '/user/deregister', login, this.httpOptions);
  }

  // Update user properties
  updateUser(user: User)	{
	  return this.http.put<Message>(this.baseUrl + '/user/update', user, this.httpOptions);
  }

  // User register
  register(register: User)	{
	  return this.http.post<Message>(this.baseUrl + '/user/register', register, this.httpOptions);
  }

  // Get user_profile
  getUser()	{
	  return this.http.get<User>(this.baseUrl + '/user/get_user', {observe: 'response'});
  }

  // User wallet add money
  addMoney(user: User, money: number)	{
	  user.wallet += money;
	  return this.updateUser(user);
  }

  //************************** Car APIs ***********************************
  // Add car
  addCar(car: Car)	{
	  return this.http.post<Message>(this.baseUrl + '/car/add', car, this.httpOptions);
  }

  // Get car by type
  getCarByType(carType: string)	{
	  return this.http.get<Car[]>(this.baseUrl + '/car/get_by_type/' + carType, {observe: 'response'});
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
  getLatestUserHistory()	{
	  return this.http.get<UserLog>(this.baseUrl + '/user_log/latest', {observe: 'response'});
  }

  // Get complete history
  getCompleteHistory()	{
	  return this.http.get<UserLog[]>(this.baseUrl + '/user_log/history', {observe: 'response'});
  }

  // Cancel booking or delete history value
  cancelBooking(bookingId: string)	{
	  return this.http.delete<Message>(this.baseUrl + '/user_log/cancel/' + bookingId, this.httpOptions);
  }

  // Update booking
  updateBooking(bookingId: string, userLog: UserLog)	{
	  return this.http.put<Message>(this.baseUrl + '/user_log/update/' + bookingId, userLog, this.httpOptions);
  }

  //************************** user log APIs ***********************************
  // Add CarStatus
  addCarStatus(carStatus: CarStatus)	{
	  return this.http.post<Message>(this.baseUrl + '/car_status/add', carStatus, this.httpOptions);
  }

  // Get carStatus
  getCarStatusByCarNo(carNo: string)	{
	  return this.http.get<CarStatus>(this.baseUrl + '/car_status/get' + carNo, {observe: 'response'});
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
}
