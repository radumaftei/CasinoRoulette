import { BetType } from "./bet-type.model";

export interface SpinResult {
  winningNumber: number;
  playerWinnings: number;
  dealerWinnings: number;
  playerBets: { [key in BetType]?: number };
  dealerBets: { [key in BetType]?: number | { [key: number]: number } };
}
