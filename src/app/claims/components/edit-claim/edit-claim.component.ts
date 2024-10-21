// edit-claim-modal.component.ts
import { Component, Inject, Input } from '@angular/core';
import { Claim } from '../../models/claim.model';
import { Store } from '@ngrx/store';
import { hideEditClaimForm, updateClaim } from '../../store/actions/claim.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { selectSelectedClaim } from '../../store/selectors/claim.selectors';

@Component({
  selector: 'app-edit-claim',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-claim.component.html',
  styleUrl: './edit-claim.component.scss'
})

export class EditClaimModalComponent {
  claim: any;

  constructor(
    private store: Store<{ claims: Claim[] }>
  ) {
    this.store.select(selectSelectedClaim).subscribe((state) => {
      this.claim = { ...state };
    })
    
  }

  saveChanges() {
    this.store.dispatch(updateClaim({ claim: this.claim }));
    this.closeModal()
  }

  closeModal() {
    this.store.dispatch(hideEditClaimForm());
  }
}