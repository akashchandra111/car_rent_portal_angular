import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { HomepageComponent } from './homepage/homepage.component';
import { BookingComponent } from './booking/booking.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ChooseCarComponent } from './choose-car/choose-car.component';
import { UserpageComponent } from './userpage/userpage.component';
 
const routes: Routes = [
    {
        path:'',
        component: HomepageComponent,
        pathMatch: 'full'
    },
    {
        path: 'booking',
        component: BookingComponent
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
        path: 'dashboard',
        component: UserpageComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    },
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
    UserpageComponent
];