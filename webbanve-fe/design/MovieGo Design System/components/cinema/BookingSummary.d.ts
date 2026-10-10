export interface SummaryLine { label: string; value: string; }
export interface BookingSummaryProps {
  title: string;
  /** Small poster node, e.g. <MoviePoster width={72} showMeta={false} />. */
  poster?: React.ReactNode;
  cinema?: string;
  datetime?: string;
  /** Format node, usually a <Badge>. */
  format?: React.ReactNode;
  seats?: string[];
  lines?: SummaryLine[];
  /** Formatted total, e.g. "$31.50". */
  total: string;
  ctaLabel?: string;
  ctaDisabled?: boolean;
  /** Pass null to hide the CTA. */
  onCta?: (() => void) | null;
  style?: React.CSSProperties;
}
export declare function BookingSummary(props: BookingSummaryProps): JSX.Element;
