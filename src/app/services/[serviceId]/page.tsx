"use client";
import { useParams, useRouter } from "next/navigation";
import {
  Grid,
  Stack,
  Typography,
  Container,
  Button,
  Chip,
  Divider,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import { BoxNoMargin } from "@/app/_features/components/Styled";
import { Background } from "@/app/_features/enums/Colors";
import { useGet, useGetNoAuth } from "@/app/hooks/useGet";
import { ServiceDetail } from "@/app/_features/utils/Interfaces";
import { AppointmentApi, ServicesApi } from "@/app/_features/enums/ApiPaths";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { ArrowBack, People } from "@mui/icons-material";
import ServiceMessage from "./components/ServiceMessage";
import { useState } from "react";
import { getAccessToken } from "@/app/_features/utils/LocalStorageHelpers";

interface Appointment {
  id: string;
  date: string;
  numberOfUsers: number;
  maxNumberOfUsers: number;
}

export default function ServicePage() {
  const { serviceId } = useParams();
  const get = useGetNoAuth<ServiceDetail>(ServicesApi.GET_BY_ID + serviceId);
  const isLoggedIn = getAccessToken();
  const getAppointments = useGet<Appointment[]>(
    AppointmentApi.GET_FOR_SERVICE + serviceId
  );
  const service = get.data;
  const route = useRouter();

  // Mock data for appointments - replace with your actual data fetching logic
  const appointments = getAppointments.data ?? [];

  const visibleAppointments = appointments.slice(0, 4);
  const hasMoreAppointments = appointments.length > 4;

  function handleViewDetails(appointmentId: string) {
    route.push("/user_appointments/" + appointmentId);
  }

  return (
    <BoxNoMargin sx={{ pt: 8, pb: 12 }}>
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        {/* Header Section */}
        <Grid container sx={{ mb: 6 }}>
          {/* Left Column - Service Info */}
          <Grid item xs={12} md={11}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <div>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    lineHeight: 1.2,
                    color: "primary.main",
                  }}
                >
                  {service?.title}
                </Typography>

                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  sx={{ mb: 3 }}
                >
                  <Chip
                    icon={<AccessTimeIcon />}
                    label={
                      service?.duration
                        ? `${Math.ceil(service.duration / 60)} min`
                        : "N/A"
                    }
                    variant="outlined"
                    color="primary"
                  />
                </Stack>

                {service && (
                  <ServiceMessage
                    individual={service.individual}
                    needsTrainer={service.needsTrainer}
                  />
                )}
              </div>
            </Stack>
          </Grid>

          {/* Right Column - Back Button */}
          <Grid item xs={12} md={1}>
            <Button
              startIcon={<ArrowBack />}
              variant="text"
              href="/services"
              size="large"
              sx={{ alignSelf: "flex-start" }}
            >
              Back
            </Button>
          </Grid>
        </Grid>

        {/* Description Section */}
        <Stack spacing={4} sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Service Details
          </Typography>
          <Divider />
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.7,
              whiteSpace: "pre-line",
            }}
          >
            {service?.description}
          </Typography>
        </Stack>

        {/* Appointments Section */}
        <Stack spacing={4}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Available Appointments
            </Typography>
            {hasMoreAppointments && isLoggedIn && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button variant="text" size="large">
                  View All Appointments
                </Button>
              </Box>
            )}
          </Stack>
          <Divider />

          {visibleAppointments?.length > 0 && isLoggedIn ? (
            <>
              <Grid container gap={1} justifyContent={"center"}>
                {visibleAppointments.map((appointment) => (
                  <Grid item xs={12} sm={6} md={4} lg={2} key={appointment.id}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2,
                        transition: "box-shadow 0.3s ease",
                        "&:hover": {
                          boxShadow: 3,
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.5,
                          p: 3,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <AccessTimeIcon color="primary" />
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            color="text.primary"
                          >
                            {appointment?.date}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 2,
                          }}
                        >
                          <People fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {`${appointment.numberOfUsers}/${appointment.maxNumberOfUsers} spots filled`}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            width: "100%",
                            height: 8,
                            bgcolor: "divider",
                            borderRadius: 4,
                            overflow: "hidden",
                            mb: 2,
                          }}
                        >
                          <Box
                            sx={{
                              width: `${
                                (appointment.numberOfUsers /
                                  appointment.maxNumberOfUsers) *
                                100
                              }%`,
                              height: "100%",
                              bgcolor:
                                appointment.numberOfUsers ===
                                appointment.maxNumberOfUsers
                                  ? "error.main"
                                  : "primary.main",
                            }}
                          />
                        </Box>

                        <input type="hidden" value={appointment.id} />

                        <Button
                          variant={
                            appointment.numberOfUsers ===
                            appointment.maxNumberOfUsers
                              ? "outlined"
                              : "contained"
                          }
                          fullWidth
                          onClick={() => handleViewDetails(appointment.id)}
                          disabled={
                            appointment.numberOfUsers ===
                            appointment.maxNumberOfUsers
                          }
                          sx={{
                            mt: "auto",
                            fontWeight: 600,
                          }}
                        >
                          {appointment.numberOfUsers ===
                          appointment.maxNumberOfUsers
                            ? "Fully Booked"
                            : "View Details"}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <Typography variant="body1">
              {!isLoggedIn
                ? "You need to create an account or login to view any available appointments"
                : "No available appointments at this time."}
            </Typography>
          )}
        </Stack>
      </Container>
    </BoxNoMargin>
  );
}
