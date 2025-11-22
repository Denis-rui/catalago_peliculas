import { Injectable } from '@angular/core';
import { Contenido } from '../modelo/modelo';

@Injectable({
  providedIn: 'root',
})
export class Servicios {
  private contenido: Contenido[] = [];

  constructor(){
    const contenidoExtraido = localStorage.getItem('contenidos');
    if(contenidoExtraido !== null){
      this.contenido = JSON.parse(contenidoExtraido);

    }
  }

  getContenido(): Contenido[]{
    return this.contenido;
  }

  agregarContenido(nuevoContenido: Contenido):  void{
    // me devuelve la cantidad de elementos del arreglo y le suma 1 y le asigna de nuevo id
    nuevoContenido.id = this.contenido.length + 1;
    //agrega el nuevo contenido al arreglo
    this.contenido.push(nuevoContenido);
  }

  editarContenido(contenidoEditado: Contenido): void{
    let idEncontrado = -1;
    for (let i = 0; i<this.contenido.length; i++){
      if(this.contenido[i].id === contenidoEditado.id){
          idEncontrado = i;
          break;
      }
    }
    if(idEncontrado !== -1){
      this.contenido[idEncontrado] = contenidoEditado;
      alert('Contenido editado correctamente');
    }else{
      alert('Contenido no encontrado');
    }
  }


  
}
