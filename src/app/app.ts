import { Component, signal } from '@angular/core';
import { MatToolbarModule} from '@angular/material/toolbar'
import { RouterOutlet, RouterLink } from "@angular/router";
 import { MatButtonModule } from  '@angular/material/button' ;
import { MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatMenuModule, RouterOutlet, RouterLink, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  
})
export class App {
  protected readonly title = signal('proyectoFinal');

}

