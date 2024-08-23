import { createAsyncThunk } from "@reduxjs/toolkit";
import { GameState } from "../redux/slices/game.state.model";

export const placeAllBetsAsync = createAsyncThunk(
  "game/placeAllBets",
  async (currentBets: GameState["currentBets"], { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/game/bet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentBets }),
      });

      if (!response.ok) {
        throw new Error("Failed to place bets");
      }

      const data: {
        message: string;
        gameState: GameState;
      } = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
