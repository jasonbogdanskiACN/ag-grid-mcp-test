import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { ICellRendererAngularComp } from 'ag-grid-angular';
import type { ICellRendererParams } from 'ag-grid-community';
import type { AssignedPerson, SoftwareProject } from './project.interface';

@Component({
  selector: 'app-assigned-to-renderer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      [style.display]="'flex'"
      [style.flex-direction]="'column'"
      [style.justify-content]="'center'"
      [style.height]="'100%'"
    >
      <a 
        [href]="'#'"
        [style.color]="'#1976d2'"
        [style.text-decoration]="'none'"
        [style.font-weight]="'500'"
        (click)="onNameClick($event)"
      >
        {{ person()?.name }}
      </a>
      <span 
        [style.font-size]="'0.75rem'"
        [style.color]="'#666'"
        [style.margin-top]="'2px'"
      >
        {{ person()?.role }}
      </span>
    </div>
  `,
  host: {
    '[style.display]': "'flex'",
    '[style.align-items]': "'center'",
    '[style.height]': "'100%'"
  }
})
export class AssignedToRenderer implements ICellRendererAngularComp {
  person = signal<AssignedPerson | null>(null);

  agInit(params: ICellRendererParams<SoftwareProject, AssignedPerson>): void {
    this.person.set(params.value || null);
  }

  refresh(params: ICellRendererParams<SoftwareProject, AssignedPerson>): boolean {
    this.person.set(params.value || null);
    return true;
  }

  onNameClick(event: Event): void {
    event.preventDefault();
    console.log('Clicked on:', this.person()?.name);
  }
}
