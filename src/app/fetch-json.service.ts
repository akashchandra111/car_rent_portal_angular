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

	responseData: string;

  constructor(private http: HttpClient) {
  }

  httpOptions = {
	headers: new HttpHeaders(
		{
			'Content-Type': 'application/json'
		}
	)
  };

  // This will return the JSON object that we have to subscribe in the using class in ngOnInit
  getData()	{
	  return this.http.get<CarStatus>('http://localhost:8080/car_status/by_id/get/1001', {observe: 'response'});
  }

  login(login: Login)	{
	  return this.http.post<User>('http://9.202.17.174:8080/user/login', login, this.httpOptions);
  }

  logout()	{
	  return this.http.post<Message>('http://9.202.17.174:8080/user/logout', {}, this.httpOptions);
  }

  register(register: User)	{
	  return this.http.post<Message>('http://9.202.17.174:8080/user/register', register, this.httpOptions);
  }

  getCar(carType: string)	{
	  return this.http.get<Car[]>('http://localhost:8080/car/get_by_type/' + carType, {observe: 'response'});
  }
}
