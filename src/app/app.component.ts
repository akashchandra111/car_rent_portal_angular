import { Component } from '@angular/core';
import { FetchJSONService } from './fetch-json.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RentOCar';

  constructor(private carData: FetchJSONService)	{
  }

  ngOnInit()	{
  }
}
