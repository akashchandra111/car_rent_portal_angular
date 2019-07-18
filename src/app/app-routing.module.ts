import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { BookingComponent } from './booking/booking.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ChooseCarComponent } from './choose-car/choose-car.component';
import { UserpageComponent } from './userpage/userpage.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { WalletComponent } from './wallet/wallet.component';
import { BookedCarComponent } from './booked-car/booked-car.component';

const routes: Routes = [
    {
        path: 'booking/:carId',
        component: BookingComponent
    },
    {
        path: 'dashboard',
        component: UserpageComponent
    },
    {
        path: 'user_profile',
        component: UserProfileComponent
    },
    {
        path: 'admin',
        component: AdminPanelComponent
    },
    {
        path: 'choose_car',
        component: ChooseCarComponent
    },
    {
        path: 'history',
        component: UserHistoryComponent
    },
	{
		path: 'dashboard',
		component: UserpageComponent
	},
	{
		path: 'about',
		component: AboutComponent
	},
	{
		path: 'contact',
		component: ContactUsComponent
	},
	{
		path: 'wallet',
		component: WalletComponent
	},
	{
		path: 'bookedcar',
		component: BookedCarComponent
	},
	{
	        path:'',
	        component: HomepageComponent,
	        pathMatch: 'full'
	},
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RouterComponents = [
    PageNotFoundComponent,
    BookingComponent,
    UserProfileComponent,
    HomepageComponent,
    AdminPanelComponent,
    ChooseCarComponent,
    UserpageComponent,
    UserHistoryComponent,
	AboutComponent,
	ContactUsComponent,
	WalletComponent,
	BookedCarComponent
];
