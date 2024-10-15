import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Claim } from '../../models/claim.model';
import {
  loadClaims,
  updateClaim,
  deleteClaim,
  addClaim,
  filterClaims
} from '../../store/actions/claim.actions';
import {
  selectFilteredClaims,
  selectLoading,
  selectError
} from '../../store/selectors/claim.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-claim-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './claim-list.component.html',
  styleUrl: './claim-list.component.scss'
})
export class ClaimListComponent implements OnInit {
  claims$: Observable<Claim[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  filterValue: string = '';

  constructor(private store: Store) {
    this.claims$ = this.store.select(selectFilteredClaims);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.store.dispatch(loadClaims());
  }

  updateClaim(claim: Claim) {
    // Simulate an edit, here you would typically open a modal to get new values
    const updatedClaim: Claim = { ...claim, status: 'Approved' }; // Example update
    this.store.dispatch(updateClaim({ claim: updatedClaim }));
  }

  deleteClaim(claimId: number) {
    this.store.dispatch(deleteClaim({ claimId }));
  }

  addClaim() {
    const newClaim: Claim = {
      id: Date.now(), // Simple ID generation for the example
      patientName: 'New Patient',
      description: 'Description of the new claim',
      claimDate: new Date().toISOString(),
      amount: 1000,
      status: 'Pending',
      assignedTo: 'John Doe'
    };
    this.store.dispatch(addClaim({ claim: newClaim }));
  }

  filterClaims() {
    this.store.dispatch(filterClaims({ filter: this.filterValue }));
  }
}