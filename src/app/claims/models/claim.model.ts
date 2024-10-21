// claim.model.ts
export interface Claim {

    encId: number;
    id: number; // Unique identifier
    patientName: string; // Name of the patient
    description: string; // Description of the claim
    claimDate: string; // Date of the claim
    amount: number; // Amount claimed
    status: 'Pending' | 'Approved' | 'Denied'; // Status of the claim
    assignedTo: string; // The staff assigned to the claim
    clinic: string;
    tpaIns: string; // TPA insurance
    plan: string;
    clinicianId: string;
    mrNo: string;
    visitStart: string;
    visitEnd: string;
    payerCode: string;
    visitType: 'IP' | 'OP' ;
    department: string;
    region: string;
    doctor: string; // Name of the doctor
    modifiedMr: boolean; // Flag to indicate if the MR is modified
    billStatus : 'Billed' | 'UnBilled';
    claimStatus : 'Pending' | 'Reviewed';
    
  }

export interface ClaimFilter {
    encId: null|number,
    patientName: null,
    status: null|string,
    claimDateFrom: null,
    claimDateTo: null,
    minAmount: null,
    maxAmount: null,
    visitType: null,
    department: null,
    region: null,
    doctor: null,
    plan:null,
    modifiedMr: null,
    billStatus : null,
    claimStatus : null,
    clinic: null,
    assignedTo: null,
    tpaIns:null,
    assignedToMe:null
}
  