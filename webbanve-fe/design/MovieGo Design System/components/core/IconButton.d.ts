export interface IconButtonProps {
  /** Lucide icon name. */
  icon: string;
  /** Accessible label (also the tooltip). */
  label: string;
  variant?: 'glass' | 'solid' | 'ghost';
  /** Diameter in px. Default 40. */
  size?: number;
  active?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
