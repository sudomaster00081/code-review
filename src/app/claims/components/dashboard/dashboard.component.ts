import { Component } from '@angular/core';
import { FilterClaimComponent } from "../filter-claim/filter-claim.component";
import { ListClaimComponent } from "../list-claim/list-claim.component";
import { ReviewedClaimComponent } from "../reviewed-claim/reviewed-claim.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FilterClaimComponent, ListClaimComponent, ReviewedClaimComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
