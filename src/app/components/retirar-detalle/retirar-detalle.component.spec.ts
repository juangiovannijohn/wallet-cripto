import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirarDetalleComponent } from './retirar-detalle.component';

describe('RetirarDetalleComponent', () => {
  let component: RetirarDetalleComponent;
  let fixture: ComponentFixture<RetirarDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetirarDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirarDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
