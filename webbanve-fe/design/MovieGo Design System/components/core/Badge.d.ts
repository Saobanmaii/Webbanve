export interface BadgeProps {
  children?: React.ReactNode;
  tone?: 'neutral' | 'accent' | 'gold' | 'success' | 'warning' | 'info';
  variant?: 'soft' | 'solid' | 'outline';
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;
