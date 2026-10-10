export interface StepperProps {
  /** Step labels, e.g. ["Showtime","Seats","Payment","Done"]. */
  steps: string[];
  /** 0-based index of the current step. */
  current?: number;
  style?: React.CSSProperties;
}
export declare function Stepper(props: StepperProps): JSX.Element;
