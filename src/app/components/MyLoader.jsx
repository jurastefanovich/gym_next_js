import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

export default function MyLoader() {
  return (
    <Backdrop sx={{ zIndex: 99, bgcolor: "black" }} open>
      <CircularProgress color="primary" />
    </Backdrop>
  );
}
