import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Car } from './Interfaces/Car';

@Injectable({
  providedIn: 'root'
})
export class FetchJSONService {

	responseData: string;

  constructor(private http: HttpClient) {
  }

	// This will return the JSON object that we have to subscribe in the using class in ngOnInit
  getData()	{
	  return this.http.get<Car>('../assets/Car.json', {observe: 'response'});
  }
}
