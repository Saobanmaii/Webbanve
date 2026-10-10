export interface StatCardProps {
  /** Uppercase eyebrow, e.g. "Revenue". */
  label: string;
  value: React.ReactNode;
  /** "+12.4%" or "-3.1%" — sign sets colour. */
  delta?: string;
  /** Lucide icon name. */
  icon?: string;
  caption?: string;
  style?: React.CSSProperties;
}
export declare function StatCard(props: StatCardProps): JSX.Element;
