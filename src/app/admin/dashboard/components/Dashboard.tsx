"use client";
import { GymApi } from "@/app/_features/enums/ApiPaths";
import { useGet } from "@/app/hooks/useGet";
import {
  Box,
  Card,
  CircularProgress,
  Grid,
  LinearProgress,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
export const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
  textAlign: "center",
}));

// Styled components
export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

export default function Dashboard() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Stats />
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <GraphMembership />
        </Grid>
        <Grid item xs={12} md={6}>
          <GraphWeekly />
        </Grid>
      </Grid>
    </>
  );
}

function GraphMembership() {
  const membership = useGet(GymApi.MEMBERSHIP);

  if (membership.loading) {
    return <CircularProgress />;
  }

  const rawData = membership.data || {};
  const formattedMembership = Object.entries(rawData).map(([day, count]) => ({
    name: day,
    value: count,
  }));

  return (
    <StyledPaper>
      <Typography variant="h6" gutterBottom>
        Membership Growth
      </Typography>
      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedMembership}>
            <XAxis dataKey="name" />
            <YAxis />
            {/* <Tooltip /> */}
            <Line type="monotone" dataKey="value" stroke="#c1121f" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </StyledPaper>
  );
}

function GraphWeekly() {
  const weekly = useGet(GymApi.WEEKLY);

  if (weekly.loading) {
    return <CircularProgress />;
  }

  const rawData = weekly.data || {};
  const formattedWeekly = Object.entries(rawData).map(([month, count]) => ({
    name: month,
    value: count,
  }));

  return (
    <StyledPaper>
      <Typography variant="h6" gutterBottom>
        Weekly Attendance
      </Typography>
      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedWeekly}>
            <XAxis dataKey="name" />
            <YAxis />
            {/* <Tooltip /> */}
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="value" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </StyledPaper>
  );
}

function Stats() {
  const stats = useGet(GymApi.DASH_STATS);
  const data = stats.data;
  if (stats.loading) {
    return <LinearProgress />;
  }
  const md = 4;
  const xs = 12;
  const sm = 6;
  return (
    <>
      <Grid item xs={xs} sm={sm} md={md}>
        <StyledCard>
          <Typography color="textSecondary" gutterBottom>
            Total Active Members
          </Typography>
          <Typography variant="h4">{data?.memebrs}</Typography>
        </StyledCard>
      </Grid>
      <Grid item xs={xs} sm={sm} md={md}>
        <StyledCard>
          <Typography color="textSecondary" gutterBottom>
            Active Sessions Today
          </Typography>
          <Typography variant="h4">{data?.active_appointments}</Typography>
        </StyledCard>
      </Grid>
      <Grid item xs={xs} sm={sm} md={md}>
        <StyledCard>
          <Typography color="textSecondary" gutterBottom>
            New Members This Month
          </Typography>
          <Typography variant="h4">{data?.new_this_month}</Typography>
        </StyledCard>
      </Grid>
    </>
  );
}
