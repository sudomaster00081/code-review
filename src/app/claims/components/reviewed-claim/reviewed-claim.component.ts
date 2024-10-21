import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Claim } from '../../models/claim.model';
import { selectApprovedClaims, selectClaims, selectError, selectFilteredClaims, selectLoading } from '../../store/selectors/claim.selectors';
import { loadApprovedClaims, updateClaim } from '../../store/actions/claim.actions';


@Component({
  selector: 'app-reviewed-claim',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reviewed-claim.component.html',
  styleUrl: './reviewed-claim.component.scss'
})
export class ReviewedClaimComponent implements OnInit {
  claims$: Observable<Claim[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  

  constructor(private store: Store) {
    this.claims$ = this.store.select(selectApprovedClaims);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    
    

  }
  ngOnInit(): void {
    this.store.dispatch(loadApprovedClaims());
  }


  callBackClaim(claim: Claim) {
    const updatedClaim: Claim = { 
        ...claim,
        status: "Pending" as const 
    };
    this.store.dispatch(updateClaim({ claim: updatedClaim }));
}

}
