# AG Grid Complex Example - Software Projects

This project demonstrates a complete implementation of AG Grid Community Edition in Angular 21+ with advanced features.

## Features Implemented

### 1. **Data Requirements** ✅
- Sample data with 10 software projects
- Fields: projectId, projectName, startDate, status, assignedTo (object), budget (currency)

### 2. **Pagination** ✅
- Enabled pagination with page size of 10
- Page size selector: [10, 20, 50]
- Custom page number formatter

### 3. **Filtering & Sorting** ✅
- Filtering and sorting enabled for all columns
- Floating filters enabled for quick access
- Custom status filter with checkbox selection (In Progress, Completed, On Hold)

### 4. **Row Grouping** ✅
- Status column configured for row grouping
- Group panel always visible for drag-and-drop grouping
- Aggregation function (sum) on budget field shows totals per group

### 5. **Custom Cell Renderers** ✅

#### Status Badge Renderer
- **File**: `src/app/projects/status-badge-renderer.ts`
- Displays colored badges for status values:
  - 🟢 Completed (Green: #4caf50)
  - 🔵 In Progress (Blue: #2196f3)
  - 🔴 On Hold (Red: #f44336)
- Uses Angular signals for reactive updates
- OnPush change detection for optimal performance

#### Assigned To Renderer
- **File**: `src/app/projects/assigned-to-renderer.ts`
- Displays person's name as a clickable link
- Shows role in smaller font below the name
- Click handler logs to console (can be extended for navigation)

### 6. **Inline Editing** ✅
- Project Name field: editable
- Budget field: editable with currency formatting

### 7. **Quick Filter** ✅
- Global search input above the grid
- Searches across all columns
- Real-time filtering as you type

### 8. **Theming** ✅
- Uses **ag-theme-quartz** (AG Grid's modern theme)
- Theme imported in `styles.scss`
- Responsive and accessible design

## Project Structure

```
src/app/
├── projects/
│   ├── project.interface.ts          # TypeScript interface for type safety
│   ├── status-badge-renderer.ts      # Custom cell renderer for status badges
│   ├── assigned-to-renderer.ts       # Custom cell renderer for assigned person
│   ├── status-filter.ts              # Custom filter component for status
│   └── projects-grid.ts              # Main grid component with all features
├── app.ts                            # Root component
├── app.html                          # Template file
└── app.scss                          # Component styles
```

## Modern Angular Features Used

### ✨ Standalone Components
- All components are standalone (no NgModules)
- `standalone: true` is NOT explicitly set (default in Angular 20+)

### 🎯 Signals for State Management
- Used `signal()` for reactive state
- Used `computed()` for derived state
- OnPush change detection strategy throughout

### 🔄 Modern Control Flow
- `@for` loops instead of `*ngFor`
- `@if` conditionals instead of `*ngIf`

### 🎨 Inline Styles & Property Bindings
- Used `[style.property]` bindings instead of `ngStyle`
- Used `[class]` bindings instead of `ngClass`

### 📦 Direct Imports
- Components imported directly without registration
- No need for module declarations

## Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm start
```

Navigate to `http://localhost:4200/`

## AG Grid Dependencies

```json
{
  "ag-grid-angular": "34.3.1",
  "ag-grid-community": "34.3.1"
}
```

## Styles Configuration

The `styles.scss` file includes:
1. AG Grid core styles
2. AG Grid Quartz theme
3. Custom status badge styles
4. Global reset and typography

```scss
@import "ag-grid-community/styles/ag-grid.css";
@import "ag-grid-community/styles/ag-theme-quartz.css";
```

## Key Implementation Details

### Module Registry
AG Grid Community modules are registered in the grid component:
```typescript
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);
```

### Column Definitions
- Uses type-safe `ColDef<SoftwareProject>[]` interface
- Custom cell renderers specified via `cellRenderer` property
- Custom filters specified via `filter` property
- Value formatters for currency display

### Custom Components Integration
Custom components implement AG Grid interfaces:
- Cell Renderers: `ICellRendererAngularComp`
- Filters: `IFilterAngularComp`

### Accessibility
- Uses proper ARIA attributes
- Keyboard navigation supported
- Focus management handled by AG Grid
- Color contrast meets WCAG AA standards

## Testing the Features

1. **Pagination**: Use the page size selector at the bottom
2. **Filtering**: 
   - Type in the quick filter input for global search
   - Click filter icon in Status column header for custom filter
   - Use floating filters below column headers
3. **Sorting**: Click any column header
4. **Grouping**: Drag the Status column header to the group panel
5. **Editing**: Double-click on Project Name or Budget cells
6. **Custom Renderers**: Observe colored status badges and formatted assigned-to fields

## Performance Optimizations

- **OnPush Change Detection**: Reduces change detection cycles
- **Signals**: Efficient reactive updates
- **Row Virtualization**: Only visible rows are rendered
- **Column Virtualization**: Only visible columns are rendered (AG Grid default)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Additional Resources

- [AG Grid Documentation](https://www.ag-grid.com/angular-data-grid/)
- [Angular Documentation](https://angular.dev/)
- [AG Grid Community GitHub](https://github.com/ag-grid/ag-grid)
