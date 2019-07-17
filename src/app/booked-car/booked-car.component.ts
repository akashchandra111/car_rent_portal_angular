import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Interfaces/User' ;
import { UserLog } from 'src/app/Interfaces/UserLog';
import { Login } from 'src/app/Interfaces/Login';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { FetchJSONService } from '../fetch-json.service';
import { Message } from '../Interfaces/Message';
import { Car } from 'src/app/Interfaces/Car';
import{ CarStatus } from 'src/app/Interfaces/CarStatus'

@Component({
  selector: 'app-booked-car',
  templateUrl: './booked-car.component.html',
  styleUrls: ['./booked-car.component.css']
})
export class BookedCarComponent implements OnInit {

  user : User;
  userlog : any;
  userTemplog : UserLog;
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
  car : Car;
  carId : string;
  totalAmount : number;
  tempstartTime : any;
 

  carStatus: CarStatus;
  message : Message;
  
  
  

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
            console.log(this.userlog.startTime);
            this.tempstartTime = parseInt(this.userlog.startTime);
            this.userlog.startTime = new Date(parseInt(this.userlog.startTime)).toLocaleString();
            this.userlog.endTime = new Date(parseInt(this.userlog.endTime)).toLocaleString();
        });
        this.http.getUser(this.login).subscribe(
          (data)=>  {
            this.user = data['body'];
        });
           
    }); 
    console.log(this.car);
             
  }

  

  ngOnInit() {
   
  }
 
  cancelBooking(userlogId : string){
       
   this.http.getUser(this.login).subscribe(
    (data) => {
      this.user = data['body'];
      console.log(data);
      console.log(this.user.wallet);
      console.log(this.userlog.totalAmount);
      
       this.user.wallet = this.user.wallet + this.userlog.totalAmount;
       console.log(this.user.wallet);
      this.http.updateUser(this.user).subscribe(
        (data)=>	{
          this.message = data;
       });
     });
     this.http.cancelBooking(userlogId).subscribe(
      (data : Message) =>{
    });

      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/booked_car/:carNo']))
       
   
  }
  

}
