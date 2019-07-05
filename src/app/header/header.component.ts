import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { FetchJSONService } from '../fetch-json.service';
import { Login } from '../Interfaces/Login';
import { User } from '../Interfaces/User';
import { Message } from '../Interfaces/Message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
username: string;
password: string;
user: User;
ifLogged: boolean=true;
ifAlert:boolean=false;
iftrue:boolean=true;


firstName: string;
lastName: string;
mobileNo: string;
idType: string;
verification_id: string;
drivingLicenseNum: string;
userName: string;
email: string;
passwordregister: string;
message:Message;
wallet:string;

@Output() public loginEvent= new EventEmitter<User>();


  constructor(private http: FetchJSONService,private router:Router)	{

	  let login: Login = {
  		id: this.username,
  		password: this.password
  	};

	  // this.user =	{
		//   userId: '',
		//   firstName: '',
		//   lastName: '',
		//   mobileNo: '',
		//   govtIdType: '',
		//   govtIdNum: '',
		//   email: '',
		//   password: '',
		//   userName: '',
		//   wallet: 0
	  // }
	  // this.http.getUser().subscribe(
		//   (data)=>	{
		// 	  this.user = data;
			//console.log(this.user);
	// 		if(sessionStorage.getItem('user') == null)	{
	// 		  console.log(this.user);
	// 		  console.log("user not present");
	// 		  this.ifLogged=true;
	// 		  this.iftrue=true;
	// 		}
	// 		else 	{
	// 		  console.log(this.user);
	// 		  console.log("user is present");
	// this.ifLogged=false;
	// this.loginEvent.emit(this.user);
	// this.iftrue=false;
	// sessionStorage.setItem('user', this.user.userName);
	// 		}
	// 	  }
	  // );
  // }
}
  ngOnInit() {
	  if(sessionStorage.getItem('user') == null)	{
  	  console.log(this.user);
  	  console.log("user not present");
  	  this.ifLogged=true;
  	  this.iftrue=true;
  	}
  	else 	{
  	  console.log(this.user);
  	  console.log("user is present");
  this.ifLogged=false;
  this.loginEvent.emit(this.user);
  this.iftrue=false;
  sessionStorage.setItem('user', this.user.userName);
  	}

  }

checkLogin(){
	let login: Login = {
		id: this.username,
		password: this.password
	};

	this.http.login(login).subscribe(
		(data: User)=>	{
			this.user =	data;
		  //console.log(this.user);
		  if(this.user.userId == null)	{
		  	console.log(this.user);
		  	console.log("user not present");
			this.ifLogged=true;
			this.ifAlert=true;
			this.iftrue=true;

		  }
		  else 	{
		  	console.log(this.user);
		  	console.log("user is present");
this.ifLogged=false;
this.loginEvent.emit(this.user);
this.iftrue=false;
sessionStorage.setItem('user', this.user.userName);
this.router.navigate(['/dashboard'],{ queryParams: { }});
		  }
		}
	);


}

register(){
	let ranNo=Math.floor(100000000 + Math.random() * 900000000).toString();
	let userregister: User={
		userId:ranNo,
		firstName : this.firstName,
		lastName: this.lastName,
		mobileNo: this.mobileNo,
		govtIdType: this.idType,
	govtIdNum: this.verification_id,
		drivingLicenseNum: this.drivingLicenseNum,
		userName: this.userName,
password: this.passwordregister,
		email: this.email,
		wallet:0

	};

	this.http.register(userregister).subscribe(
		(data:Message)=>{
			this.message=data;
		console.log(this.message);
		console.log("reg");
		if(this.message.status == null)	{




		  console.log("user not present");
		  this.ifLogged=true;
		  this.loginEvent.emit(this.user);
		}
		else 	{
			let login: Login = {
				id: this.userName,
				password: this.passwordregister
			};

			this.http.login(login).subscribe(
				(data: User)=>	{
					this.user =	data;
				  //console.log(this.user);
				  if(this.user.userId == null)	{
				  	console.log(this.user);
				  	console.log("user not present");
					this.ifLogged=true;
				  }
				  else 	{
				  	console.log(this.user);
				  	console.log("user is present");
		this.ifLogged=false;
		sessionStorage.setItem('user', this.user.userName);
		this.loginEvent.emit(this.user);
				  }
				}
			);
		  console.log("user is present");
this.ifLogged=false;

		}

	}
);
}


logout(){
console.log("logout running");
	this.http.logout().subscribe(
		(data:Message)=>{
			this.message=data;
		console.log(this.message);
		console.log("logout");

		if(this.message.status == "failure"){


		  this.ifLogged=false;
		  console.log("not logged in");

		}
		else 	{
			this.iftrue=true;
			console.log(this.iftrue);
				this.ifLogged=true;
				sessionStorage.removeItem('user');
				sessionStorage.clear();
			window.location.reload();


		}
	}
	);
}

}
