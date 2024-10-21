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
} from '../../store/actions/claim.actions';
import {
  selectFilteredClaims,
  selectLoading,
  selectError,
  selectPendingFilteredClaims,
} from '../../store/selectors/claim.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddClaimModalComponent } from '../add-claim/add-claim.component';

@Component({
  selector: 'app-list-claim',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-claim.component.html',
  styleUrl: './list-claim.component.scss'
})
export class ListClaimComponent implements OnInit {
  claims$: Observable<Claim[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  displayedCount = 3;

  constructor(private store: Store, private dialog: MatDialog) {
    this.claims$ = this.store.select(selectPendingFilteredClaims);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    
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
  
  
  approveClaim(claim: Claim) {
    const updatedClaim: Claim = { 
        ...claim,
        status: "Approved" as const 
    };
    this.store.dispatch(updateClaim({ claim: updatedClaim }));
}

loadMore() {
  this.displayedCount += 5; // Increase the count of displayed claims
}


}