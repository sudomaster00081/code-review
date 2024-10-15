// claim.model.ts
export interface Claim {
    id: number; // Unique identifier
    patientName: string; // Name of the patient
    description: string; // Description of the claim
    claimDate: string; // Date of the claim
    amount: number; // Amount claimed
    status: 'Pending' | 'Approved' | 'Denied'; // Status of the claim
    assignedTo: string; // The staff assigned to the claim
  }
  