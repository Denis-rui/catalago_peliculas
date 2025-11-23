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
  this.peliculas = todas.slice(0, 10);
  this.totalSlides = this.peliculas.length;

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
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateCarrusel();
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
}