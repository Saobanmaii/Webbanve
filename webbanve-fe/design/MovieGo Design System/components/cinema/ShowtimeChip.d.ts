export interface ShowtimeChipProps {
  /** 24h time, e.g. "19:45". */
  time: string;
  /** Format label: "2D", "IMAX", "4DX", "Dolby". */
  format?: string;
  /** When ≤10 the label switches to an amber "N left". */
  seatsLeft?: number;
  selected?: boolean;
  soldOut?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function ShowtimeChip(props: ShowtimeChipProps): JSX.Element;
