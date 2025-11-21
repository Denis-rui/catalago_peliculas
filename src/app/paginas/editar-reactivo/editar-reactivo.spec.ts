import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarReactivo } from './editar-reactivo';

describe('EditarReactivo', () => {
  let component: EditarReactivo;
  let fixture: ComponentFixture<EditarReactivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarReactivo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarReactivo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
