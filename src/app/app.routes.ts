import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListClaimComponent } from './claims/components/list-claim/claim-list.component';
import { DashboardComponent } from './claims/components/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: DashboardComponent}
];
