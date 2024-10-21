import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EditClaimModalComponent } from '../edit-claim/edit-claim.component'; // Import the modal component

import { Claim } from '../../models/claim.model';
import {
  loadClaims,
  updateClaim,
  deleteClaim,
  addClaim,
  hideAddClaimForm,
  showAddClaimForm,
  showEditClaimForm,
  settSelectedClaim,
} from '../../store/actions/claim.actions';
import {
  selectFilteredClaims,
  selectLoading,
  selectError,
  selectPendingFilteredClaims,
  selectShowAddClaimForm,
  selectShowEditClaimForm,
} from '../../store/selectors/claim.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddClaimModalComponent } from '../add-claim/add-claim.component';

@Component({
  selector: 'app-list-claim',
  standalone: true,
  imports: [CommonModule, FormsModule, AddClaimModalComponent, EditClaimModalComponent],
  templateUrl: './list-claim.component.html',
  styleUrl: './list-claim.component.scss'
})
export class ListClaimComponent implements OnInit {
  claims$: Observable<Claim[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  showAddClaimForm!: boolean;
  showEditClaimForm!: boolean;
  

  constructor(private store: Store) {
    this.claims$ = this.store.select(selectPendingFilteredClaims);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.store.select(selectShowAddClaimForm).subscribe((state) => {
      this.showAddClaimForm = state;
    }); // Get the form visibility state
    this.store.select(selectShowEditClaimForm).subscribe((state) => {
      this.showEditClaimForm = state;
    });
  }

  ngOnInit() {
    
  }

  deleteClaim(claimId: number) {
    this.store.dispatch(deleteClaim({ claimId }));
  }

  
  approveClaim(claim: Claim) {
    const updatedClaim: Claim = { 
        ...claim,
        status: "Approved" as const 
    };
    this.store.dispatch(updateClaim({ claim: updatedClaim }));
}


toggleAddClaimForm() {
  if (this.showAddClaimForm) {
    this.store.dispatch(hideAddClaimForm());
  } else {
    this.store.dispatch(showAddClaimForm());
  }
}

editClaim(claim: any) {
  this.store.dispatch(showEditClaimForm())
  this.store.dispatch(settSelectedClaim({ claim: claim }));
}

}