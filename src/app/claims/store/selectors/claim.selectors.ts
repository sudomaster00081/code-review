// src/app/claims/store/selectors/claim.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClaimState } from '../claim.state';

export const selectClaimState = createFeatureSelector<ClaimState>('claims');

export const selectClaims = createSelector(
  selectClaimState,
  (state: ClaimState) => state.claims
);

export const selectFilteredClaims = createSelector(
  selectClaimState,
  (state: ClaimState) => state.filteredClaims
);

export const selectLoading = createSelector(
  selectClaimState,
  (state: ClaimState) => state.loading
);

export const selectError = createSelector(
  selectClaimState,
  (state: ClaimState) => state.error
);
