export interface InputProps {
  label?: string;
  hint?: string;
  /** Error message — turns the border red and replaces the hint. */
  error?: string;
  /** Lucide icon name inside the field. */
  iconLeft?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
  /** Monospace text — for card numbers, booking codes. */
  mono?: boolean;
  style?: React.CSSProperties;
}
export declare function Input(props: InputProps): JSX.Element;
