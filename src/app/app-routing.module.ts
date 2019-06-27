import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BodyComponent } from './body/body.component';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
	{
		path:'',
		component: BodyComponent,
		pathMatch: 'full'
	},
	{
		path: 'booking',
		component: BookingComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RouterComponents = [
	BookingComponent
];
