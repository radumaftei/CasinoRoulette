import { BetType } from "./bet-type.model";

export interface Bet {
  type: BetType;
  amount: number;
  selectedBoardValue?: number | string;
}

// export interface StraightBet extends Bet {
//   type: "straight";
//   number: number; // The specific number (0-36)
// }

// export interface SplitBet extends Bet {
//   type: "split";
//   numbers: [number, number]; // The two adjacent numbers
// }

// export interface StreetBet extends Bet {
//   type: "street";
//   row: number[]; // The three numbers in the row
// }

// export interface CornerBet extends Bet {
//   type: "corner";
//   numbers: [number, number, number, number]; // The four numbers in the square
// }

// export interface SixLineBet extends Bet {
//   type: "sixLine";
//   rows: [number[], number[]]; // The two rows of three numbers each
// }

// export interface OutsideBet extends Bet {
//   type: "red" | "black" | "odd" | "even" | "low" | "high";
// }

// export interface DozenBet extends Bet {
//   type: "dozen";
//   dozen: 1 | 2 | 3; // 1 for 1-12, 2 for 13-24, 3 for 25-36
// }

// export interface ColumnBet extends Bet {
//   type: "column";
//   column: 1 | 2 | 3; // 1 for first column, 2 for second column, 3 for third column
// }
