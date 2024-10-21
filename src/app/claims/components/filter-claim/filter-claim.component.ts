import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';


import { applyFiltersOnPending, loadClaims } from '../../store/actions/claim.actions';
import { Claim, ClaimFilter } from '../../models/claim.model';
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
  filter!:ClaimFilter;
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
    this.claims$ = this.store.select(selectClaims);
    this.store.select(selectFilter).subscribe((state) => {
      this.filter = { ...state };
    });
    
  }


  ngOnInit(): void {
    this.store.dispatch(loadClaims());

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
    this.store.dispatch(applyFiltersOnPending({ filter: this.filter }));
  }

  ngOnDestroy(): void {
    this.departments$.subscribe().unsubscribe();
  }
}
