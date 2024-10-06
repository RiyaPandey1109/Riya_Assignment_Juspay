import React from "react";
import "./styles.css";
import { Box, Tabs, Tab } from "@mui/material";
import { styled } from "@mui/system";

const blue = {
  50: "#F0F7FF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
};
const tabs = ["small", "medium", "large"];

const CustomTab = styled(Tab)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 70%;
  padding: 5px 5px;
  margin: 2px 2px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
  }

  &.Mui-selected {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.Mui-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Resize = (props) => {
  const { setSize, size } = props;

  return (
    <Box
      className="spriteContainer"
      sx={{
        padding: "10px",
        flexGrow: 1,
        fontFamily: "monospace",
        height: "80px",
        maxWidth: "350px",
        background: "white",
        borderRadius: "20px",
      }}
    >
      <span
        style={{ color: "grey", fontFamily: "monospace", fontSize: "13px" }}
      >
        Resize
      </span>
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          flexDirection: "row",
          columnGap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tabs
          value={tabs.indexOf(size)}
          onChange={(e, newValue) => setSize(tabs[newValue])}
        >
          {tabs.map((item, index) => (
            <CustomTab label={item} key={index} />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};

export default Resize;
