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
  addClaimFailure, applyFilters, 
  applyFiltersOnPending,
  loadApprovedClaims} from '../actions/claim.actions'
import { Claim, ClaimFilter } from '../../models/claim.model';
import { state } from '@angular/animations';

export interface ClaimState {
  allClaims: Claim[]; // Array of claims
  filteredClaimsPending: Claim[]; 
  loading: boolean; // Loading state
  error: string | null; // Error state
  filters: ClaimFilter;
  filteredClaimsReviewed: Claim[]; // Filtered claims based on search reviewed

}

export const initialState: ClaimState = {
  allClaims: [],
  loading: false,
  error: null,
  filters: {
    patientName: null,
    status: null,
    claimDateFrom: null,
    claimDateTo: null,
    minAmount: null,
    maxAmount: null,
    encId: null,
    visitType: null,
    department: null,
    region: null,
    doctor: null,
    plan: null,
    modifiedMr: null,
    billStatus: null,
    claimStatus: null,
    clinic: null,
    assignedTo: null,
    tpaIns: null,
    assignedToMe: null
  },
  filteredClaimsReviewed: [],
  filteredClaimsPending: []
};

// The reducer function
export const claimReducer = createReducer(
  initialState,
  on(loadClaims, (state) => ({ ...state, loading: true })),
  on(loadClaimsSuccess, (state, { claims }) => ({
    ...state,
    loading: false,
    claims,
    allClaims: claims, // Initialize filtered claims
  })),
  on(loadClaimsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(updateClaim, (state) => ({ ...state, loading: true })),
  on(updateClaimSuccess, (state, { claim }) => {
    const updatedClaims = state.allClaims.map(c => (c.id === claim.id ? claim : c));
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
    const updatedClaims = state.allClaims.filter(c => c.id !== claimId);
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
    const updatedClaims = [...state.allClaims, claim];
    return {
      ...state,
      loading: false,
      claims: updatedClaims,
      filteredClaims: updatedClaims, // Update filtered claims as well
    };
  }),
  on(addClaimFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(applyFilters, (state, { filter }) => {
    const filteredClaims = state.allClaims.filter(claim => matchesFilters(claim, filter));
    return {
      ...state,
      filters: filter,
      filteredClaimsPending: filteredClaims, // Update filtered claims based on applied filters
    };
  }),

  on(applyFiltersOnPending, (state, { filter }) => {
    const filteredClaims = state.allClaims.filter((claim: Claim) => matchesFilters(claim, filter));
    return {
      ...state,
      filters: filter,
      filteredClaimsPending: filteredClaims, // Update filtered claims based on claim status = pending
    };
  }),

  on(loadApprovedClaims, (state) => {
    const filteredClaims = state.allClaims.filter((claim: Claim) => claim.status === "Approved");
    return {
      ...state,
      filteredClaimsReviewed: filteredClaims,
    };
  }),

)

  

export function reducer(state: ClaimState | undefined, action: Action) {
    return claimReducer(state, action);
  }

  function matchesFilters(claim: Claim, filters: any): boolean {
    const {
      patientName, status, claimDateFrom, claimDateTo,
      minAmount, maxAmount, visitType, encId, department,
      region, plan, doctor, clinic, modifiedMr, assignedTo,
      billStatus, tpaIns
    } = filters;
  
    return (
      (!patientName || claim.patientName.includes(patientName)) &&
      (!status || claim.status === status) &&
      (!claimDateFrom || new Date(claim.claimDate) >= new Date(claimDateFrom)) &&
      (!claimDateTo || new Date(claim.claimDate) <= new Date(claimDateTo)) &&
      (!minAmount || claim.amount >= minAmount) &&
      (!maxAmount || claim.amount <= maxAmount) &&
      (!visitType || claim.visitType === visitType) &&
      (!encId || claim.encId === encId) &&
      (!department || claim.department === department) &&
      (!region || claim.region === region) &&
      (!plan || claim.plan === plan) &&
      (!doctor || claim.doctor === doctor) &&
      (!clinic || claim.clinic === clinic) &&
      (modifiedMr === null || claim.modifiedMr === modifiedMr) &&
      (!assignedTo || claim.assignedTo === assignedTo) &&
      (!billStatus || claim.billStatus === billStatus) &&
      (!tpaIns || claim.tpaIns === tpaIns)
    );
  }