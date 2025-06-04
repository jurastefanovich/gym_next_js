"use client";

import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Background } from "../_features/enums/Colors";

// Dummy progress data
const progressData = [
  { date: "Week 1", weight: 70, reps: 50 },
  { date: "Week 2", weight: 72, reps: 55 },
  { date: "Week 3", weight: 73, reps: 60 },
  { date: "Week 4", weight: 74, reps: 65 },
  { date: "Week 5", weight: 75, reps: 70 },
];

export default function UserStats() {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Progress Overview
      </Typography>

      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={progressData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#8884d8"
              name="Weight (kg)"
            />
            <Line type="monotone" dataKey="reps" stroke="#82ca9d" name="Reps" />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 4, mb: 1 }}>
        Weekly Reps (Bar View)
      </Typography>

      <Box sx={{ height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="reps" fill={Background.PRIMARY} name="Reps" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
}
