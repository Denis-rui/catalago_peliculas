import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Servicios } from '../../base/servicios/servicios';
import { Contenido } from '../../base/modelo/modelo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class Inicio implements OnInit, OnDestroy {

  currentSlide: number = 0;
  totalSlides: number = 0;
  private autoPlayInterval: any;

  peliculas: Contenido[] = [];
  generos: string[] = [];
  peliculasPorGenero: { genero: string, lista: Contenido[] }[] = [];

  constructor(private servicio: Servicios, private router: Router) {}

ngOnInit(): void {

  // Obtener TODAS las películas
  const todas = this.servicio.getContenido();

  // --- CARRUSEL ---
  // Solo mostrar 10 películas en el carrusel
const base = this.mezclarArray(todas).slice(0, 10);
this.peliculas = [...base, base[0]]; // añadimos el primer slide al final
this.totalSlides = this.peliculas.length; // ahora es 11

  // --- SECCIÓN POR GÉNERO ---
  // Usar TODAS para formar los géneros
  this.generos = [...new Set(todas.map(p => p.genero))];

  this.peliculasPorGenero = this.generos.map(g => {
    const lista = todas
      .filter(p => p.genero === g)
      .slice(0, 4)          // máximo 4 por género (como ya tenías)
      .filter(p => p && p.id);

    return { genero: g, lista: lista };
  })
  .filter(grupo => grupo.lista.length > 0);

  // --- CARRUSEL AUTOPLAY ---
  this.startAutoPlay();
  setTimeout(() => this.updateCarrusel(), 50);
}


  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  verMas(id: number): void {
    this.router.navigate(['/descripcion', id]);
  }

  // --- CARRUSEL ---
nextSlide(): void {
this.currentSlide++;

  const mitad = this.totalSlides / 2;

  // --- Cuando llegamos al final del primer bloque ---
  if (this.currentSlide === mitad) {
    const carrusel = document.querySelector('.carrusel') as HTMLElement;

    // Quitar transición
    carrusel.style.transition = 'none';
    this.currentSlide = 0;
    carrusel.style.transform = `translateX(0%)`;

    // Reaplicar transición
    setTimeout(() => {
      carrusel.style.transition = 'transform 0.5s ease-in-out';
    }, 20);
  } else {
    this.updateCarrusel();
  }
}

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateCarrusel();
  }

  startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => this.nextSlide(), 4000);
  }

  stopAutoPlay(): void {
    if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
  }

  private updateCarrusel(): void {
    if (typeof document === 'undefined') return;
    const carrusel = document.querySelector('.carrusel') as HTMLElement;
    if (carrusel) {
      carrusel.style.transform = `translateX(-${this.currentSlide * (100 / 3)}%)`;
    }
  }

  mezclarArray(array: Contenido[]): Contenido[] {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copia[i];   // Guardar valor de i
    copia[i] = copia[j];     // Cambiar
    copia[j] = temp;
  }
  return copia;
}

}

