export interface RatingProps {
  /** Score out of 10. Rendered with one decimal. */
  value: number;
  /** Optional vote count, e.g. "12k". */
  votes?: string | number;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}
export declare function Rating(props: RatingProps): JSX.Element;
