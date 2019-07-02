import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {

  userFirstName : String = "Vyshnavi";

  userEmail : String = "vyshnavi@gmail.com";

  userWallet : Number = 2000;

  carPickupLocation : String = "Manyatha Tech park, Bangalore";

  carPickupTime : String = "2:30 PM";

  carSecretKey : Number = 1234;

  constructor() { }

  ngOnInit() {
  }

}
