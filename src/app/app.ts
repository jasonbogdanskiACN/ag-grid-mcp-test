import { Component } from '@angular/core';
import { ProjectsGrid } from './projects/projects-grid';

@Component({
  selector: 'app-root',
  imports: [ProjectsGrid],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
