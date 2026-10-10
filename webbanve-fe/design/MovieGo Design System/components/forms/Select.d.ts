export interface SelectOption { value: string; label: string; }
export interface SelectProps {
  label?: string;
  options: Array<string | SelectOption>;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** md = form field; sm = compact pill for sort/filter bars. */
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}
export declare function Select(props: SelectProps): JSX.Element;
