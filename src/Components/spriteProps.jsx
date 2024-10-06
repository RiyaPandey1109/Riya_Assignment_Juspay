import React, { useEffect, useState } from "react";
import "./styles.css";
import { Box } from "@mui/material";

export const Sprites = (props) => {
  const { sprite, sprite2, setSprite, setSprite2, displayAddIcon } = props;

  const spriteProps = [
    {
      id: 0,
      src: require("../Assets/images/cat.png"),
    },
    {
      id: 1,
      src: require("../Assets/images/jerry1.png"),
    },
  ];

  function handleClick(src) {
    console.log("clicked");
    displayAddIcon ? setSprite(src) : setSprite2(src);
  }

  return (
    <Box
      sx={{
        marginLeft: "5%",
        fontFamily: "monospace",
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        alignItems: "center", // Ensure alignment of items in the center
      }}
    >
      {spriteProps.map((item) => (
        <Box
          key={item.id}
          sx={{
            background:
              sprite !== item.src && sprite2 !== item.src ? "white" : "#4d97ff",
            borderRadius: "20px",
            border:
              sprite === item.src || sprite2 === item.src
                ? "2px solid #0d6efd"
                : "2px solid transparent",
            ":hover": {
              backgroundColor: "#4d97ff",
              border: "2px solid #0d6efd",
              cursor: "pointer",
            },
            width: "80px", // Ensure the box is the same size
            height: "80px", // Consistent height
            display: "flex", // Flexbox inside for centering the image
            justifyContent: "center", // Center the image horizontally
            alignItems: "center", // Center the image vertically
          }}
          onClick={() => handleClick(item.src)}
        >
          <img
            src={item.src}
            style={{
              maxHeight: "100%", // Ensure the image scales properly within the box
              maxWidth: "100%",
            }}
            alt="sprite"
          />
        </Box>
      ))}
    </Box>
  );
};

export default Sprites;
