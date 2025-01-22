import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarBookingComponent } from './car-booking/car-booking.component';

const routes: Routes = [
  { path: 'car-booking', component: CarBookingComponent }, 
  { path: '', redirectTo: 'car-booking', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
