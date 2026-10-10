export interface TabItem { id: string; label: string; /** Lucide icon name */ icon?: string; }
export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange?: (id: string) => void;
  style?: React.CSSProperties;
}
export declare function Tabs(props: TabsProps): JSX.Element;
