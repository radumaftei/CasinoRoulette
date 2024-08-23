import React from "react";
import rouletteOuter from "../assets/roulette_1.png";
import rouletteInner from "../assets/roulette_2.png";
import rouletteMiddle from "../assets/roulette_3.png";

const RouletteWheel: React.FC = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "300px",
        height: "300px",
        margin: "auto",
      }}
    >
      <img
        src={rouletteOuter}
        alt="Roulette Outer"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />
      <img
        src={rouletteInner}
        alt="Roulette Inner"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 2,
        }}
      />
      <img
        src={rouletteMiddle}
        alt="Roulette Middle"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 3,
        }}
      />
    </div>
  );
};

export default RouletteWheel;
