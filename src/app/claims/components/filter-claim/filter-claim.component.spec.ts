import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterClaimComponent } from './filter-claim.component';

describe('FilterClaimComponent', () => {
  let component: FilterClaimComponent;
  let fixture: ComponentFixture<FilterClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterClaimComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
