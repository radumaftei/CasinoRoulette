import { Typography } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import BettingBoard from "./components/BettingBoard";
import RouletteWheel from "./components/RouletteWheel";
import WinningsDisplayContainer from "./components/WinningDisplayContainer";
import store from "./redux/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div
        style={{
          background: "#3d8946",
          backgroundImage: `url(${require("./assets/felt.png")})`,
          backgroundSize: "cover",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <Typography align="center" variant="h4" gutterBottom>
          Casino Roulette Game
        </Typography>
        <RouletteWheel />
        <BettingBoard />

        <WinningsDisplayContainer />
      </div>
    </Provider>
  );
};

export default App;
