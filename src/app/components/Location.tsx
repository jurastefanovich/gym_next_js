"use client";

import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const Location = () => {
  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", padding: 3 }}>
      {/* Location Info Section */}
      <Paper sx={{ padding: 3, backgroundColor: "#f4f4f4", borderRadius: 2 }}>
        <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
          Our Location
        </Typography>
        <Typography variant="h6" align="center" sx={{ marginBottom: 1 }}>
          123 Fitness St, Workout City, State, 12345
        </Typography>
        <Typography variant="body1" align="center" sx={{ marginBottom: 1 }}>
          <strong>Phone:</strong> +1 (123) 456-7890
        </Typography>
        <Typography variant="body1" align="center" sx={{ marginBottom: 3 }}>
          <strong>Email:</strong> contact@fitgym.com
        </Typography>

        {/* Google Map Section */}
        <Box
          sx={{
            width: "100%",
            height: "400px",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 3,
          }}
        >
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed/v1/place?q=123+Fitness+St,+Workout+City,+State,+12345&key=YOUR_GOOGLE_MAPS_API_KEY"
            allowFullScreen
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Location;
