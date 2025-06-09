"use client";

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Card,
  CardContent,
  Divider,
  Container,
  Chip,
  Stack,
  useTheme,
  Button,
  Paper,
} from "@mui/material";
import {
  Person,
  Groups,
  Edit,
  CheckCircle,
  Pending,
  Cancel,
  FitnessCenter,
  People,
  Schedule,
} from "@mui/icons-material";
import { BoxNoMargin } from "@/app/_features/components/Styled";

interface AppointmentDetails {
  numberOfUsers: string;
  status: string;
  trainerName: string;
  trainerId: string;
  isIndividual: boolean;
  date: string;
  duration: string;
  location: string;
}

const Page = () => {
  const theme = useTheme();

  // Sample appointment data
  const appointment: AppointmentDetails = {
    numberOfUsers: "3",
    status: "confirmed",
    trainerName: "John Doe",
    trainerId: "trainer123",
    isIndividual: false,
    date: "Friday, June 10, 2023 at 2:00 PM",
    duration: "60 minutes",
    location: "Main Gym - Station 3",
  };

  const getStatusIcon = () => {
    switch (appointment.status.toLowerCase()) {
      case "confirmed":
        return <CheckCircle sx={{ color: "#fff" }} fontSize="small" />;
      case "pending":
        return <Pending color="warning" fontSize="small" />;
      case "cancelled":
        return <Cancel color="error" fontSize="small" />;
      default:
        return <CheckCircle color="secondary" fontSize="small" />;
    }
  };

  const getStatusChip = () => {
    return (
      <Chip
        label={
          appointment.status.charAt(0).toUpperCase() +
          appointment.status.slice(1)
        }
        size="small"
        sx={{
          borderColor: null,
          color: "white",
          fontWeight: 600,
          textTransform: "capitalize",
        }}
      />
    );
  };

  return (
    <BoxNoMargin>
      {/* Simplified Header */}
      <Box sx={{ backgroundColor: theme.palette.primary.main, py: 4 }}>
        <Container maxWidth="lg">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h4"
              component="h1"
              color="white"
              fontWeight={700}
            >
              Training Session
            </Typography>
            {getStatusChip()}
          </Stack>
          <Typography variant="subtitle1" color="white" mt={1}>
            {appointment.date}
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Primary Content */}
          <Grid item xs={12} md={8}>
            <Card variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Session Details
                </Typography>

                <Grid container spacing={2} mt={1}>
                  <Grid item xs={12} sm={6}>
                    <DetailItem
                      icon={<FitnessCenter fontSize="small" />}
                      label="Type"
                      value={
                        appointment.isIndividual
                          ? "Individual Training"
                          : "Group Training"
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DetailItem
                      icon={<People fontSize="small" />}
                      label="Participants"
                      value={`${appointment.numberOfUsers} ${
                        appointment.isIndividual ? "person" : "people"
                      }`}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DetailItem
                      icon={<Schedule fontSize="small" />}
                      label="Duration"
                      value={appointment.duration}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DetailItem
                      icon={<Person fontSize="small" />}
                      label="Location"
                      value={appointment.location}
                    />
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={() => {
                      /* Handle edit functionality */
                    }}
                  >
                    Edit Appointment
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      /* Handle cancel functionality */
                    }}
                  >
                    Cancel Session
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Trainer Sidebar */}
          {/* Trainer Sidebar */}
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Your Trainer
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      bgcolor: theme.palette.primary.main,
                      fontSize: "1.5rem",
                    }}
                  >
                    {appointment.trainerName.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography fontWeight={600}>
                      {appointment.trainerName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Certified Fitness Trainer
                    </Typography>
                  </Box>
                </Stack>

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() =>
                    window.location.assign(`/trainers/${appointment.trainerId}`)
                  }
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </BoxNoMargin>
  );
};

// Reusable detail item component
const DetailItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <Paper variant="outlined" sx={{ p: 2, height: "100%" }}>
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Box sx={{ color: "primary.main" }}>{icon}</Box>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body1" fontWeight={500}>
          {value}
        </Typography>
      </Box>
    </Stack>
  </Paper>
);

export default Page;
