import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef, GridReadyEvent, PaginationNumberFormatterParams } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import type { SoftwareProject } from './project.interface';
import { AssignedToRenderer } from './assigned-to-renderer';
import { StatusBadgeRenderer } from './status-badge-renderer';
import { StatusFilter } from './status-filter';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-projects-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AgGridAngular, FormsModule, StatusBadgeRenderer, AssignedToRenderer, StatusFilter],
  template: `
    <div class="grid-container">
      <div class="toolbar">
        <h2>Software Projects</h2>
        <input 
          type="text"
          placeholder="Quick filter..."
          class="quick-filter-input"
          [(ngModel)]="quickFilterText"
          (ngModelChange)="onQuickFilterChanged($event)"
        />
      </div>
      
      <ag-grid-angular
        class="ag-theme-quartz"
        [style.height.%]="100"
        [style.width.%]="100"
        [rowData]="rowData()"
        [columnDefs]="colDefs"
        [defaultColDef]="defaultColDef"
        [pagination]="true"
        [paginationPageSize]="paginationPageSize()"
        [paginationPageSizeSelector]="paginationPageSizeSelector"
        [paginationNumberFormatter]="paginationNumberFormatter"
        [rowGroupPanelShow]="'always'"
        [groupDefaultExpanded]="groupDefaultExpanded"
        [suppressAggFuncInHeader]="true"
        (gridReady)="onGridReady($event)"
      />
    </div>
  `,
  styles: [`
    .grid-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 20px;
      gap: 16px;
    }

    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    }

    .toolbar h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
      color: #333;
    }

    .quick-filter-input {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 0.875rem;
      min-width: 250px;
    }

    .quick-filter-input:focus {
      outline: none;
      border-color: #1976d2;
      box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.1);
    }
  `]
})
export class ProjectsGrid {
  protected quickFilterText = '';
  protected paginationPageSize = signal(10);
  protected paginationPageSizeSelector = [10, 20, 50];
  protected groupDefaultExpanded = 0;
  
  private gridApi!: any;

  protected readonly rowData = signal<SoftwareProject[]>([
    {
      projectId: 'PRJ-001',
      projectName: 'E-Commerce Platform',
      startDate: '2024-01-15',
      status: 'In Progress',
      assignedTo: { name: 'Sarah Johnson', role: 'Senior Developer' },
      budget: 125000
    },
    {
      projectId: 'PRJ-002',
      projectName: 'Mobile Banking App',
      startDate: '2023-11-20',
      status: 'Completed',
      assignedTo: { name: 'Michael Chen', role: 'Lead Engineer' },
      budget: 250000
    },
    {
      projectId: 'PRJ-003',
      projectName: 'Data Analytics Dashboard',
      startDate: '2024-03-01',
      status: 'In Progress',
      assignedTo: { name: 'Emma Williams', role: 'Full Stack Developer' },
      budget: 95000
    },
    {
      projectId: 'PRJ-004',
      projectName: 'CRM System Upgrade',
      startDate: '2024-02-10',
      status: 'On Hold',
      assignedTo: { name: 'David Martinez', role: 'Solutions Architect' },
      budget: 180000
    },
    {
      projectId: 'PRJ-005',
      projectName: 'Cloud Migration',
      startDate: '2023-12-05',
      status: 'Completed',
      assignedTo: { name: 'Lisa Anderson', role: 'DevOps Engineer' },
      budget: 320000
    },
    {
      projectId: 'PRJ-006',
      projectName: 'AI Chatbot Integration',
      startDate: '2024-04-15',
      status: 'In Progress',
      assignedTo: { name: 'James Wilson', role: 'ML Engineer' },
      budget: 75000
    },
    {
      projectId: 'PRJ-007',
      projectName: 'Security Audit System',
      startDate: '2024-01-30',
      status: 'On Hold',
      assignedTo: { name: 'Rachel Brown', role: 'Security Specialist' },
      budget: 110000
    },
    {
      projectId: 'PRJ-008',
      projectName: 'Inventory Management',
      startDate: '2023-10-15',
      status: 'Completed',
      assignedTo: { name: 'Tom Garcia', role: 'Backend Developer' },
      budget: 85000
    },
    {
      projectId: 'PRJ-009',
      projectName: 'Customer Portal Redesign',
      startDate: '2024-05-01',
      status: 'In Progress',
      assignedTo: { name: 'Sophia Lee', role: 'UI/UX Developer' },
      budget: 65000
    },
    {
      projectId: 'PRJ-010',
      projectName: 'API Gateway Implementation',
      startDate: '2024-03-20',
      status: 'In Progress',
      assignedTo: { name: 'Kevin Taylor', role: 'API Developer' },
      budget: 145000
    }
  ]);

  protected readonly colDefs: ColDef<SoftwareProject>[] = [
    {
      field: 'projectId',
      headerName: 'Project ID',
      width: 130,
      filter: 'agTextColumnFilter',
      sortable: true
    },
    {
      field: 'projectName',
      headerName: 'Project Name',
      flex: 1,
      minWidth: 200,
      filter: 'agTextColumnFilter',
      sortable: true,
      editable: true
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 130,
      filter: 'agDateColumnFilter',
      sortable: true
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      cellRenderer: StatusBadgeRenderer,
      filter: StatusFilter,
      sortable: true,
      rowGroup: false,
      enableRowGroup: true
    },
    {
      field: 'assignedTo',
      headerName: 'Assigned To',
      flex: 1,
      minWidth: 180,
      cellRenderer: AssignedToRenderer,
      sortable: true,
      valueFormatter: (params) => params.value?.name || '',
      filter: 'agTextColumnFilter',
      filterValueGetter: (params) => params.data?.assignedTo?.name
    },
    {
      field: 'budget',
      headerName: 'Budget',
      width: 140,
      filter: 'agNumberColumnFilter',
      sortable: true,
      editable: true,
      valueFormatter: (params) => {
        if (params.value == null) return '';
        return '$' + params.value.toLocaleString('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        });
      },
      aggFunc: 'sum'
    }
  ];

  protected readonly defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true
  };

  protected onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
  }

  protected onQuickFilterChanged(value: string): void {
    this.gridApi?.setGridOption('quickFilterText', value);
  }

  protected paginationNumberFormatter(params: PaginationNumberFormatterParams): string {
    return '[' + params.value.toLocaleString() + ']';
  }
}
