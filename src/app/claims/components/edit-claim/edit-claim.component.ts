// edit-claim-modal.component.ts
import { Component, Input } from '@angular/core';
import { Claim } from '../../models/claim.model';
import { Store } from '@ngrx/store';
import { updateClaim } from '../../store/actions/claim.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-claim',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-claim.component.html',
  styleUrl: './edit-claim.component.scss'
})

export class EditClaimModalComponent {
  @Input() claim!: Claim;

  constructor(private store: Store) {}

  saveChanges(updatedClaim: Claim) {
    this.store.dispatch(updateClaim({ claim: updatedClaim }));
  }

  closeModal(){
    console.log('close modal');
  }
}