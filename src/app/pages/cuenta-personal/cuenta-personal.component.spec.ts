import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaPersonalComponent } from './cuenta-personal.component';

describe('CuentaPersonalComponent', () => {
  let component: CuentaPersonalComponent;
  let fixture: ComponentFixture<CuentaPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentaPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
