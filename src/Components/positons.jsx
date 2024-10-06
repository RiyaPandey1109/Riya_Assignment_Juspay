import React, { forwardRef } from "react";
import "./styles.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export const Positions = (props) => {
  const { handleMove, refresh } = props;
  const [xInput, setXInput] = React.useState("");
  const [yInput, setYInput] = React.useState("");

  const handleClick = () => {
    handleMove(xInput, yInput, false, 0, true);
  };

  function clear() {
    setXInput("");
    setYInput("");
    refresh();
  }
  return (
    <Box
      className="spriteContainer"
      sx={{
        padding: "15px",
        fontFamily: "monospace",
        borderRadius: "20px",
        borderColor: "red",
      }}
    >
      <Box
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "row",
          columnGap: "20px",
        }}
      >
        <TextField
          id="outlined-name"
          label="x-value"
          value={xInput}
          onChange={(e) => setXInput(e.target.value)}
          size="small"
          sx={{
            width: "100px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "red",
              },
              "&:hover fieldset": {
                borderColor: "red",
              },
              "&.Mui-focused fieldset": {
                borderColor: "red",
              },
            },
          }}
        />
        <TextField
          id="outlined-name"
          label="y-value"
          value={yInput}
          onChange={(e) => setYInput(e.target.value)}
          size="small"
          sx={{
            width: "100px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "red",
              },
              "&:hover fieldset": {
                borderColor: "red",
              },
              "&.Mui-focused fieldset": {
                borderColor: "red",
              },
            },
          }}
        />
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleClick}
        >
          Transition
        </Button>
      </Box>
    </Box>
  );
};

export default Positions;
