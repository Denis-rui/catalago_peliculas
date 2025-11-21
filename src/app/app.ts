import { Component, signal } from '@angular/core';
import { MatToolbarModule} from '@angular/material/toolbar'
import { RouterOutlet, RouterLink } from "@angular/router";
 import { MatButtonModule } from  '@angular/material/button' ;
import { MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, MatMenuModule, RouterOutlet, RouterLink, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  
})
export class App {
  protected readonly title = signal('proyectoFinal');
  constructor(private router: Router){}
  irLista() {
  this.router.navigate(['/lista']);
}
}
