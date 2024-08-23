import React, { useState } from "react";
import { placeBet, resetBets } from "../redux/slices/gameSlice";
import { useDispatchHook, useSelectHook } from "../redux/hooks";
import BetChips from "./BetChips";
import { Button, Grid, Snackbar, Tooltip } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import boardImage from "../assets/Board.png";
import { Bet } from "../models/bets.model";
import { BetType } from "../models/bet-type.model";
import { placeAllBetsAsync } from "../api/placeAllBetsThunk";

const BettingBoard: React.FC = () => {
  const dispatch = useDispatchHook();

  const totalChips = useSelectHook((state) => state.game.totalChips);
  const currentBets = useSelectHook((state) => state.game.currentBets);

  const [selectedChip, setSelectedChip] = useState<number | null>(null);
  const [selectedBetType, setSelectedBetType] = useState<BetType | null>(null);
  const [selectedBoardValue, setSelectedBoardValue] = useState<
    number | string | null
  >(null);
  const showTooltip = Object.keys(currentBets).length === 0;
  const topValues = [31, 17, 1];

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showSnackbar = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePlaceBet = () => {
    if (!selectedChip) {
      showSnackbar("No Chips Selected!");
      console.log("No chips selected!");
      return;
    }
    if (!selectedBetType) {
      showSnackbar("No bet type selected!");
      console.log("No bet type selected!");
      return;
    }
    if (totalChips < selectedChip) {
      showSnackbar("Not enough chips");
      console.log("Not enough chips");
      return;
    }

    dispatch(
      placeBet({
        type: selectedBetType,
        amount: selectedChip,
        selectedBoardValue,
      } as Bet)
    );
  };

  const handleClearBets = () => {
    dispatch(resetBets());
  };

  const handleSpin = () => {
    if (Object.keys(currentBets).length === 0) {
      console.log("No bets placed!");
      return;
    }
    dispatch(placeAllBetsAsync(currentBets));
  };

  return (
    <div
      style={{ position: "relative", textAlign: "center", margin: "20px 0" }}
    >
      <img
        src={boardImage}
        alt="Betting Board"
        style={{ width: "100%", height: "auto" }}
      />

      {/*
        Clickable area START
      */}
      <div
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {Array.from({ length: 36 }, (_, idx) => {
          const row = Math.floor(idx / 3);
          const column = idx % 3;
          const topValue = topValues[column];
          const leftValue = 9 + row * 7;

          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                top: `${topValue}%`,
                left: `${leftValue}%`,
                width: "7%",
                height: "14%",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedBetType("straight");
                setSelectedBoardValue(idx + 1);
              }}
            />
          );
        })}
        {Array.from({ length: 3 }, (_, idx) => {
          const leftValue = 9 + idx * 28;

          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                top: `48%`,
                left: `${leftValue}%`,
                width: "27%",
                height: "12%",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedBetType("dozen");
                setSelectedBoardValue(idx + 1);
              }}
            />
          );
        })}
        {Array.from({ length: 2 }, (_, idx) => {
          const leftValue = 23 + idx * 42;

          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                top: `60%`,
                left: `${leftValue}%`,
                width: "13%",
                height: "13%",
                cursor: "pointer",
              }}
              onClick={() => setSelectedBetType(idx === 0 ? "even" : "odd")}
            />
          );
        })}
        {Array.from({ length: 2 }, (_, idx) => {
          const leftValue = 37 + idx * 14;

          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                top: `60%`,
                left: `${leftValue}%`,
                width: "13%",
                height: "13%",
                cursor: "pointer",
              }}
              onClick={() => setSelectedBetType(idx === 0 ? "red" : "black")}
            />
          );
        })}
      </div>

      {/*
        Clickable area END
      */}

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        style={{ height: "100%" }}
      >
        <Grid
          item
          xs={2}
          style={{
            alignSelf: "flex-end",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClearBets}
            style={{ margin: "5px", height: "50px" }}
          >
            Clear Bets
          </Button>
        </Grid>
        <Grid item xs={4} style={{ marginTop: "10px" }}>
          <BetChips onChipSelect={setSelectedChip} />
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            alignSelf: "flex-end",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handlePlaceBet()}
            style={{ margin: "5px", height: "50px" }}
          >
            Place Bet
          </Button>
        </Grid>
      </Grid>

      <Tooltip
        title={showTooltip ? "You cannot spin unless you bet!" : ""}
        disableHoverListener={!showTooltip}
      >
        <Button
          style={{
            opacity: showTooltip ? 0.5 : 1,
            cursor: showTooltip ? "not-allowed" : "pointer",
            marginTop: "45px",
            height: "50px",
            width: "20%",
          }}
          variant="contained"
          color="primary"
          onClick={() => handleSpin()}
        >
          Spin
        </Button>
      </Tooltip>

      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <MuiAlert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default BettingBoard;
