import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Servicios } from '../../base/servicios/servicios';
//--------------------angular---------------
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-editar-reactivo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatAutocompleteModule
  ],
  templateUrl: './editar-reactivo.html',
  styleUrl: './editar-reactivo.css',
})
export class EditarReactivo{
  form!: FormGroup;
  busqueda = new FormControl(''); 
  sugerencias: any[]=[];

  constructor(private fb: FormBuilder, private servicio: Servicios){}
  
  ngOnInit(){
    this.form = this.fb.group({
      id: [{ value: '', disabled: true }, Validators.required],
      tipo: [{ value: 'Película', disabled: true }, Validators.required],
      titulo: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      anio: ['', [Validators.required, Validators.pattern(/^(19|20)\d{2}$/)]],
      genero: ['', Validators.required],
      imagen: [''],
      video: [''],
      duracion: ['', Validators.required]
    });

    this.busqueda.valueChanges.subscribe(texto =>{
      if(!texto || texto.trim()=== ''){
        this.sugerencias = [];
        return;
      }

      this.sugerencias = this.servicio.buscarPorTitulo(texto);
    })
  }

  //CUANDO SE LLEGA A SELECCIONAR UNA DE LAS SUGERENCIAS
  seleccionar(contenido: any){
    this.form.patchValue({
      id: contenido.id,
      tipo: contenido.tipo,
      titulo: contenido.titulo,
      descripcion: contenido.descripcion,
      anio: contenido.anio,
      genero: contenido.genero,
      imagen: contenido.imagen,
      video: contenido.video,
      duracion: contenido.duracion
    });

    //colocar el título seleccionado en el imput de búsqueda
    this.busqueda.setValue(contenido.titulo);

    //ocultar sugerencias
    this.sugerencias= [];
  }

  //guardar los cambios realizados
  guardar(){
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const contenidoEditado = {
      ...this.form.getRawValue()
    };

    this.servicio.editarContenido(contenidoEditado);

    alert('Contenido actualizado correctamente!');
  }
}
