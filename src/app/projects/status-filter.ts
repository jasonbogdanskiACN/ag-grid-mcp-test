import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { IFilterAngularComp } from 'ag-grid-angular';
import type { IDoesFilterPassParams, IFilterParams } from 'ag-grid-community';

@Component({
  selector: 'app-status-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule],
  template: `
    <div 
      [style.padding]="'10px'"
      [style.display]="'flex'"
      [style.flex-direction]="'column'"
      [style.gap]="'8px'"
    >
      @for (status of statuses; track status) {
        <label 
          [style.display]="'flex'"
          [style.align-items]="'center'"
          [style.gap]="'6px'"
          [style.cursor]="'pointer'"
        >
          <input 
            type="checkbox"
            [checked]="selectedStatuses().has(status)"
            (change)="onStatusChange(status, $event)"
          />
          <span>{{ status }}</span>
        </label>
      }
    </div>
  `
})
export class StatusFilter implements IFilterAngularComp {
  params!: IFilterParams;
  selectedStatuses = signal<Set<string>>(new Set());
  statuses = ['In Progress', 'Completed', 'On Hold'];

  agInit(params: IFilterParams): void {
    this.params = params;
  }

  isFilterActive(): boolean {
    return this.selectedStatuses().size > 0;
  }

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    const selectedSet = this.selectedStatuses();
    if (selectedSet.size === 0) {
      return true;
    }
    
    const cellValue = params.data?.status;
    return selectedSet.has(cellValue);
  }

  getModel(): string[] | null {
    const selected = Array.from(this.selectedStatuses());
    return selected.length > 0 ? selected : null;
  }

  setModel(model: string[] | null): void {
    this.selectedStatuses.set(model ? new Set(model) : new Set());
  }

  onStatusChange(status: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const newSet = new Set(this.selectedStatuses());
    
    if (checkbox.checked) {
      newSet.add(status);
    } else {
      newSet.delete(status);
    }
    
    this.selectedStatuses.set(newSet);
    this.params.filterChangedCallback();
  }
}
