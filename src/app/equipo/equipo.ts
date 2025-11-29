import { Component } from '@angular/core';
import { equipo } from '../base/modelo/modelo';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-equipo',
  imports: [CommonModule],
  templateUrl: './equipo.html',
  styleUrl: './equipo.css',
})
export class Equipo {

  public integrantes: equipo[]=[
    //1
    {
    nombre: 'Bustamante Tauma Liliana',
    foto: 'assets/imagenes/integrantes/liliana.jpg',
    descripcion: 'Estudiante del 4to ciclo de Ingeniería de Sistemas de la UNTRM - Filial Bagua,  interesada en saber cómo funcionan las cosas detrás de las pantallas',
    edad: 24,
    correo: 'lbustamantet27@gmail.com',
    whatsapp:  'https://wa.me/958815921'
    }, 
    {
    nombre: 'Ruiz Medina Jaime Denis',
    foto: 'assets/imagenes/integrantes/denis.jpg',
    descripcion: 'Futuro ingeniero de sistemas, en el momento llevo cursando el 4 ciclo de la universidad Toribio Rodriguez de Mendoza en la ciudad de Bagua',
    edad: 18,
    correo: 'denisruime.20@gmail.com',
    whatsapp:  'https://wa.me/973292920'
    }, 
    {
    nombre: 'Uriarte Flores Cristhian',
    foto: 'assets/imagenes/integrantes/cristhian.jpg',
    descripcion: 'Alegre, tranquilo, actualmente estudiando la carrera de ingeniería de sistemas, enfocado en sus metas y con la intención de hacer sentir orgullosos a toda su familia',
    edad: 19,
    correo: 'uriartecristhian45@gmail.com',
    whatsapp:  'https://wa.me/993696425'
    }, 
  ];







}
