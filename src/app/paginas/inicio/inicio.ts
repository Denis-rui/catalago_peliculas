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

  currentSlide: number = 0;  // Slide actual (empieza en 0)
  slidesToShow: number = 3;  // Número de slides visibles a la vez
  maxSlide: number = 0;      // Máximo slide permitido
  private autoPlayInterval: any;

  peliculas: Contenido[] = [];
  generos: string[] = []; 
  peliculasPorGenero: { genero: string, lista: Contenido[] }[] = [];

  constructor(private servicio: Servicios, private router: Router) {}

  ngOnInit(): void {
    // Obtener TODAS las películas
    const todas = this.servicio.getContenido();

    // --- CARRUSEL ---
    // Tomar 10 películas aleatorias para el carrusel
    this.peliculas = this.mezclarArray(todas).slice(0, 10);
    
    // Calcular el máximo slide permitido (total - slides visibles)
    this.maxSlide = this.peliculas.length - this.slidesToShow;

    // --- SECCIÓN POR GÉNERO ---
    this.generos = [...new Set(todas.map(p => p.genero))];

    this.peliculasPorGenero = this.generos.map(g => {
      const lista = todas
        .filter(p => p.genero === g)
        .slice(0, 4)
        .filter(p => p && p.id);

      return { genero: g, lista: lista };
    })
    .filter(grupo => grupo.lista.length > 0);

    // --- CARRUSEL AUTOPLAY ---
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  verMas(id: number): void {
    this.router.navigate(['/descripcion', id]);
  }

  // --- CARRUSEL ---
  nextSlide(): void {
    // Si llegamos al final, volver al inicio
    if (this.currentSlide >= this.maxSlide) {
      this.currentSlide = 0;
    } else {
      this.currentSlide++;
    }
    this.updateCarrusel();
  }

  prevSlide(): void {
    // Si estamos al inicio, ir al final
    if (this.currentSlide <= 0) {
      this.currentSlide = this.maxSlide;
    } else {
      this.currentSlide--;
    }
    this.updateCarrusel();
  }

  startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => this.nextSlide(), 4000);
  }

  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  private updateCarrusel(): void {
    if (typeof document === 'undefined') return;
    const carrusel = document.querySelector('.carrusel') as HTMLElement;
    if (carrusel) {
      // Mover el carrusel basado en el slide actual
      carrusel.style.transform = `translateX(-${this.currentSlide * (100 / this.slidesToShow)}%)`;
    }
  }

  mezclarArray(array: Contenido[]): Contenido[] {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = copia[i];
      copia[i] = copia[j];
      copia[j] = temp;
    }
    return copia;
  }
}