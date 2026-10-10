export interface IconProps {
  /** Lucide icon name in kebab-case, e.g. "ticket", "armchair", "calendar-days". */
  name: string;
  /** Pixel size. Default 20. */
  size?: number;
  /** Stroke width. Brand default 1.75. */
  strokeWidth?: number;
  color?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;
