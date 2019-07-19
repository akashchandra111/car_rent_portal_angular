import { Component, ViewChild } from '@angular/core';
import { User } from './Interfaces/User';
import { Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './header/header.component'
import { WalletComponent } from './wallet/wallet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'RentOCar';
  constructor()	{
  }

  ngOnInit()	{
  }
}
