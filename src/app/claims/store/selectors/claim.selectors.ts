// src/app/claims/store/selectors/claim.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClaimState } from '../claim.state';

export const selectClaimState = createFeatureSelector<ClaimState>('claims');

export const selectClaims = createSelector(
  selectClaimState,
  (state: ClaimState) => state.claims
);

// export const selectFilteredClaims = createSelector(
//   selectClaimState,
//   (state: ClaimState) => state.filteredClaims
// );

export const selectLoading = createSelector(
  selectClaimState,
  (state: ClaimState) => state.loading
);

export const selectError = createSelector(
  selectClaimState,
  (state: ClaimState) => state.error
);

export const selectFilteredClaims = createSelector(
  selectClaimState,
  (state: ClaimState) => {
    const { patientName, status, claimDateFrom, claimDateTo, minAmount, maxAmount } = state.filters;

    return state.claims.filter(claim => {
      // Apply filters for each field
      const matchesPatientName = patientName ? claim.patientName.includes(patientName) : true;
      const matchesStatus = status ? claim.status === status : true;
      const matchesDateFrom = claimDateFrom ? new Date(claim.claimDate) >= new Date(claimDateFrom) : true;
      const matchesDateTo = claimDateTo ? new Date(claim.claimDate) <= new Date(claimDateTo) : true;
      const matchesMinAmount = minAmount ? claim.amount >= minAmount : true;
      const matchesMaxAmount = maxAmount ? claim.amount <= maxAmount : true;

      return matchesPatientName && matchesStatus && matchesDateFrom && matchesDateTo && matchesMinAmount && matchesMaxAmount;
    });
  }
);