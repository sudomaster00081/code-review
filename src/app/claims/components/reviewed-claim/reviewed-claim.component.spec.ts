import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewedClaimComponent } from './reviewed-claim.component';

describe('ReviewedClaimComponent', () => {
  let component: ReviewedClaimComponent;
  let fixture: ComponentFixture<ReviewedClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewedClaimComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewedClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
