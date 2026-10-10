/**
 * @startingPoint section="Cinema" subtitle="Interactive auditorium seat map with screen and legend" viewport="700x760"
 */
export interface SeatMapProps {
  /** Row letters, front (screen) to back. */
  rows?: string[];
  seatsPerRow?: number;
  /** Seat numbers after which an aisle gap is inserted. */
  aisles?: number[];
  /** Seat ids already sold, e.g. ["E7","E8"]. */
  taken?: string[];
  /** Row letters priced as VIP (gold outline). */
  vipRows?: string[];
  accessible?: string[];
  selected?: string[];
  onToggle?: (id: string) => void;
  showLegend?: boolean;
  style?: React.CSSProperties;
}
export declare function SeatMap(props: SeatMapProps): JSX.Element;
