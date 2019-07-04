import { Component, OnInit } from '@angular/core';
import { FetchJSONService } from '../fetch-json.service';
import {User} from 'src/app/Interfaces/User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  response: any;
  firstName: String = this.firstName;
  lastName: String = this.lastName;
  mobileNo: String = this.mobileNo;
  userName: String = this.userName;
  email: String = this.email
  wallet: number = this.wallet;
  userId: String = this.userId;
  
  model: User = {  
    userId: '',
    firstName:'',
    lastName: '',
    mobileNo: '',
    govtIdType: '',
    govtIdNum: '',
    userName: '',
    password: '',
    email: '',
    wallet: 1000
      
  };  
  

  constructor() {
  }

  ngOnInit() {

  }
 
  changeUserName(){
    alert(this.model.userName);
  }
  changeUserpassword(){
    alert(this.model.password);
  }
  changeMobileNo(){
    alert(this.model.mobileNo);
  }
  changeEmail(){
    alert(this.model.email);
  }
 

}
