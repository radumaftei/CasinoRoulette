export type BetType =
  | "straight"
  | "split"
  | "street"
  | "corner"
  | "sixLine"
  | "red"
  | "black"
  | "odd"
  | "even"
  | "low"
  | "high"
  | "dozen"
  | "column";

export type BetValue = number | { [key: number]: number };

export interface Bet {
  type: BetType;
  amount: number;
  selectedBoardValue?: number | string;
}

export interface GameState {
  totalChips: number;
  currentBets: { [key in BetType]?: BetValue };
  results?: SpinResult[];
}

export interface SpinResult {
  winningNumber: number;
  playerWinnings: number;
  dealerWinnings: number;
  playerBets: { [key in BetType]?: number };
  dealerBets: { [key in BetType]?: number | { [key: number]: number } };
}
