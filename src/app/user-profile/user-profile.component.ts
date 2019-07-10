import { Component, OnInit } from '@angular/core';
import { FetchJSONService } from '../fetch-json.service';
import { User } from 'src/app/Interfaces/User';
import { Login } from 'src/app/Interfaces/Login'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
   user: User = {  
    userId: '',
    firstName:'',
    lastName: '',
    mobileNo: '',
    govtIdType: '',
    govtIdNum: '',
    drivingLicenseNum: '',
    userName: '',
    password: '',
    email: '',
    wallet: 0
  };
 
  userId: string  = "2001"; 
  password: string = "bhavana";
  
  // userNew : User[];

  login: Login;
  response:any;
 
 message : string;
  constructor(private http: FetchJSONService) 
  {
      this.login =
       {
      id: this.userId,
      password: this.password 
       }

    this.http.getUser(this.login).subscribe(
      (data) => {
        this.user = data['body'];

        // this.http.updateUser(this.user).subscribe(
        //   (data) => this.user.userName
          
        //  );
      });
        
   }
  
  ngOnInit() {

  }
 
  
  changeUserName()
   {
    
    this.http.updateUser(this.user).subscribe(
      (data) => this.user.userName

     );
    }
 
  changeUserpassword(){
  
 
  }
  changeMobileNo(){
  
   
  }

  changeEmail(){
     console.log(this.user.email);
    
  }

  changeGovId(){
   
   console.log(this.user.govtIdNum);
  
  }
  deleteAccount()
{
  

}  
  
 
}
