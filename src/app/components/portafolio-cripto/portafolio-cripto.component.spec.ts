import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortafolioCriptoComponent } from './portafolio-cripto.component';

describe('PortafolioCriptoComponent', () => {
  let component: PortafolioCriptoComponent;
  let fixture: ComponentFixture<PortafolioCriptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortafolioCriptoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortafolioCriptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
