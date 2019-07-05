import { Component } from '@angular/core';
import { User } from './Interfaces/User';
import { FetchJSONService } from './fetch-json.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RentOCar';
  loggedUser: User;

  constructor(private carData: FetchJSONService)	{
  }

  ngOnInit($event)	{
	  let data = sessionStorage.getItem('user');
  	this.loggedUser = this.getUser(data);
  }

 getUser(event){
	console.log("here comes the user");

	return event;
}

}
