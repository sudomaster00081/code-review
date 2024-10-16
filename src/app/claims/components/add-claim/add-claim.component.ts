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
    encId: 1,
    id: 1, // Unique identifier
    patientName: "", // Name of the patient
    description: "", // Description of the claim
    claimDate: '', // Date of the claim
    amount: 0, // Amount claimed
    status: 'Pending', // Status of the claim
    assignedTo: '', // The staff assigned to the claim
    clinic: '',
    tpaIns: '',
    plan: '',
    clinicianId: '',
    mrNo: '',
    visitStart: '',
    visitEnd: '',
    payerCode: '',
    visitType: 'IP',
    department: '',

  };

  constructor(public dialogRef: MatDialogRef<AddClaimModalComponent>) {}

  saveClaim() {
    this.dialogRef.close(this.claim); // Pass the new claim object back to parent
  }

  closeModal() {
    this.dialogRef.close(); // Close without saving
  }
}
