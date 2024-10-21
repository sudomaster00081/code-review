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
  addClaimFailure,
  applyFiltersOnPending,
  loadApprovedClaims} from '../actions/claim.actions'
import { Claim, ClaimFilter } from '../../models/claim.model';
import { state } from '@angular/animations';
import { ClaimState, initialState } from '../claim.state';


// The reducer function
export const claimReducer = createReducer(
  initialState,
  on(loadClaims, (state) => ({ ...state, loading: true })),
  on(loadClaimsSuccess, (state, { claims }) => ({
    ...state,
    loading: false,
    allClaims: claims, // Initialize filtered claims
    // filteredClaimsPending: claims.filter(c => c.status === 'Pending'),
    filteredClaimsReviewed: filtersOnReview(claims, state.filters),
  })),
  on(loadClaimsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(updateClaim, (state) => ({ ...state, loading: true })),
  on(updateClaimSuccess, (state, { claim }) => {
  const updatedClaims = state.allClaims.map(c => (c.id === claim.id ? claim : c));
  const filteredClaimsPending = filtersOnPending(updatedClaims, state.filters);
  const filteredClaimsReviewed = filtersOnReview(updatedClaims, state.filters);

  return {
    ...state,
    loading: false,
    allClaims: updatedClaims,
    filteredClaimsPending: filteredClaimsPending,
    filteredClaimsReviewed: filteredClaimsReviewed,
  };
}),
  on(updateClaimFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(deleteClaim, (state) => ({ ...state, loading: true })),
  on(deleteClaimSuccess, (state, { claimId }) => {
    const updatedClaims = state.allClaims.filter(c => c.id !== claimId);
    const filteredClaimsPending = filtersOnPending(updatedClaims, state.filters);
    const filteredClaimsReviewed = filtersOnReview(updatedClaims, state.filters);
    return {
      ...state,
      loading: false,
      allClaims: updatedClaims,
      filteredClaimsPending: filteredClaimsPending,
      filteredClaimsReviewed: filteredClaimsReviewed,
    };
  }),
  on(deleteClaimFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(addClaim, (state) => ({ ...state, loading: true })),
  on(addClaimSuccess, (state, { claim }) => {
    const updatedClaims = [...state.allClaims, claim];
    const filteredClaimsPending = filtersOnPending(updatedClaims, state.filters);
    const filteredClaimsReviewed = filtersOnReview(updatedClaims, state.filters);
    return {
      ...state,
      loading: false,
      allClaims: updatedClaims,
      filteredClaimsPending : filteredClaimsPending,
      filteredClaimsReviewed: filteredClaimsReviewed,
    };
  }),
  on(addClaimFailure, (state, { error }) => ({ ...state, loading: false, error })),


  on(applyFiltersOnPending, (state, { filter }) => {
    const filteredClaims = state.allClaims.filter((claim: Claim) => matchesFilters(claim, filter));
    return {
      ...state,
      filters: filter,
      filteredClaimsPending: filteredClaims, // Update filtered claims based on claim status = pending
    };
  }),

  on(loadApprovedClaims, (state) => {
    const filteredClaimsReviewed = filtersOnReview(state.allClaims, state.filters);
    return {
      ...state,
      filteredClaimsReviewed: filteredClaimsReviewed,
    };
  }
),

)

  

export function reducer(state: ClaimState | undefined, action: Action) {
    return claimReducer(state, action);
  }

 function filtersOnReview(claims: Claim[], filters: any): Claim[] {
    return claims.filter(c => c.status === 'Approved' );
  }

  function filtersOnPending(claims: Claim[], filters: any): Claim[] {
    return claims.filter(c =>
      c.status === 'Pending' && matchesFilters(c, filters)
    );
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