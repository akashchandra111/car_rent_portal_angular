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
  userFirstName : String = "V";
  userLastName : String = "Bhavana";
  userMobile :number = 123;
  userEmail : String = "bhavana111@gmail.com" ;
  id : number = 1;
  userWallet : number = 100;

  model: User = {
    userId: '',
    firstName:'',
    lastName: '',
    mobileNo: '',
    govtIdType: '',
    govtIdNum: '',
	drivingLicenseNum: '',
    userName: '',
    password: '',
    email: '',
    wallet: 1000
  };

  constructor() {

  }
  ngOnInit() {

  }
}
