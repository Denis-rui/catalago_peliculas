import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Servicios } from '../../base/servicios/servicios';
import { Contenido } from '../../base/modelo/modelo';

@Component({
  selector: 'app-descripcion-contenido',
  imports: [CommonModule, RouterModule],
  templateUrl: './descripcion-contenido.html',
  styleUrl: './descripcion-contenido.css',
})
export class DescripcionContenido {
  contenido?: Contenido;

  constructor(
    private ruta: ActivatedRoute,
    private servicio: Servicios, 
    private router: Router
  ){}

  ngOnInit(): void {
    const idRecibido = this.ruta.snapshot.paramMap.get('id');

    if (idRecibido) {
      const id = Number(idRecibido);
      this.contenido = this.servicio.buscarPorId(id);
    }
  }

  volver(){
    this.router.navigate(['/inicio']);
  }
}
