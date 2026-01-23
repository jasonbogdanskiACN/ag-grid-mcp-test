import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import type { ICellRendererAngularComp } from 'ag-grid-angular';
import type { ICellRendererParams } from 'ag-grid-community';
import type { SoftwareProject } from './project.interface';

@Component({
  selector: 'app-status-badge-renderer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span 
      [class]="badgeClass()"
      [style.display]="'inline-block'"
      [style.padding]="'4px 12px'"
      [style.border-radius]="'12px'"
      [style.font-weight]="'500'"
      [style.font-size]="'0.875rem'"
    >
      {{ status() }}
    </span>
  `,
  host: {
    '[style.display]': "'flex'",
    '[style.align-items]': "'center'",
    '[style.height]': "'100%'"
  }
})
export class StatusBadgeRenderer implements ICellRendererAngularComp {
  status = signal<string>('');
  
  badgeClass = computed(() => {
    const statusValue = this.status();
    return `status-badge status-badge-${this.getStatusClass(statusValue)}`;
  });

  agInit(params: ICellRendererParams<SoftwareProject, string>): void {
    this.status.set(params.value || '');
  }

  refresh(params: ICellRendererParams<SoftwareProject, string>): boolean {
    this.status.set(params.value || '');
    return true;
  }

  private getStatusClass(status: string): string {
    switch (status) {
      case 'Completed':
        return 'completed';
      case 'In Progress':
        return 'in-progress';
      case 'On Hold':
        return 'on-hold';
      default:
        return 'default';
    }
  }
}
