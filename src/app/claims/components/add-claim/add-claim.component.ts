// add-claim-modal.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Claim } from '../../models/claim.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-claim',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-claim.component.html',
  styleUrl: './add-claim.component.scss'
})
export class AddClaimModalComponent {
  // Initialize a new claim object
  claim: Claim = {
    id: 1, // ID will be auto-generated
    patientName: '',
    description: '',
    claimDate: '',
    amount: 0,
    status: 'Pending',
    assignedTo: ''
  };

  constructor(public dialogRef: MatDialogRef<AddClaimModalComponent>) {}

  saveClaim() {
    this.dialogRef.close(this.claim); // Pass the new claim object back to parent
  }

  closeModal() {
    this.dialogRef.close(); // Close without saving
  }
}
