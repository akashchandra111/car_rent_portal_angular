import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Interfaces/User';
import { UserLog } from 'src/app/Interfaces/UserLog';
import { Login } from 'src/app/Interfaces/Login';
import { FetchJSONService } from '../fetch-json.service';
import { Email } from 'src/app/Interfaces/Email';

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
  userId: string; 
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
  email : Email;

  currentDate: any = new Date().getTime(); 
  currentUnixTime : any = parseInt(this.currentDate); 

  constructor(private route: ActivatedRoute, private router: Router, private http: FetchJSONService) {
    this.login = {
      id: JSON.parse(localStorage.getItem('user')).userId,
      password: JSON.parse(localStorage.getItem('user')).password
    }

    this.http.getUser(this.login).subscribe(
      (data)=>  {
        this.user = data['body'];
        this.http.getLatestUserHistory(this.user.userId).subscribe(
          (data)=>  {
           
            this.userlog = data['body'];
            var tempUser = this.userlog;

            console.log(this.userlog.startTime);
            // var index = 0;
             
            //   for(var log = 0; log < 4; log++) 
            //     {
            //       for(let log of tempUser) {
            //           if(parseInt(tempUser.startTime) >  this.currentUnixTime)
            //         {
            //           log.startTime = new Date(parseInt(log.startTime)).toLocaleString();
            //           log.endTime = new Date(parseInt(log.endTime)).toLocaleString()                     
            //           index++;
            //         }     
            //       }             
            //     }                         
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
      this.http.sendMail(this.email).subscribe(
        (data)=> {
         this.email = data['body'];
         console.log(this.email);
      });
  }

  bookingPage(){
    console.log("working");
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/choose_car'])); 
  }

  upcomingHistory(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/**'])); 
  }

  addMoneyToWallet(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/wallet'])); 
  }
  
}
