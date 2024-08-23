import React, { useState } from "react";
import { Grid } from "@mui/material";
import { CHIP_DATA } from "../constants";

interface BetChipsProps {
  onChipSelect: (value: number) => void;
}

const BetChips: React.FC<BetChipsProps> = ({ onChipSelect }) => {
  const [selectedChip, setSelectedChip] = useState<number | null>(null);

  const handleChipClick = (value: number) => {
    setSelectedChip(value);
    onChipSelect(value);
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      {CHIP_DATA.map((chip) => (
        <Grid item key={chip.value}>
          <div
            style={{
              position: "relative",
              width: "60px",
              height: "60px",
              cursor: "pointer",
              border: selectedChip === chip.value ? "2px solid yellow" : "none",
              borderRadius: "50%",
            }}
            onClick={() => handleChipClick(chip.value)}
          >
            <img
              src={chip.image}
              alt={`Chip ${chip.value}`}
              style={{
                width: "100%",
                height: "100%",
                display: "block",
                borderRadius: "50%",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)",
              }}
            >
              {chip.value}
            </span>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default BetChips;
