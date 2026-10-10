export interface ChipProps {
  children?: React.ReactNode;
  /** Selected chips fill marquee red. */
  selected?: boolean;
  size?: 'sm' | 'md';
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function Chip(props: ChipProps): JSX.Element;
