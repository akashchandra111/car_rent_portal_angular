import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor( private router: Router) {

   }

  ngOnInit() {
	  // console.log("this is footer"+JSON.parse(localStorage.getItem('user')).userId);
  }
  footer(){
	  this.router.navigate(['/contact']);
	  
  }

}
