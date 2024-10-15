import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog'; // Import Angular Material dialog
import { EditClaimModalComponent } from '../edit-claim/edit-claim.component'; // Import the modal component

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
import { AddClaimModalComponent } from '../add-claim/add-claim.component';

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

  constructor(private store: Store, private dialog: MatDialog) {
    this.claims$ = this.store.select(selectFilteredClaims);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.store.dispatch(loadClaims());
  }

  updateClaim(claim: Claim) {
    const dialogRef = this.dialog.open(EditClaimModalComponent, {
      data: claim, // Pass the claim data to the modal
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.store.dispatch(updateClaim({ claim: result })); // Dispatch the updated claim if the modal returned a result
      }
    });
  }

  deleteClaim(claimId: number) {
    this.store.dispatch(deleteClaim({ claimId }));
  }

  // addClaim() {
  //   const newClaim: Claim = {
  //     id: Date.now(), // Simple ID generation for the example
  //     patientName: 'New Patient',
  //     description: 'Description of the new claim',
  //     claimDate: new Date().toISOString(),
  //     amount: 1000,
  //     status: 'Pending',
  //     assignedTo: 'John Doe'
  //   };
  //   this.store.dispatch(addClaim({ claim: newClaim }));
  // }

  openAddClaimModal() {
    const dialogRef = this.dialog.open(AddClaimModalComponent, {
      width: '400px',
      disableClose: true // Prevents background click from closing the modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(addClaim({ claim: result }));
      }
    });
  }
    
  filterClaims() {
    this.store.dispatch(filterClaims({ filter: this.filterValue }));
  }
}