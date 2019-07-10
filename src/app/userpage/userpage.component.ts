import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Interfaces/User';
import { UserLog } from 'src/app/Interfaces/UserLog';
import { Login } from 'src/app/Interfaces/Login';
import { FetchJSONService } from '../fetch-json.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {

  user : User;
  userlog : UserLog[];
  money : number;
  response : any;
  login: Login;
  userId: string = "1467"; //
  password: string = "vyshu";
  startTime: string;
  endTime: string;
  currentLocation: string;
  dropLocation: string;
  secretKey: string;
  wallet: number;
  unixStartTime: number;
  unixEndTime: number;

  currentDate: any = new Date().getTime(); 
  currentUnixTime : any = parseInt(this.currentDate);  
  
  constructor( private http: FetchJSONService) {
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
                  this.unixStartTime = parseInt(log.startTime);
                  this.unixEndTime = parseInt(log.endTime);
                } 
                for(let log of this.userlog)  {
                  log.startTime = new Date(parseInt(log.startTime)).toLocaleString();
                  log.endTime = new Date(parseInt(log.endTime)).toLocaleString();
                }             
          });

          this.http.getUser(this.login).subscribe(
              (data)=>  {
                this.user = data['body'];
          });    
           
      });   
         
  }

  ngOnInit() {
    
  }
  
}
