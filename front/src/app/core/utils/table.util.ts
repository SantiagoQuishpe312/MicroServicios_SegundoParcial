import { TableColumn } from 'src/@vex/interfaces/table-column.interface';

export function trackByTableColumnProperty<T>(
  index: number,
  column: TableColumn<T>
): any {
  return column.property;
}

export function getVisibleColumns<T>(columns: TableColumn<T>[]): string[] {
  return columns
    .filter(column => column.visible)
    .map(column => column.property);
}

export function getVisibleColumnsByColumnDef<T>(
  columns: TableColumn<T>[]
): string[] {
  return columns
    .filter(column => column.visible)
    .map(column => column.columnDef);
}

export class GroupTable {
  level: number = 0;
  parent: GroupTable;
  expanded: boolean = true;

  get visible(): boolean {
    return !this.parent || (this.parent.visible && this.parent.expanded);
  }
}
