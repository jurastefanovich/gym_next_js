"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Stack,
  Box,
  Chip,
  Skeleton,
  Paper,
  Divider,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { BoxNoMargin } from "../_features/components/Styled";
import { useGet } from "../hooks/useGet";
import { AppointmentApi } from "../_features/enums/ApiPaths";
import CreateAppointmentButton from "./components/CreateAppointmentButton";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HistoryIcon from "@mui/icons-material/History";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useRouter } from "next/navigation";
import { USER_ROUTES } from "../_features/enums/Routes";

type AppointmentDTO = {
  id: number;
  status: string;
  date: string; // "dd/MM/yyyy, HH:mm"
  serviceTitle: string;
  trainerName: string;
};

const statusColors = {
  PENDING: "warning",
  CONFIRMED: "success",
  CANCELLED: "error",
  DONE: "info",
} as const;

export default function Page() {
  const theme = useTheme();
  const router = useRouter();
  const get = useGet<AppointmentDTO[]>(AppointmentApi.GET_ALL);
  const [tab, setTab] = useState(0);
  const now = dayjs();
  console.log(get);
  const isLoading = get.loading;
  const appointments: AppointmentDTO[] = get.data ?? [];
  const upcomingAppointments = appointments?.filter((app) => {
    const parsed = dayjs(app.date, "DD/MM/YYYY, HH:mm");
    return (
      parsed.isValid() &&
      parsed.isAfter(now) &&
      app.status?.toUpperCase() !== "CANCELLED"
    );
  });

  const pastAppointments = appointments?.filter(
    (app) =>
      dayjs(app.date).isBefore(now) ||
      String(app.status).toUpperCase() === "CANCELLED" ||
      String(app.status).toUpperCase() === "DONE"
  );

  const completedAppointments = appointments?.filter(
    (app) => String(app.status).toUpperCase() === "DONE"
  );

  const handleCardClick = (appointmentId: number) => {
    router.push(`${USER_ROUTES.APPOINTMENTS}${appointmentId}`);
  };

  const renderAppointmentCard = (appointment: AppointmentDTO) => (
    <Card
      key={appointment.id}
      variant="outlined"
      sx={{
        mb: 2,
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: theme.shadows[2],
          cursor: "pointer",
        },
      }}
      onClick={() => handleCardClick(appointment.id)}
    >
      <CardContent>
        <Stack spacing={1.5}>
          <Typography variant="h6" fontWeight={600}>
            {appointment.serviceTitle}
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              <strong>Date:</strong> {appointment.date}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Trainer:</strong> {appointment.trainerName}
            </Typography>
          </Stack>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Chip
              label={appointment.status}
              color={
                statusColors[appointment.status as keyof typeof statusColors] ||
                "default"
              }
              size="small"
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );

  const renderEmptyState = () => (
    <Paper
      variant="outlined"
      sx={{
        p: 4,
        textAlign: "center",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Stack spacing={3} alignItems="center">
        <CalendarTodayIcon sx={{ fontSize: 60, color: "text.disabled" }} />
        <Typography variant="h6" color="text.secondary">
          You don't have any appointments yet
        </Typography>
      </Stack>
    </Paper>
  );

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <Stack spacing={2}>
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={120} />
          ))}
        </Stack>
      );
    }

    if (appointments.length === 0) {
      return renderEmptyState();
    }

    switch (tab) {
      case 0:
        return upcomingAppointments.length > 0 ? (
          upcomingAppointments.map(renderAppointmentCard)
        ) : (
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            py={4}
          >
            No upcoming appointments scheduled
          </Typography>
        );
      case 1:
        return pastAppointments.length > 0 ? (
          pastAppointments.map(renderAppointmentCard)
        ) : (
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            py={4}
          >
            No past appointments found
          </Typography>
        );
      case 2:
        return completedAppointments.length > 0 ? (
          completedAppointments.map(renderAppointmentCard)
        ) : (
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            py={4}
          >
            No completed appointments yet
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <BoxNoMargin>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Stack spacing={4}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              My Appointments
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your training sessions and view appointment history
            </Typography>
          </Box>

          {appointments.length > 0 && (
            <Paper elevation={0} sx={{ borderRadius: 2 }}>
              <Tabs
                value={tab}
                onChange={(_, newValue) => setTab(newValue)}
                variant="fullWidth"
                sx={{
                  "& .MuiTabs-indicator": {
                    height: 3,
                  },
                }}
              >
                <Tab
                  icon={<CalendarTodayIcon fontSize="small" />}
                  iconPosition="start"
                  label="Upcoming"
                  sx={{ py: 2 }}
                />
                <Tab
                  icon={<HistoryIcon fontSize="small" />}
                  iconPosition="start"
                  label="History"
                  sx={{ py: 2 }}
                />
                <Tab
                  icon={<DoneAllIcon fontSize="small" />}
                  iconPosition="start"
                  label="Completed"
                  sx={{ py: 2 }}
                />
              </Tabs>
            </Paper>
          )}

          <Box sx={{ minHeight: 300 }}>{renderTabContent()}</Box>
        </Stack>
      </Container>
    </BoxNoMargin>
  );
}
