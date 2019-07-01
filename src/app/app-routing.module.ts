import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BodyComponent } from './body/body.component';
import { BookingComponent } from './booking/booking.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
	{
		path:'body',
		component: BodyComponent,
	},
	{
		path: 'index',
		component: IndexComponent
	},
	{
		path: 'booking',
		component: BookingComponent
	},
	{
		path: 'user_profile',
		component: UserProfileComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RouterComponents = [
	BodyComponent,
	IndexComponent,
	BookingComponent,
	UserProfileComponent
];
