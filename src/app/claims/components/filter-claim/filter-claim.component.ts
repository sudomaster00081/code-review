import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';


import { applyFilters } from '../../store/actions/claim.actions';


@Component({
  selector: 'app-filter-claim',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './filter-claim.component.html',
  styleUrl: './filter-claim.component.scss'
})
export class FilterClaimComponent {
  filter = {
    encId: null,
    patientName: '',
    status: '',
    claimDateFrom: null,
    claimDateTo: null,
    minAmount: null,
    maxAmount: null,
    visitType: null,
    department: null
  };
  departments = [
    'Emergency Medicine',
    'Endocrinology',
    'General Practice',
    'Surgery',
    'Preventive Care',
    'Physical Therapy',
    'Laboratory',
    'Radiology',
    'Allergy and Immunology'
  ];
  

  constructor(private store: Store) {}

  updateFilter(field: string, value: any) {
    this.filter = { ...this.filter, [field]: value };
  }

  applyFilters() {
    // console.log('Applying filters:', this.filter);
    this.store.dispatch(applyFilters({ filter: this.filter }));
  }

}
