// src/app/claims/store/selectors/claim.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClaimState } from '../claim.state';

export const selectClaimState = createFeatureSelector<ClaimState>('claims');

export const selectClaims = createSelector(
  selectClaimState,
  (state: ClaimState) => state.claims
);


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
    const { patientName, status, claimDateFrom, claimDateTo, minAmount, maxAmount, visitType, encId, department, region, plan, doctor, clinic, modifiedMr, assignedTo, billStatus, tpaIns} = state.filters;

    return state.claims.filter(claim => {
      // Apply filters for each field
      const matchesPatientName = patientName ? claim.patientName.includes(patientName) : true;
      const matchesStatus = status ? claim.status === status : true;
      const matchesDateFrom = claimDateFrom ? new Date(claim.claimDate) >= new Date(claimDateFrom) : true;
      const matchesDateTo = claimDateTo ? new Date(claim.claimDate) <= new Date(claimDateTo) : true;
      const matchesMinAmount = minAmount ? claim.amount >= minAmount : true;
      const matchesMaxAmount = maxAmount ? claim.amount <= maxAmount : true;
      const matchesVisitType = visitType ? claim.visitType === visitType : true;
      const matchesEncId = encId ? claim.encId === encId : true;
      const matchesDepartment = department ? claim.department === department : true;
      const matchesRegion = region ? claim.region === region : true;
      const matchesPlan = plan ? claim.plan === plan : true;
      const matchesDoctor = doctor ? claim.doctor === doctor : true;
      const matchesClinic = clinic ? claim.clinic === clinic : true;
      const matchesModifiedMr = modifiedMr ? claim.modifiedMr === modifiedMr : true;
      const matchesAssignedTo = assignedTo ? claim.assignedTo === assignedTo : true;
      const matchesBillStatus = billStatus ? claim.billStatus === billStatus : true;
      const matchesTpaIns = tpaIns ? claim.tpaIns === tpaIns : true;


      return matchesPatientName && matchesStatus && matchesDateFrom && matchesDateTo && matchesMinAmount && matchesMaxAmount && matchesVisitType && matchesEncId && matchesDepartment && matchesRegion && matchesPlan && matchesDoctor && matchesClinic && matchesModifiedMr && matchesAssignedTo && matchesBillStatus && matchesTpaIns;
    });
  }
);