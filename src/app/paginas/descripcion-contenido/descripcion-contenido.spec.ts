import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionContenido } from './descripcion-contenido';

describe('DescripcionContenido', () => {
  let component: DescripcionContenido;
  let fixture: ComponentFixture<DescripcionContenido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescripcionContenido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescripcionContenido);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
