import { Box, CircularProgress } from "@mui/material";
import React from "react";

function Loader() {
  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "650px",
      }}
    >
      <CircularProgress
        size={70}
        sx={{
          position: "absolute",
          color: "green",
        }}
      />
    </Box>
  );
}

export default Loader;
