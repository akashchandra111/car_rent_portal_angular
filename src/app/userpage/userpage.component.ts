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
        this.http.getCompleteHistory(this.user.userId).subscribe(
          (data)=>  {
           
            this.userlog = data['body'];
            this.userlog = this.userlog.slice(0, 3);

            
            for(let i = 0; i < this.userlog.length; i++){
              this.userlog[i].startTime = new Date(parseInt(this.userlog[i].startTime)).toLocaleString();
              this.userlog[i].endTime = new Date(parseInt(this.userlog[i].endTime)).toLocaleString();
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

  bookedCar(){
    console.log("working");
    
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/booked_car/:carNo'])); 
  }

  addMoneyToWallet(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/wallet'])); 
  }
  
}
