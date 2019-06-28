import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userFirstName : String = "V";
  userLastName : String = "Bhavana";
  userMobile :number = 123;
  userEmail : String = "bhavana111@gmail.com" ;
  id : number = 1;
  userWallet : number = 100; 
  constructor() { }

  ngOnInit() {
  }

}
