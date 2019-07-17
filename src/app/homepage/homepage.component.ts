import { Component, OnInit } from '@angular/core';
import { FetchJSONService } from '../fetch-json.service';
import { Car } from '../Interfaces/Car';
import { Login } from '../Interfaces/Login';
import { User } from '../Interfaces/User';

import { HeaderComponent } from '../header/header.component';

import { Router,NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  cars: Car[]
username: string;
password:string;
id:string;
ifAlert:boolean=false;
user:User;

miniCarImgPath: string;
microCarImgPath: string;
suvCarImgPath: string;
deluxeCarImgPath: string;

  constructor(private http: FetchJSONService, private router: Router) {

 }

  ngOnInit() {
  }

	getCarByTypeOnClick(carType: string)	{
		this.http.getCarByType(carType).subscribe(
			(data)=>	{
				this.cars = data['body'];
			}
		);
	}
	carlogin(){

console.log("carlogin() clicked");


let login: Login = {
	id: this.username,
	password: this.password
};
this.http.getUser(login).subscribe(
	(data) => {
		this.user = data['body'];

		if (this.user.userId == null) {

			console.log("user not present");

			this.ifAlert = true;
		} else {
			console.log(this.user);
			console.log("user is present");

			this.ifAlert = false;
			localStorage.setItem('carid',this.id);
			localStorage.setItem('user', JSON.stringify(this.user));
			if(JSON.parse(localStorage.getItem('user')).userId == "0") {
				console.log("routing to admins");
							window.location.href="/admin"
						}
						else{
window.location.href="/dashboard"
							let	headercomp=new HeaderComponent(this.http,this.router);





}
}
	}
);
}

setid(carid){
	this.id=carid;
}

}
