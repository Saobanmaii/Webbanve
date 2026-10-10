export interface DialogProps {
  open?: boolean;
  title: React.ReactNode;
  children?: React.ReactNode;
  /** Footer buttons, right-aligned. Primary action last. */
  actions?: React.ReactNode;
  onClose?: () => void;
  width?: number;
  /** Render the panel without the fixed overlay (for docs/previews). */
  inline?: boolean;
  style?: React.CSSProperties;
}
export declare function Dialog(props: DialogProps): JSX.Element | null;
