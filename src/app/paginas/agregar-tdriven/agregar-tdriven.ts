import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Servicios } from '../../base/servicios/servicios';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-agregar-tdriven',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './agregar-tdriven.html',
  styleUrls: ['./agregar-tdriven.css']
})
export class AgregarTDriven {
  imagenPreview: string = ''; // <- aquí almacenamos la URL de vista previa

  constructor(private servicio: Servicios) {}

  agregar(formulario: NgForm) {
    if (formulario.invalid) {
      formulario.control.markAllAsTouched();
      return;
    }

    this.servicio.agregarContenido({
      id: Date.now(),
      ...formulario.value
    });

    // Limpiamos formulario y preview
    formulario.resetForm();
    this.imagenPreview = '';
  }
}
