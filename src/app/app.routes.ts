import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ClaimListComponent } from './claims/components/claim-list/claim-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: ClaimListComponent}
];
