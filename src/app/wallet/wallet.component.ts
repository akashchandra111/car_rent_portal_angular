// [Author - Vyshnavi]

import { Component, OnInit } from '@angular/core';
import { User } from '../Interfaces/User';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchJSONService } from '../fetch-json.service';
import { Login } from '../Interfaces/Login';
import { Message } from 'src/app/Interfaces/Message';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  user: User;
  toastMessage: string;
  login: Login;
  message: Message;
  response:any;
  moneyCard: number;
  moneyNet: number;

  accountNum: string;
  accountname: string;
  cVV: string;
  userid: string;
  password: string;

  constructor(private route: ActivatedRoute, private router: Router, private http: FetchJSONService) {
    this.login= {
		  id: JSON.parse(localStorage.getItem('user')).userId,
		  password: JSON.parse(localStorage.getItem('user')).password
    }
    this.http.getUser(this.login).subscribe(
      (data)=>  {
        this.user = data['body'];
    });
   }

  ngOnInit() {
  }

  addMoney()  {
    this.http.addMoney(this.user, this.moneyCard).subscribe(
      (data: Message)=> {
        if(data.status == "success")  {
          this.toastMessage = "Money added successfully";
        }
        else  {
          this.toastMessage = "Money not added";
        }
      });
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/dashboard']));
  }

  addMoneyNet()  {
    this.http.addMoney(this.user, this.moneyNet).subscribe(
      (data: Message)=> {
        if(data.status == "success")  {
          this.toastMessage = "Money added successfully";
        }
        else  {
          this.toastMessage = "Money not added";
        }
      });
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/dashboard']));
  }


  // addMoney()  {
  //   this.user.wallet = this.user.wallet + this.moneyCard;
  //   console.log(this.user);
  //   // this.http.updateUser
  // }
}
