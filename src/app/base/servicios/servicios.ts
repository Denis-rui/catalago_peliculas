import { Injectable } from '@angular/core';
import { Contenido } from '../modelo/modelo';
import { Datos } from '../datos/data';

@Injectable({
  providedIn: 'root',
})
export class Servicios {
  private contenido: Contenido[] = [...Datos];

  constructor(){
if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {

    const contenidoExtraido = localStorage.getItem('contenidos');

if (contenidoExtraido !== null) {
  const guardado = JSON.parse(contenidoExtraido);
  // Mezclar: lo nuevo de Datos + lo guardado
  this.contenido = [...Datos, ...guardado];
} else {
  this.contenido = [...Datos];
}

  } else {
    // No estamos en navegador (build o SSR)
    this.contenido = [];
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
    //guardamos en el localStorage
    localStorage.setItem('contenidos', JSON.stringify(this.contenido));

    alert('Película Agregada Correctamente')
  }

  editarContenido(contenidoEditado: Contenido): void{
    let idEncontrado = -1;

    // buscamos que exista el id en el arreglo
    for (let i = 0; i<this.contenido.length; i++){
      if(this.contenido[i].id === contenidoEditado.id){
          idEncontrado = i;
          break;
      }
    }
    // validamos que exista el id ya se por error del código o usuario
    if(idEncontrado !== -1){
      this.contenido[idEncontrado] = contenidoEditado;
      alert('Contenido editado correctamente');
    }else{
      alert('Contenido no encontrado');
    }

  }

//BÚSQUEDAS

  buscarPorId(id: number): Contenido | undefined {
    for(let i=0; i<this.contenido.length; i++){
      if(this.contenido[i].id === id){
        return this.contenido[i];
      }
    }
    return undefined;
  }

  buscarPorTitulo(titulo: string): Contenido[] {
    // tolowerCase convierte todo a minúsculas
    titulo = titulo.toLowerCase();
    //filter recorre todo el arreglo y devuelve los que cumplan la condición
    //c es un alias al cual se le asigna cada elemento del arreglo
    // includes compara 
    return this.contenido.filter(c => c.titulo.toLowerCase().includes(titulo));
  }

  buscarPorGenero(genero: string): Contenido[]{
    // pienso en colocar un menu de géneros en la lista
    return this.contenido.filter(c => c.genero === genero);
  }

  
}
