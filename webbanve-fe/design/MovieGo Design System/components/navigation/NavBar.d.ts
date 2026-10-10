export interface NavLink { id: string; label: string; }
/**
 * @startingPoint section="Navigation" subtitle="Top bar with wordmark, links and actions" viewport="1280x72"
 */
export interface NavBarProps {
  links?: Array<string | NavLink>;
  /** id of the active link — marked with a red dot. */
  active?: string;
  onNavigate?: (id: string) => void;
  /** Right-side slot: search, account, etc. */
  right?: React.ReactNode;
  /** Gradient-to-transparent over a hero instead of glass. */
  transparent?: boolean;
  style?: React.CSSProperties;
}
export declare function NavBar(props: NavBarProps): JSX.Element;
