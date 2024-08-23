import { BetType, GameState, SpinResult } from "./types";

export const spin = (): number => {
  return Math.floor(Math.random() * 36) + 1;
};

export const setWinner = (gameState: GameState): SpinResult => {
  const winningNumber = spin();
  let playerWinnings = 0;
  let dealerWinnings = 0;

  const playerBets: { [key in BetType]?: number } = {};
  const dealerBets: { [key in BetType]?: number | { [key: number]: number } } =
    {};

  for (const betType in gameState.currentBets) {
    const bet = gameState.currentBets[betType as BetType];

    switch (betType) {
      case "straight":
        if (typeof bet === "object") {
          const straightBetValue = bet[winningNumber];
          if (straightBetValue) {
            const winnings = straightBetValue * 35;
            playerWinnings += winnings;
            playerBets["straight"] = (playerBets["straight"] || 0) + winnings;
          } else {
            dealerWinnings += Object.values(bet).reduce(
              (sum, amount) => sum + amount,
              0
            );
            dealerBets["straight"] = bet;
          }
        }
        break;

      case "even":
        if (winningNumber % 2 === 0 && typeof bet === "number") {
          const winnings = bet * 2;
          playerWinnings += winnings;
          playerBets["even"] = winnings;
        } else {
          dealerWinnings += bet as number;
          dealerBets["even"] = bet as number;
        }
        break;

      case "odd":
        if (winningNumber % 2 !== 0 && typeof bet === "number") {
          const winnings = bet * 2;
          playerWinnings += winnings;
          playerBets["odd"] = winnings;
        } else {
          dealerWinnings += bet as number;
          dealerBets["odd"] = bet as number;
        }
        break;

      case "dozen":
        if (typeof bet === "object") {
          let dozenBetValue = 0;
          let won = false;

          if (winningNumber >= 1 && winningNumber <= 12 && bet["1"]) {
            dozenBetValue = bet["1"];
            won = true;
            playerWinnings += dozenBetValue * 2;
            playerBets["dozen"] =
              (playerBets["dozen"] || 0) + dozenBetValue * 2;
          } else if (bet["1"]) {
            dealerWinnings += bet["1"];
            dealerBets["dozen"] =
              (typeof dealerBets["dozen"] === "number"
                ? dealerBets["dozen"]
                : 0) + bet["1"];
          }

          if (winningNumber >= 13 && winningNumber <= 24 && bet["2"]) {
            dozenBetValue = bet["2"];
            won = true;
            playerWinnings += dozenBetValue * 2;
            playerBets["dozen"] =
              (playerBets["dozen"] || 0) + dozenBetValue * 2;
          } else if (bet["2"]) {
            dealerWinnings += bet["2"];
            dealerBets["dozen"] =
              (typeof dealerBets["dozen"] === "number"
                ? dealerBets["dozen"]
                : 0) + bet["2"];
          }

          if (winningNumber >= 25 && winningNumber <= 36 && bet["3"]) {
            dozenBetValue = bet["3"];
            won = true;
            playerWinnings += dozenBetValue * 2;
            playerBets["dozen"] =
              (playerBets["dozen"] || 0) + dozenBetValue * 2;
          } else if (bet["3"]) {
            dealerWinnings += bet["3"];
            dealerBets["dozen"] =
              (typeof dealerBets["dozen"] === "number"
                ? dealerBets["dozen"]
                : 0) + bet["3"];
          }
        }
        break;
    }
  }

  return {
    winningNumber,
    playerWinnings,
    dealerWinnings,
    playerBets,
    dealerBets,
  };
};
