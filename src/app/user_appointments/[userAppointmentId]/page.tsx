"use client";

import { BoxNoMargin } from "@/app/_features/components/Styled";
import { AppointmentApi } from "@/app/_features/enums/ApiPaths";
import { formatDate } from "@/app/_features/utils/DateHelpers";
import { useGet } from "@/app/hooks/useGet";
import { usePostAuth } from "@/app/hooks/usePost";
import {
  ArrowBack,
  Edit,
  FitnessCenter,
  PendingActions,
  People,
  Person,
  Schedule,
  Warning,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

dayjs.extend(customParseFormat);

// Reusable Confirmation Dialog Component
interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  severity?: "error" | "warning" | "info" | "success";
}

export const ConfirmationDialog = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  severity = "warning",
}: ConfirmationDialogProps) => {
  const theme = useTheme();
  const severityColors = {
    error: theme.palette.error.main,
    warning: theme.palette.warning.main,
    info: theme.palette.info.main,
    success: theme.palette.success.main,
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Warning
          fontSize="large"
          sx={{
            color: severityColors[severity],
            mr: 2,
          }}
        />
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onCancel} variant="text" sx={{ minWidth: 100 }}>
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{ minWidth: 100 }}
          autoFocus
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface AppointmentDetails {
  numberOfUsers: string;
  status: string;
  trainerName: string;
  trainerId: string;
  isIndividual: boolean;
  date: string;
  duration: string;
  location?: string;
  notes?: string;
}

const statusColors = {
  confirmed: "success",
  pending: "warning",
  cancelled: "error",
};

const Page = () => {
  const theme = useTheme();
  const router = useRouter();
  const { userAppointmentId } = useParams<{ userAppointmentId: string }>();
  const post = usePostAuth();
  const get = useGet<AppointmentDetails>(
    AppointmentApi.GET_BY_ID + userAppointmentId
  );
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const appointment = get?.data;

  const handleOpenCancelDialog = () => {
    setCancelDialogOpen(true);
  };

  const handleCloseCancelDialog = () => {
    setCancelDialogOpen(false);
  };

  async function handleCancelAppointment() {
    try {
      await post.post(`${AppointmentApi.CANCEL_BY_ID}${userAppointmentId}`);
      handleCloseCancelDialog();
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
    }
  }

  const handleBack = () => {
    router.back();
  };

  if (get.loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={120}
          sx={{ mb: 3 }}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rectangular" width="100%" height={300} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" width="100%" height={200} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (get.error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h5" color="error" gutterBottom>
          Failed to load appointment details
        </Typography>
        <Button
          variant="outlined"
          onClick={handleBack}
          startIcon={<ArrowBack />}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <BoxNoMargin>
      {/* Confirmation Dialog for Cancellation */}
      <ConfirmationDialog
        open={cancelDialogOpen}
        title="Cancel Appointment"
        message={`Are you sure you want to cancel your session with ${
          appointment?.trainerName
        } on ${formatDate(appointment?.date)}?`}
        onConfirm={handleCancelAppointment}
        onCancel={handleCloseCancelDialog}
        confirmText="Yes, Cancel"
        cancelText="No, Keep It"
        severity="warning"
      />

      {/* Header with back button and status */}
      <Container
        sx={{
          backgroundColor: theme.palette.primary.main,
          py: 4,
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h4" color="white" fontWeight={700}>
              Training Session Details
            </Typography>
            <Button
              startIcon={<ArrowBack />}
              sx={{
                color: "white",
                mb: 2,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
              onClick={handleBack}
            >
              Back
            </Button>
          </Stack>

          <Typography variant="subtitle1" color="white" mt={1}>
            {formatDate(appointment?.date)}
          </Typography>
        </Container>
      </Container>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={3}>
          {/* Left Panel - Session Details */}
          <Grid item xs={12} md={8}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  Session Details
                </Typography>

                <Grid container spacing={2} mt={2}>
                  <Grid item xs={12} sm={6}>
                    <DetailItem
                      icon={<PendingActions fontSize="small" />}
                      label="Status"
                      value={appointment?.status || "Main Gym Studio"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DetailItem
                      icon={<FitnessCenter fontSize="small" />}
                      label="Session Type"
                      value={
                        appointment?.isIndividual
                          ? "Individual Training"
                          : "Group Training"
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DetailItem
                      icon={<People fontSize="small" />}
                      label="Participants"
                      value={`${appointment?.numberOfUsers || "N/A"} ${
                        appointment?.isIndividual ? "person" : "people"
                      }`}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DetailItem
                      icon={<Schedule fontSize="small" />}
                      label="Duration"
                      value={
                        appointment?.duration
                          ? `${Math.round(
                              Number(appointment.duration) / 60
                            )} mins`
                          : "N/A"
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DetailItem
                      icon={<Person fontSize="small" />}
                      label="Location"
                      value={appointment?.location || "Iron Path Studio"}
                    />
                  </Grid>
                </Grid>

                {appointment?.notes && (
                  <>
                    <Divider sx={{ my: 3 }} />
                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Additional Notes
                      </Typography>
                      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                        <Typography>{appointment.notes}</Typography>
                      </Paper>
                    </Box>
                  </>
                )}

                <Divider sx={{ my: 4 }} />

                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  <Button
                    variant="contained"
                    startIcon={<Edit />}
                    disabled={
                      appointment?.status?.toLowerCase() === "cancelled"
                    }
                    onClick={() =>
                      router.push(
                        `/user_appointments/edit/${userAppointmentId}`
                      )
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={handleOpenCancelDialog}
                    variant="outlined"
                    color="error"
                    disabled={
                      appointment?.status?.toLowerCase() === "cancelled"
                    }
                  >
                    Cancel Session
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Panel - Trainer Info */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    Your Trainer
                  </Typography>

                  <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                    <Avatar
                      sx={{
                        width: 72,
                        height: 72,
                        bgcolor: theme.palette.primary.main,
                        fontSize: "1.75rem",
                        fontWeight: 600,
                      }}
                    >
                      {appointment?.trainerName?.charAt(0) || "T"}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {appointment?.trainerName || "Trainer Name"}
                      </Typography>
                    </Box>
                  </Stack>

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() =>
                      window.location.assign(
                        `/trainers/${appointment?.trainerId}`
                      )
                    }
                    sx={{ mb: 2 }}
                  >
                    View Full Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Help Card */}
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  backgroundColor: theme.palette.grey[50],
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Need Help?
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Contact our support team for any questions about your
                    session.
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => router.push("/contact")}
                  >
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </BoxNoMargin>
  );
};

const DetailItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <Paper
    variant="outlined"
    sx={{
      p: 2.5,
      borderRadius: 2,
      display: "flex",
      alignItems: "center",
      height: "100%",
      transition: "all 0.2s ease",
      "&:hover": {
        borderColor: "primary.main",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
      },
    }}
  >
    <Avatar
      sx={{
        mr: 2,
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "primary.light",
        borderRadius: "50%",
      }}
    >
      {icon}
    </Avatar>
    <Box></Box>
    <Box>
      <Typography variant="subtitle2" color="text.secondary" fontSize={12}>
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={600}>
        {value || "N/A"}
      </Typography>
    </Box>
  </Paper>
);

export default Page;
