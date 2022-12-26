import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirarFinalComponent } from './retirar-final.component';

describe('RetirarFinalComponent', () => {
  let component: RetirarFinalComponent;
  let fixture: ComponentFixture<RetirarFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetirarFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetirarFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
