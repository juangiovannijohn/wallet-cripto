import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceTotalComponent } from './balance-total.component';

describe('BalanceTotalComponent', () => {
  let component: BalanceTotalComponent;
  let fixture: ComponentFixture<BalanceTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceTotalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
