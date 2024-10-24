import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimListComponent } from './list-claim.component';

describe('ClaimListComponent', () => {
  let component: ClaimListComponent;
  let fixture: ComponentFixture<ClaimListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClaimListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClaimListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
