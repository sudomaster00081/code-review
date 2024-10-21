// add-claim-modal.component.ts
import { Component, OnDestroy } from '@angular/core';
import { Claim } from '../../models/claim.model';
import { FormsModule } from '@angular/forms';
import { addClaim, hideAddClaimForm } from '../../store/actions/claim.actions';
import { Store } from '@ngrx/store';

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
    region: '',
    doctor: '',
    modifiedMr: false,
    billStatus : 'UnBilled',
    claimStatus : 'Pending', 
  };

  constructor(
    private store: Store
  ) {}

  saveClaim() {
    this.claim.id = Math.floor(Math.random() * 1000) + 1;
    this.store.dispatch(addClaim({ claim: this.claim }));
    this.closeModal()
  }

  closeModal() {
    this.store.dispatch(hideAddClaimForm());
  }
  ngOnDestroy(): void {
  }
}
