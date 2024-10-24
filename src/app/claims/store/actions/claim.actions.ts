// claim.actions.ts
import { createAction, props } from '@ngrx/store';
import { Claim } from '../../models/claim.model';

export const loadClaims = createAction('[Claims claim components] Load Claims');

export const loadClaimsSuccess = createAction(
  '[Claims] Load Claims Success',
  props<{ claims: Claim[] }>()
);

export const loadClaimsFailure = createAction(
  '[Claims] Load Claims Failure',
  props<{ error: string }>()
);

export const updateClaim = createAction(
  '[Claims] Update Claim',
  props<{ claim: Claim }>()
);

export const updateClaimSuccess = createAction(
  '[Claims] Update Claim Success',
  props<{ claim: Claim }>()
);

export const updateClaimFailure = createAction(
  '[Claims] Update Claim Failure',
  props<{ error: string }>()
);

export const deleteClaim = createAction(
  '[Claims] Delete Claim',
  props<{ claimId: number }>()
);

export const deleteClaimSuccess = createAction(
  '[Claims] Delete Claim Success',
  props<{ claimId: number }>()
);

export const deleteClaimFailure = createAction(
  '[Claims] Delete Claim Failure',
  props<{ error: string }>()
);

export const addClaim = createAction(
  '[Claims] Add Claim',
  props<{ claim: Claim }>()
);

export const addClaimSuccess = createAction(
  '[Claims] Add Claim Success',
  props<{ claim: Claim }>()
);

export const addClaimFailure = createAction(
  '[Claims] Add Claim Failure',
  props<{ error: string }>()
);

export const applyFilters = createAction(
  '[Claims] Apply Filters',
  props<{ filter: any }>() // Filter object contains the filtering fields
);