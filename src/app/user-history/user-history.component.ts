import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserLog } from 'src/app/Interfaces/UserLog';
import { Login } from 'src/app/Interfaces/Login';
import { User } from 'src/app/Interfaces/User';
import { FetchJSONService } from '../fetch-json.service';
import { Message } from '../Interfaces/Message';

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
    checkUserlog: boolean = true;
    

  // get the objects from [session] userId & password
    userId : string; //
    password : string; //

  constructor(private route: ActivatedRoute, private router: Router, private http: FetchJSONService) {
    this.login = {
      id: JSON.parse(localStorage.getItem('user')).userId,
      password: JSON.parse(localStorage.getItem('user')).password
    }

    this.http.getUser(this.login).subscribe(
      (data)=>  {
        this.user = data['body'];
        
      this.http.getCompleteHistory(this.user.userId).subscribe(
        (data)=>  {
          this.userlog = data['body'];
          for(let log of this.userlog)  {
            if(log.userLogId != null){
              this.checkUserlog = true;
            }else{
              this.checkUserlog = false;
            }
            log.startTime = new Date(parseInt(log.startTime)).toLocaleString();
            log.endTime = new Date(parseInt(log.endTime)).toLocaleString();
          }
          
      });
    });
      
   }

  ngOnInit() {
   
  }
  
}
