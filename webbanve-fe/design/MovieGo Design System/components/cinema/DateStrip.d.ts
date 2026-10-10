export interface DateItem { id: string; /** "Mon", "Today" */ weekday: string; /** "14" */ day: string | number; }
export interface DateStripProps {
  days: DateItem[];
  value?: string;
  onChange?: (id: string) => void;
  style?: React.CSSProperties;
}
export declare function DateStrip(props: DateStripProps): JSX.Element;
