import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Interfaces/User';
import { UserLog } from 'src/app/Interfaces/UserLog';
import { Login } from 'src/app/Interfaces/Login';
import { FetchJSONService } from '../fetch-json.service';
import { Email } from 'src/app/Interfaces/Email';
import { Message } from '../Interfaces/Message';


@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {

  user : User;
  userlog : any;
  // userTemplog : UserLog[];
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
  email : Email;
  latestHistory: any;
  subject : string;
  text: string;

  currentDate: any = new Date().getTime(); 
  currentUnixTime = parseInt(this.currentDate); 

  constructor(private route: ActivatedRoute, private router: Router, private http: FetchJSONService) {
    this.login = {
      id: JSON.parse(localStorage.getItem('user')).userId,
      password: JSON.parse(localStorage.getItem('user')).password
    }

    this.email = {
      to: '',
      subject: '',
      text: ''
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
      this.http.getLatestUserHistory(this.user.userId).subscribe(
        (data)=> {
          this.latestHistory = data['body'];
          console.log(this.latestHistory);
          let tempStartTime = parseInt(this.latestHistory.startTime)
          console.log(tempStartTime);
          if(tempStartTime > this.currentUnixTime){
            this.latestHistory.startTime = new Date(parseInt(this.latestHistory.startTime)).toLocaleString();
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
    let userInfo: string = "UserId: " + this.user.userId + " ,E-mail: " + this.user.email + " ,Mobile Number : " +this.user.mobileNum;
    this.email.to = 'vyshnavigadiparthi20@gmail.com';
    this.email.subject = this.subject;
    this.email.text = userInfo + " Query :" + this.text;
    this.user.userId = this.text;
    this.user.email = this.text;
    console.log(this.email);
      this.http.sendMail(this.email).subscribe(
        (data : Message)=> {
          let message: Message = data;
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
    this.router.navigate(['/bookedcar/:carNo'])); 
  }

  addMoneyToWallet(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/wallet'])); 
  }
  
}
