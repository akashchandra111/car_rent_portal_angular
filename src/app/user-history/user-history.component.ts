import { Component, OnInit } from '@angular/core';
import { UserLog } from 'src/app/Interfaces/UserLog';
import { Login } from 'src/app/Interfaces/Login';
import { User } from 'src/app/Interfaces/User';
import { FetchJSONService } from '../fetch-json.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
    
    userlog : UserLog[];
    user : User;
    login : Login;
    response : any;
    
    userLogId : string;
    startTime : string;
    endTime : string;
    currentLocation : string;
    dropLocation : string;
    secretKey : string;
    totalAmount : string;
    paidAmount : string;
    bookingId : string;

  // get the objects from [session] userId & password
    userId : string = "1467"; //
    password : string = "vyshu"; //

    
    // normalTimeFormat = this.unixTime.toLocaleString();
    
  constructor(private http: FetchJSONService) {
    this.login = {
      id: this.userId,
      password: this.password
    }

    this.http.getUser(this.login).subscribe(
      (data)=>  {
        this.user = data['body'];
        
      this.http.getCompleteHistory(this.user.userId).subscribe(
        (data)=>  {
          this.userlog = data['body'];
          for(let log of this.userlog)  {
            log.startTime = new Date(parseInt(log.startTime)).toLocaleString();
            log.endTime = new Date(parseInt(log.endTime)).toLocaleString();
          }
      });
      this.http.cancelBooking(this.bookingId).subscribe(data => {
        this.userlog = data['body'];
        console.log("welcome");
      }); 
    });
      // console.log(this.normalTimeFormat);
      
   }

  ngOnInit() {
   
  }
  onDelete() {
    console.log("checking");
    
    this.http.cancelBooking(this.bookingId).subscribe(data => {
      this.userlog = data['body'];
      console.log("welcome");
    });
  }
}