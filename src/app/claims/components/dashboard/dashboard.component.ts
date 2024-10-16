import { Component } from '@angular/core';
import { FilterClaimComponent } from "../filter-claim/filter-claim.component";
import { ListClaimComponent } from "../list-claim/list-claim.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FilterClaimComponent, ListClaimComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
