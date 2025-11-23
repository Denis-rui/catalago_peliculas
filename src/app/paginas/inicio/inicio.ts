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

  // Aquí estarán las películas que vienen del servicio
  peliculas: Contenido[] = [];

  constructor(private servicio: Servicios, private router: Router) {}

  ngOnInit(): void {
    // Carga desde el servicio
    this.peliculas = this.servicio.getContenido();
    this.totalSlides = this.peliculas.length;

    this.startAutoPlay();
    setTimeout(() => this.updateCarrusel(), 50);
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateCarrusel();
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateCarrusel();
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.updateCarrusel();
  }

  startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  onMouseEnter(): void {
    this.stopAutoPlay();
  }

  onMouseLeave(): void {
    this.startAutoPlay();
  }

  // redirigir a ver la pelicula
  verMas(id: number): void {
    
    this.router.navigate(['/descripcion', id]);
    
  }

private updateCarrusel(): void {

  // Evita error "document is not defined" cuando no estás en navegador
  if (typeof document === 'undefined') {
    return;
  }

  const carrusel = document.querySelector('.carrusel') as HTMLElement;

  if (carrusel) {
    carrusel.style.transform = `translateX(-${this.currentSlide * (100/3)}%)`;
  }
}
}