import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Servicios } from '../../base/servicios/servicios';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-lista',
  standalone: true,
  templateUrl: './lista.html',
  styleUrls: ['./lista.css'],
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule
  ]
})
export class Lista {

  filtroTitulo: string = '';
  filtroGenero: string = '';

  contenidos: any[] = [];
  filtrados: any[] = [];

  constructor(private servicios: Servicios, private router: Router) {
    this.contenidos = this.servicios.getContenido();
    this.filtrados = [...this.contenidos];
  }

  aplicarFiltros() {
    let filtradosTitulo = this.contenidos;
    let filtradosGenero = this.contenidos;

    // Filtrar por título usando el servicio
    if (this.filtroTitulo) {
      filtradosTitulo = this.servicios.buscarPorTitulo(this.filtroTitulo);
    }

    // Filtrar por género usando el servicio
    if (this.filtroGenero) {
      filtradosGenero = this.servicios.buscarPorGenero(this.filtroGenero);
    }

    // Combinar ambos filtros: elementos que estén en ambos arrays
    this.filtrados = filtradosTitulo.filter(item => filtradosGenero.includes(item));
  }

  verDetalle(id: number) {
    this.router.navigate(['/descripcion', id]);
  }

}
