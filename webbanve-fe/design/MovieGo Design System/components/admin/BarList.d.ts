export interface BarItem { label: string; value: number; /** Formatted value, e.g. "$12,400". */ display?: string; }
export interface BarListProps {
  /** Sorted descending for revenue-by-movie rankings. */
  items: BarItem[];
  max?: number;
  /** Bar fill. Default marquee red; use var(--rating) for scores. */
  color?: string;
  style?: React.CSSProperties;
}
export declare function BarList(props: BarListProps): JSX.Element;
