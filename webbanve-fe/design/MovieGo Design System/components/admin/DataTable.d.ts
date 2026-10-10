export interface DataColumn {
  key: string;
  label: string;
  align?: 'left' | 'right' | 'center';
  width?: number | string;
  /** Monospace cell text (times, ids, money). */
  mono?: boolean;
  /** Secondary text colour. */
  muted?: boolean;
  render?: (row: any) => React.ReactNode;
}
export interface DataTableProps {
  columns: DataColumn[];
  rows: any[];
  rowKey?: string;
  onRowClick?: (row: any) => void;
  style?: React.CSSProperties;
}
export declare function DataTable(props: DataTableProps): JSX.Element;
