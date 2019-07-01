import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  carName: string = "Redi-Go";

  carDesc: string = "It packs a Bluetooth-enabled audio system that offers hands-free calling and music streaming, central locking, manual AC, LED daytime running lights and more. For safety, it gets only ABS with EBD as standard since the driver airbag is limited to the top-spec S variant only. It is white in colour and 4seater.";

  constructor() { }

  ngOnInit() {
  }

}
