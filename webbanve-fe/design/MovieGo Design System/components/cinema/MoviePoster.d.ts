/**
 * @startingPoint section="Cinema" subtitle="2:3 poster card with title, year and rating" viewport="700x760"
 */
export interface MoviePosterProps {
  title: string;
  /** Poster image URL. Without it a tonal typographic placeholder is drawn (hue derived from title). */
  src?: string;
  year?: string | number;
  genre?: string;
  /** Score out of 10. */
  rating?: number;
  /** Overlay node top-left, usually a <Badge>. */
  badge?: React.ReactNode;
  /** Card width in px. Height follows 2:3. Default 160. */
  width?: number;
  showMeta?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function MoviePoster(props: MoviePosterProps): JSX.Element;
