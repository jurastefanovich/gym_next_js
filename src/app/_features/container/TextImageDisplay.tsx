import { Box, Typography } from "@mui/material";
import React, { Fragment } from "react";
import { ContainerProps } from "../utils/Interfaces";

const TextImageDisplay: React.FC<ContainerProps> = ({
  img,
  title,
  textAlign,
  body,
}) => {
  return (
    <Fragment>
      <Box minHeight={"50vh"}>
        <Typography>{title}</Typography>
      </Box>
    </Fragment>
  );
};

export default TextImageDisplay;
