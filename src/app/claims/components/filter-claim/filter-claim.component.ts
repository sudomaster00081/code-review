import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';


import { applyFilters, loadClaims } from '../../store/actions/claim.actions';
import { Claim } from '../../models/claim.model';
import { map, Observable, tap } from 'rxjs';
import { selectClaims, selectFilter, selectFilteredClaims, selectPendingClaims, selectPendingFilteredClaims } from '../../store/selectors/claim.selectors';


@Component({
  selector: 'app-filter-claim',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './filter-claim.component.html',
  styleUrl: './filter-claim.component.scss'
})
export class FilterClaimComponent implements OnInit {
  filter = {
    encId: null,
    patientName: '',
    status: '',
    claimDateFrom: null,
    claimDateTo: null,
    minAmount: null,
    maxAmount: null,
    visitType: null,
    department: null,
    region: null,
    doctor: null,
    plan:null,
    modifiedMr: null,
    billStatus : null,
    claimStatus : null,
    clinic: null,
    tapIns: null,
    assignedTo: null,
    tpaIns:null,
    assignedToMe:null
  }; 

  claims$: Observable<Claim[]>;
  departments$!: Observable<string[]>;
  regions$!: Observable<string[]>;
  doctors$!: Observable<string[]>;
  plans$!: Observable<string[]>;
  clinics$!: Observable<string[]>;
  assignedTos$!: Observable<string[]>;
  tpaIns$!: Observable<string[]>;
  filter$!: Observable<any>;


  billStatusOptions = ['Billed', 'UnBilled'];

  constructor(private store: Store) {
    // this.claims$ = this.store.select(selectClaims);
    this.claims$ = this.store.select(selectPendingClaims);
    
  }


  ngOnInit(): void {
    // Load unique departments dynamically
    this.departments$ = this.claims$.pipe(
      map((claims: any[]) => Array.from(new Set(claims.map(claim => claim.department))))
    );
    this.regions$ = this.claims$.pipe(
      map((claims: any[]) => Array.from(new Set(claims.map(claim => claim.region))))
    );
    this.doctors$ = this.claims$.pipe(
      map((claims: any[]) => Array.from(new Set(claims.map(claim => claim.doctor))))
    );
    this.plans$ = this.claims$.pipe(
      map((claims: any[]) => Array.from(new Set(claims.map(claim => claim.plan))))
    );
    this.clinics$ = this.claims$.pipe(
      map((claims: any[]) => Array.from(new Set(claims.map(claim => claim.clinic))))
    );
    this.assignedTos$ = this.claims$.pipe(
      map((claims: any[]) => Array.from(new Set(claims.map(claim => claim.assignedTo))))
    );
    this.tpaIns$ = this.claims$.pipe(
      map((claims: any[]) => Array.from(new Set(claims.map(claim => claim.tpaIns))))
    );
    

  }

  
  updateFilter(field: string, value: any) {
    this.filter = { ...this.filter, [field]: value };
  }

  applyFilters() {
    // console.log('Applying filters:', this.filter);
    this.store.dispatch(applyFilters({ filter: this.filter }));
  }

  ngOnDestroy(): void {
    // unsubscribe from departments
    this.departments$.subscribe().unsubscribe();
  }
}
