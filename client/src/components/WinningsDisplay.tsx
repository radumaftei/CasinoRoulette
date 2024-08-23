import React from "react";
import { Box, Paper, List, ListItem, ListItemText } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import { SpinResult } from "../models/results";

interface WinningsDisplayProps {
  results: SpinResult[];
}

const WinningsDisplay: React.FC<WinningsDisplayProps> = ({ results }) => {
  if (results.length === 0) return null;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginY={4}
      paddingX={2}
      width="100%"
    >
      <div
        style={{
          marginBottom: "20px",
          color: "#1A202C",
          fontWeight: 600,
          fontSize: "24px",
        }}
      >
        Results History
      </div>
      <List style={{ width: "100%", maxWidth: "700px" }}>
        {results.map((result, index) => (
          <ListItem
            key={index}
            component={Paper}
            elevation={3}
            style={{
              marginBottom: "20px",
              padding: "20px",
              borderRadius: "12px",
              backgroundColor: "#f7fafc",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CasinoIcon
              style={{
                fontSize: "36px",
                color: "#4A5568",
                marginRight: "16px",
              }}
            />
            <ListItemText
              primary={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      color: "#2D3748",
                      fontWeight: 700,
                      fontSize: "18px",
                    }}
                  >
                    Spin {index + 1}: Winning Number: {result.winningNumber}
                  </div>
                  <span
                    style={{
                      color: result.playerWinnings > 0 ? "#38A169" : "#E53E3E",
                      fontWeight: 700,
                      fontSize: "14px",
                    }}
                  >
                    {result.playerWinnings > 0 ? "WIN" : "LOSE"}
                  </span>
                </div>
              }
              secondary={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "8px",
                  }}
                >
                  <span style={{ color: "#718096", fontSize: "14px" }}>
                    Player Winnings: {result.playerWinnings}
                  </span>
                  <span style={{ color: "#718096", fontSize: "14px" }}>
                    Dealer Winnings: {result.dealerWinnings}
                  </span>
                </div>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default WinningsDisplay;
