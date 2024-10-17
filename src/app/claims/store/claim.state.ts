// src/app/claims/store/claim.state.ts
import { Claim } from '../models/claim.model';

// Define possible statuses, visit types, etc. as enums if applicable
export enum ClaimStatus {
    Pending = 'Pending',
    Approved = 'Approved',
    Rejected = 'Rejected',
    // Add other statuses as needed
}

export interface ClaimState {
    filters: {
        patientName: string; // The name of the patient
        status: ClaimStatus | null; // The status of the claim
        claimDateFrom: Date | null; // Start date for claims
        claimDateTo: Date | null; // End date for claims
        minAmount: number | null; // Minimum claim amount
        maxAmount: number | null; // Maximum claim amount
        visitType: string | null; // Type of visit
        encId: number | null; // Encounter ID
        department: string | null; // Department handling the claim
        region: string | null; // Region of the service
        plan: string | null; // Insurance plan
        doctor: string | null; // Doctor's name or ID
        clinic: string | null; // Clinic name or ID
        modifiedMr: boolean | null; // Whether the medical record was modified
        assignedTo: string | null; // User assigned to the claim
        billStatus: string | null; // Billing status
        tpaIns: string | null; // Third-party administrator insurance
    };
    claims: Claim[]; // Array of claims
    filteredClaims: Claim[]; // Array of filtered claims
    loading: boolean; // Indicates if data is being loaded
    error: string | null; // Error message if any
}

export const initialState: ClaimState = {
    claims: [],
    filteredClaims: [],
    loading: false,
    error: null,
    filters: {
        patientName: '',
        status: null,
        claimDateFrom: null,
        claimDateTo: null,
        minAmount: null,
        maxAmount: null,
        visitType: null,
        encId: null,
        department: null,
        region: null,
        plan: null,
        doctor: null,
        clinic: null,
        modifiedMr: null,
        assignedTo: null,
        billStatus: null,
        tpaIns: null,
    },
};
