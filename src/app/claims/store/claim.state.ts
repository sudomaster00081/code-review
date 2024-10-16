// src/app/claims/store/claim.state.ts
import { Claim } from '../models/claim.model';

// export interface ClaimState {
//   claims: Claim[]; // All claims
//   filteredClaims: Claim[]; // Claims after filtering
//   loading: boolean; // Loading state
//   error: string | null; // Error state
// }

export interface ClaimState {
    filters: { patientName: any; status: any; claimDateFrom: any; claimDateTo: any; minAmount: any; maxAmount: any; };
    claims: Claim[]; // or whatever type you expect
    filteredClaims: any[];
    loading: boolean;
    error: string | null;
  }
  

export const initialState: ClaimState = {
  claims: [],
  filteredClaims: [],
  loading: false,
  error: null,
  filters: {
    patientName: '',
    status: '',
    claimDateFrom: null,
    claimDateTo: null,
    minAmount: null,
    maxAmount: null,
  },
};
