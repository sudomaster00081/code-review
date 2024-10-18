// src/app/claims/store/selectors/claim.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClaimState, ClaimStatus } from '../claim.state';
import { Claim } from '../../models/claim.model';

export const selectClaimState = createFeatureSelector<ClaimState>('claims');

export const selectClaims = createSelector(
  selectClaimState,
  (state: ClaimState) => state.allClaims
);

export const selectFilter = createSelector(
  selectClaimState,
  (state: ClaimState) => state.filters
)

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
  (state: ClaimState) => state.filteredClaimsReviewed
);


export const selectApprovedClaims = createSelector(
  selectClaimState,
  (state: ClaimState) => {
    return state.filteredClaimsReviewed;
  }
);

export const selectPendingClaims = createSelector(
  selectClaimState,
  (state: ClaimState) => {
    return state.allClaims.filter(claim => claim.status === 'Pending');
  }
);


export const selectPendingFilteredClaims = createSelector(
  selectClaimState,
  (state: ClaimState) => {
    return state.filteredClaimsPending
  }
);
