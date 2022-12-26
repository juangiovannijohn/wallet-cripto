import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntercambiarComponent } from './intercambiar.component';

describe('IntercambiarComponent', () => {
  let component: IntercambiarComponent;
  let fixture: ComponentFixture<IntercambiarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntercambiarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntercambiarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
