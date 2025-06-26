import { Box, Card, Grid, Paper, styled, Typography } from "@mui/material";
import React from "react";
import {
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Schedule as ScheduleIcon,
  People as PeopleIcon,
  FitnessCenter as FitnessCenterIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  ShowChart as LineChartIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
} from "@mui/icons-material";
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
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <Typography color="textSecondary" gutterBottom>
              Total Active Members
            </Typography>
            <Typography variant="h4">210</Typography>
            <Typography color="success.main">+15% from last month</Typography>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <Typography color="textSecondary" gutterBottom>
              Active Sessions Today
            </Typography>
            <Typography variant="h4">8</Typography>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <Typography color="textSecondary" gutterBottom>
              New Members This Month
            </Typography>
            <Typography variant="h4">30</Typography>
          </StyledCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <Typography color="textSecondary" gutterBottom>
              Average Session Attendance
            </Typography>
            <Typography variant="h4">52%</Typography>
          </StyledCard>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Membership Growth
            </Typography>
            <Box
              sx={{
                height: 300,
                bgcolor: "action.hover",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LineChartIcon sx={{ fontSize: 100, opacity: 0.3 }} />
              <Typography>Chart would display here</Typography>
            </Box>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Weekly Attendance
            </Typography>
            <Box
              sx={{
                height: 300,
                bgcolor: "action.hover",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BarChartIcon sx={{ fontSize: 100, opacity: 0.3 }} />
              <Typography>Chart would display here</Typography>
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </>
  );
}
