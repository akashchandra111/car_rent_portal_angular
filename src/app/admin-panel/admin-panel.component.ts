import { Component, OnInit} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {



	  constructor(private router:Router) {

		  if(JSON.parse(localStorage.getItem('user'))== null)	{
	console.log("choooooose");
			  this.router.navigate(['']);


		  }
	  }
  ngOnInit() {
  }
}
