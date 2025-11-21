import { Routes } from '@angular/router';
import { Inicio } from './paginas/inicio/inicio';
import { Lista } from './paginas/lista/lista';
import { DescripcionContenido } from './paginas/descripcion-contenido/descripcion-contenido';
import { AgregarTDriven } from './paginas/agregar-tdriven/agregar-tdriven';
import { EditarReactivo } from './paginas/editar-reactivo/editar-reactivo';
import { Equipo } from './equipo/equipo';

export const routes: Routes = [
    {path: 'inicio', component: Inicio},
    {path: 'lista', component: Lista},
    {path: 'descripcion/:id', component: DescripcionContenido},
    {path: 'agregar', component: AgregarTDriven},
    {path: 'editar', component: EditarReactivo},
    {path: 'equipo',  component: Equipo},

    {path: '', redirectTo: 'inicio', pathMatch: 'full'}

];
