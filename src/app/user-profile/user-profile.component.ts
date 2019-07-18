import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { FetchJSONService } from '../fetch-json.service';
import { User } from 'src/app/Interfaces/User';
import { Login } from 'src/app/Interfaces/Login'
import { Message } from 'src/app/Interfaces/Message';
import { LicenseUploadService } from '../license-upload.service';

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
    mobileNum: '',
    govtIdType: '',
    govtIdNum: '',
    drivingLicenseNum: '',
    userName: '',
    password: '',
    email: '',
    wallet: 0
  };

  message: Message;

  selectedFiles: FileList;
  currentFileUpload: File;

  userId: string;
  password: string;
  login: Login;
  response: any;
  toastMessageUname: string;
  toastMessagePassword: string;
  toastMessageEmail: string;
  toastMessageMobile: string;
  toastMessage:string;
  toastMessageUpload: string;

  constructor(private http: FetchJSONService, private uploadService: LicenseUploadService)
  {
      this.login =
       {
      id: JSON.parse(localStorage.getItem('user')).userId,
      password: JSON.parse(localStorage.getItem('user')).password
      // id : this.userId,
      // password : this.password
       }

    this.http.getUser(this.login).subscribe(
      (data) => {
        this.user = data['body'];
        console.log(data);
       });
   }
  ngOnInit() {

  }


  changeUserName()
   {
     console.log(this.user);
    this.http.updateUser(this.user).subscribe(
      (data: Message)=>  {
        this.message = data;
        if(this.message.status == "success"){
          this.toastMessageUname = "Update Sucess";
        }else{
          this.toastMessageUname = "Update Failure";
        }
       console.log(data);
      }
    );
    }

  changeUserpassword(){
    console.log(this.user);
    this.http.updateUser(this.user).subscribe(
      (data: Message)=>  {
        this.message = data;
        if(this.message.status == "success"){
          this.toastMessagePassword = "Update Sucess !!";
        }else{
          this.toastMessagePassword = "Update Failure";
        }
       console.log(data);
      }
    );
   }

  changeMobileNo(){
    console.log(this.user);
    this.http.updateUser(this.user).subscribe(
      (data: Message)=>  {
        this.message = data;
        if(this.message.status == "success"){
          this.toastMessageMobile = "Update Sucess !!";
        }else{
          this.toastMessageMobile = "Update Failure";
        }
       console.log(data);
      }
    );
  }

  changeEmail(){
    console.log(this.user);
    this.http.updateUser(this.user).subscribe(
      (data: Message)=>  {
        this.message = data;
        if(this.message.status == "success"){
          this.toastMessageEmail = "Update Sucess !!";
        }else{
          this.toastMessageEmail = "Update Failure";
        }
       console.log(data);
      }
    );
   }

  changeGovId(){

    console.log(this.user);
    this.http.updateUser(this.user).subscribe(
      (data: Message)=>  {
        // this.message = data;
        // if(this.message.status == "success"){
        //   this.toastMessage = "Update Sucess !!";
        // }else{
        //   this.toastMessage = "Update Failure";
        // }
       console.log(data);
      }
    );

  }
  changeGovType(){
    console.log(this.user);
    this.http.updateUser(this.user).subscribe(
      (data: Message)=>  {
        // this.message = data;
        // if(this.message.status == "success"){
        //   this.toastMessage = "Update Sucess !!";
        // }else{
        //   this.toastMessage = "Update Failure";
        // }
       console.log(data);
      }
    );

  }
  deleteAccount()
{
  console.log(this.user);
  this.http.deRegister(this.user.userId).subscribe(
    (data : Message) => {
     this.message = data;
     if(this.message.status == "success"){
          this.toastMessage = "Delete Sucess";
        }else{
          this.toastMessage = "Delete Failure "
        }
      console.log(data);

    }
  );

}

	selectFile(event)	{
		this.selectedFiles = event.target.files;
	}

	upload()	{
		this.currentFileUpload = this.selectedFiles.item(0);
		this.uploadService.pushFileToStorage(this.user.userId, this.currentFileUpload).subscribe(
			(event)=>	{
				if(event instanceof HttpResponse)	{
					this.toastMessageUpload = "File Uploaded!";
				}
			}
		);
		this.selectedFiles = undefined;
	}
}
