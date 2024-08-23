import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameState } from "./game.state.model";
import { Bet } from "../../models/bets.model";
import { placeAllBetsAsync } from "../../api/placeAllBetsThunk";

const initialState: GameState = {
  totalChips: 1000,
  currentBets: {},
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    placeBet: (state, action) => {
      const { type, amount, selectedBoardValue } = action.payload as Bet;

      if (state.totalChips >= amount) {
        switch (type) {
          case "dozen":
          case "straight":
            state.currentBets[type] = {
              ...(state.currentBets[type] as { [key: number]: number }),
              [selectedBoardValue as number]: amount,
            };
            break;
          case "red":
          case "black":
          case "even":
          case "odd":
            state.currentBets[type] = amount;
            break;
        }
        state.totalChips -= amount;
      }
    },
    resetBets: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      placeAllBetsAsync.fulfilled,
      (
        state,
        action: PayloadAction<{ message: string; gameState: GameState }>
      ) => {
        return {
          ...initialState,
          totalChips:
            state.totalChips +
            action.payload.gameState.results![
              action.payload.gameState.results!.length - 1
            ].playerWinnings,
          results: action.payload.gameState.results,
        };
      }
    );
    builder.addCase(placeAllBetsAsync.rejected, (state, action) => {
      console.error("Failed to place bets:", action.payload);
    });
  },
});

export const { placeBet, resetBets } = gameSlice.actions;
export default gameSlice.reducer;
