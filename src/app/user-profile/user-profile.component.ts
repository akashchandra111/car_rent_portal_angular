import { Component, OnInit } from '@angular/core';
import { FetchJSONService } from '../fetch-json.service';
import { User } from 'src/app/Interfaces/User';
import { Login } from 'src/app/Interfaces/Login'
import { Message } from 'src/app/Interfaces/Message';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

   user: User = {
    userId: '',
    firstName:'',
    lastName: '',
    mobileNum: '',
    govtIdType: '',
    govtIdNum: '',
    drivingLicenseNum: '',
    userName: '',
    password: '',
    email: '',
    wallet: 0
  };

  message: Message;

  userId: string  ;
  password: string ;
  login: Login;
  response: any;

  constructor(private http: FetchJSONService)
  {
      this.login =
       {
      id: JSON.parse(localStorage.getItem('user')).userId,
      password: JSON.parse(localStorage.getItem('user')).password
      // id : this.userId,
      // password : this.password
       }

    this.http.getUser(this.login).subscribe(
      (data) => {
        this.user = data['body'];
        console.log(data);
       });
   }

  ngOnInit() {

  }


  changeUserName()
   {
     console.log(this.user);
    this.http.updateUser(this.user).subscribe(
      (data: Message)=>  {
       console.log(data);
      }
    );
    }

  changeUserpassword(){
    console.log(this.user);
    this.http.updateUser(this.user).subscribe(
      (data: Message)=>  {
       console.log(data);
      }
    );
   }

  changeMobileNo(){
    console.log(this.user);
    this.http.updateUser(this.user).subscribe(
      (data: Message)=>  {
       console.log(data);
      }
    );
  }

  changeEmail(){
    console.log(this.user);
    this.http.updateUser(this.user).subscribe(
      (data: Message)=>  {
       console.log(data);
      }
    );
   }

  changeGovId(){

    console.log(this.user);
    this.http.updateUser(this.user).subscribe(
      (data: Message)=>  {
       console.log(data);
      }
    );

  }
  changeGovType(){
    console.log(this.user);
    this.http.updateUser(this.user).subscribe(
      (data: Message)=>  {
       console.log(data);
      }
    );

  }
  deleteAccount()
{
  console.log(this.user);
  this.http.deRegister(this.user.userId).subscribe(
    (data : Message) => {
      console.log(data);
    }
  );

}


}
