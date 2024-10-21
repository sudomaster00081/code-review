// src/app/claims/store/claim.state.ts
import { Claim, ClaimFilter } from '../models/claim.model';

// Define possible statuses, visit types, etc. as enums if applicable
export enum ClaimStatus {
    Pending = 'Pending',
    Approved = 'Approved',
    Rejected = 'Rejected',
    // Add other statuses as needed
}


export interface ClaimState {
    filters: ClaimFilter;
    allClaims: Claim[]; // Array of claims
    filteredClaimsReviewed: Claim[]; // Array of filtered claims
    loading: boolean; // Indicates if data is being loaded
    error: string | null; // Error message if any
    filteredClaimsPending: Claim[]; // Array of filtered claims with pending status
    showAddClaimForm: boolean; // Add this property
    showEditClaimForm: boolean;
    selectedClaim: Claim | null;
}

export const initialState: ClaimState = {
    allClaims: [],
    filteredClaimsReviewed: [],
    filteredClaimsPending: [],
    loading: false,
    error: null,
    filters: {
      encId: null,
      patientName: null,
      status: null,
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
    },
    showAddClaimForm: false, 
    showEditClaimForm: false,
    selectedClaim: null
};

