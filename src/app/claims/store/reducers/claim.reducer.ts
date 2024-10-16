// claim.reducer.ts
import { Action, createReducer, on } from '@ngrx/store';
import {
  loadClaims,
  loadClaimsSuccess,
  loadClaimsFailure,
  updateClaim,
  updateClaimSuccess,
  updateClaimFailure,
  deleteClaim,
  deleteClaimSuccess,
  deleteClaimFailure,
  addClaim,
  addClaimSuccess,
  addClaimFailure, applyFilters } from '../actions/claim.actions'
import { Claim } from '../../models/claim.model';

export interface ClaimState {
  claims: Claim[]; // Array of claims
  filteredClaims: Claim[]; // Filtered claims based on search criteria
  loading: boolean; // Loading state
  error: string | null; // Error state
  filters: any;

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

// The reducer function
export const claimReducer = createReducer(
  initialState,
  on(loadClaims, (state) => ({ ...state, loading: true })),
  on(loadClaimsSuccess, (state, { claims }) => ({
    ...state,
    loading: false,
    claims,
    filteredClaims: claims, // Initialize filtered claims
  })),
  on(loadClaimsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(updateClaim, (state) => ({ ...state, loading: true })),
  on(updateClaimSuccess, (state, { claim }) => {
    const updatedClaims = state.claims.map(c => (c.id === claim.id ? claim : c));
    return {
      ...state,
      loading: false,
      claims: updatedClaims,
      filteredClaims: updatedClaims, // Update filtered claims as well
    };
  }),
  on(updateClaimFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(deleteClaim, (state) => ({ ...state, loading: true })),
  on(deleteClaimSuccess, (state, { claimId }) => {
    const updatedClaims = state.claims.filter(c => c.id !== claimId);
    return {
      ...state,
      loading: false,
      claims: updatedClaims,
      filteredClaims: updatedClaims, // Update filtered claims as well
    };
  }),
  on(deleteClaimFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(addClaim, (state) => ({ ...state, loading: true })),
  on(addClaimSuccess, (state, { claim }) => {
    const updatedClaims = [...state.claims, claim];
    return {
      ...state,
      loading: false,
      claims: updatedClaims,
      filteredClaims: updatedClaims, // Update filtered claims as well
    };
  }),
  on(addClaimFailure, (state, { error }) => ({ ...state, loading: false, error })),

   // Handle applying filters
   on(applyFilters, (state, { filter }) => ({
    ...state,
    filters: filter
  }))

);


export function reducer(state: ClaimState | undefined, action: Action) {
    return claimReducer(state, action);
  }