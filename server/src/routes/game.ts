import { Request, Response, Router } from "express";
import { BetType, BetValue, GameState } from "../types";
import { setWinner } from "../utils";

const router = Router();

let gameState: GameState = {
  totalChips: 1000,
  currentBets: {},
};

router.get("/state", (req: Request, res: Response) => {
  res.json(gameState);
});

router.post("/bet", (req: Request, res: Response) => {
  if (!req.body.currentBets) {
    res.status(400).json({ message: "No bets were received" });
  }

  const currentBets: { [key in BetType]?: BetValue } = req.body.currentBets;

  const keys = Object.keys(currentBets) as BetType[];
  const totalChipsFromBets = keys.reduce((total, key) => {
    const betValue = currentBets[key];
    if (typeof betValue === "number") {
      return total + betValue;
    } else if (typeof betValue === "object") {
      return (
        total + Object.values(betValue).reduce((sum, value) => sum + value, 0)
      );
    }
    return total;
  }, 0);

  if (gameState.totalChips < totalChipsFromBets) {
    res
      .status(400)
      .json({ message: "Not enough chips. Bet again with smaller values." });
    return;
  }

  keys.forEach((key) => {
    let currentBet = gameState.currentBets[key] as
      | { [key: number]: number }
      | number
      | undefined;

    switch (key) {
      case "dozen":
      case "straight":
        Object.keys(currentBets[key]!).forEach((selectedBoardValue) => {
          const boardValueAsNumber = +selectedBoardValue;
          if (
            currentBet &&
            typeof currentBet === "object" &&
            typeof currentBets[key] === "object"
          ) {
            if (currentBet[boardValueAsNumber]) {
              currentBet[boardValueAsNumber] +=
                currentBets[key]![boardValueAsNumber];
            } else {
              currentBet[boardValueAsNumber] =
                currentBets[key]![boardValueAsNumber];
            }
          } else {
            if (!currentBet && typeof currentBets[key] === "object") {
              currentBet = {
                [boardValueAsNumber]: currentBets[key]![boardValueAsNumber],
              };
            }
          }
        });
        break;

      default:
        if (currentBet && typeof currentBet === "number") {
          currentBet += currentBets[key]! as number;
        } else if (!currentBet && typeof currentBets[key] === "number") {
          currentBet = currentBets[key]! as number;
        }
        break;
    }

    if (typeof currentBet === "object") {
      gameState.currentBets = {
        ...gameState.currentBets,
        [key]: {
          ...(gameState.currentBets[key] as { [key: number]: number }),
          ...currentBet,
        },
      };
    } else if (typeof currentBet === "number") {
      gameState.currentBets = {
        ...gameState.currentBets,
        [key]: currentBet,
      };
    }
  });

  gameState.totalChips -= totalChipsFromBets;

  const result = setWinner(gameState);
  if (!gameState.results) {
    gameState.results = [result];
  } else {
    gameState.results.push(result);
  }

  res.status(200).json({ message: "Bet placed", gameState });
  gameState = {
    ...gameState,
    totalChips: gameState.totalChips,
    currentBets: {},
  };
});

router.post("/reset", (req: Request, res: Response) => {
  gameState = {
    totalChips: 1000,
    currentBets: {},
  };
  res.status(200).json({ message: "Game reset", gameState });
});

export default router;
