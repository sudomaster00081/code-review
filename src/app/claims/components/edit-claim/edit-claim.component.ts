// edit-claim-modal.component.ts
import { Component, Inject, Input } from '@angular/core';
import { Claim } from '../../models/claim.model';
import { Store } from '@ngrx/store';
import { updateClaim } from '../../store/actions/claim.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-claim',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-claim.component.html',
  styleUrl: './edit-claim.component.scss'
})

export class EditClaimModalComponent {
  claim: Claim; // Holds the claim data to be edited

  constructor(
    public dialogRef: MatDialogRef<EditClaimModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Claim // Inject the claim data passed from the dialog
  ) {
    this.claim = { ...data }; // Copy the incoming data
  }

  saveChanges() {
    this.dialogRef.close(this.claim); // Close the dialog and return the updated claim
  }

  closeModal() {
    this.dialogRef.close(); // Close the dialog without saving changes
  }
}