import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators,ValidatorFn, AbstractControl} from '@angular/forms';
import swal from 'sweetalert';
import { FetchJSONService } from '../fetch-json.service';
import { Message } from '../Interfaces/Message';
import { User } from '../Interfaces/User';
import {Router,NavigationEnd} from '@angular/router';
import {Login} from '../Interfaces/Login';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {


  money:number;
  user:User;
  message:Message;  
  constructor(private http:FetchJSONService,private router:Router) { }

  ngOnInit() {
  }


  form5 = new FormGroup({
   money : new FormControl('', [
      Validators.required,  
      Validators.minLength(1),  
      Validators.maxLength(20),  
      Validators.pattern("^([0-9]{1,15})$")
      
   ]),

   cardNo : new FormControl('', [
    Validators.required,  
    Validators.minLength(3),  
    Validators.maxLength(80),  
    Validators.pattern("^[0-9]{16}$")  
 ]),
 expNo:new FormControl('',[
      
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("^(0[1-9]|10|11|12)/20[0-9]{2}$") 
    ]),

    cvcNo:new FormControl('',[
      
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("^[0-9]{3}$") 
    ]),

    ownerName:new FormControl('',[
      
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("^((?:[A-Za-z]+ ?){1,3})$")
       
    ]),
  })

  funcDoPop()
  {
    console.log("Heyy i am inside cancel popup functin");
    document.getElementById('id01').style.display='block';
  }
 funcDo()
 {
swal("Great!", "Paymnet successfully done!", "success");
 }
  

 addMoney(){
 console.log("add moeny workin");
 let login:Login={
   id:JSON.parse(localStorage.getItem('user')).userId,
   password:JSON.parse(localStorage.getItem('user')).password
 };
 this.http.getUser(login).subscribe(

  (data) => {
    console.log("get user runs");  
    this.user=<User>data['body'];
    console.log(this.user+"i'm here onelu"); 
    // this.money=this.money+this.user.wallet;

    this.http.addMoney(this.user,this.money).subscribe(
      (data:Message)=>{
  this.message=data;
  if(this.message.status==null){
  console.log("money not added");
  }
  else{
    console.log("money add");
    this.router.navigate(['/dashboard']);
  }
      
  
  
      })
  }
 )
};
  





}