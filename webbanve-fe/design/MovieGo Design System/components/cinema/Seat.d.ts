export interface SeatProps {
  state?: 'available' | 'selected' | 'taken' | 'vip' | 'accessible';
  /** Seat id, e.g. "F12". Number shows on hover/selected. */
  label?: string;
  /** Override size (px or CSS length). Defaults to --seat-size (28px). */
  size?: number | string;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function Seat(props: SeatProps): JSX.Element;
