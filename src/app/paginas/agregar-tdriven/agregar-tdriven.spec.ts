import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTDriven } from './agregar-tdriven';

describe('AgregarTDriven', () => {
  let component: AgregarTDriven;
  let fixture: ComponentFixture<AgregarTDriven>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarTDriven]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarTDriven);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
