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
  userlog : any;
  userTemplog : UserLog[];
  money : number;
  response : any;
  login: Login;
  userId: string; //
  password: string;
  startTime: string;
  endTime: string;
  currentLocation: string;
  dropLocation: string;
  secretKey: string;
  wallet: number;
  unixStartTime: number;
  unixEndTime: number;
  userObject: any;

  currentDate: any = new Date().getTime(); 
  currentUnixTime : any = parseInt(this.currentDate);  

  constructor( private http: FetchJSONService) {
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
            this.userTemplog = this.userObject;
            var index = 0;
            console.log(this.userlog.startTime);
            console.log(parseInt(this.userlog.startTime));
                // for(var log = 0; log < this.userTemplog.length; log++) 
                // {
                //   if(parseInt(this.userObject.startTime) >  this.currentUnixTime)
                //   {
                //     console.log("user"+this.userlog);
                //     this.userlog[index] = this.userTemplog[log];
                //     index++;
                //   }            
                // } 
            console.log("userlog is "+this.userlog);

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
  postQuery(){
     
      
  }
}
