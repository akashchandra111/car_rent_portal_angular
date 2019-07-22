import { Component, OnInit } from '@angular/core';
import { Email } from 'src/app/Interfaces/Email';
import { User } from 'src/app/Interfaces/User';
import { FetchJSONService } from '../fetch-json.service';
import { Login } from 'src/app/Interfaces/Login';
import { Message } from '../Interfaces/Message';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  name : string;
  user : User;
  subject: string;
  mobile : string;
  message : string;
  email : Email;
  login: Login;
  toastMessage : string;
 

  constructor(private http: FetchJSONService) {
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
    });
   
   }

  ngOnInit() {

  }
  sendMessage(){
        let contactdata = "Name : " + this.name  + ", Contact Number : " + this.mobile + ", E-mail : " +this.user.email;
        //this.email.to = this.mail;
        this.email.to = "bhavana261195@gmail.com";
        this.email.subject = this.subject;
        this.email.text =  contactdata + ", Query : " +this.message;
        this.http.sendMail(this.email).subscribe(
        (data : Message)=> {
          console.log("working");
          let message: Message = data;
          console.log(message);
          
          if(message.status == "success"){
            this.toastMessage = "Query sent successfully";
          }else{
            this.toastMessage = "Failed to send";
          }
      });  
  }
}
