import React from "react";
import { useSelectHook } from "../redux/hooks";
import WinningsDisplay from "./WinningsDisplay";

const WinningsDisplayContainer: React.FC = () => {
  const results = useSelectHook((state) => state.game.results);
  if (!results) return null;
  return <WinningsDisplay results={results} />;
};

export default WinningsDisplayContainer;
