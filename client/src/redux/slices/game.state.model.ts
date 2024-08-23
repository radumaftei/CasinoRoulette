import { BetType } from "../../models/bet-type.model";
import { SpinResult } from "../../models/results";
import { BetValue } from "./bet-value.model";

export interface GameState {
  totalChips: number;
  currentBets: { [key in BetType]?: BetValue };
  results?: SpinResult[];
}
