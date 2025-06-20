"use client";

import { BoxNoMargin } from "@/app/_features/components/Styled";
import { AppointmentApi } from "@/app/_features/enums/ApiPaths";
import { GENERAL, USER_ROUTES } from "@/app/_features/enums/Routes";
import { formatDate } from "@/app/_features/utils/DateHelpers";
import { DetailItem } from "@/app/appointments/group/[id]/page";
import { useGet } from "@/app/hooks/useGet";
import { usePostAuth } from "@/app/hooks/usePost";
import {
  Add,
  ArrowBack,
  ErrorOutline,
  FitnessCenter,
  People,
  Schedule,
  Warning,
} from "@mui/icons-material";
import {
  Alert,
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
  numberOfUsers: number;
  status: string;
  serviceTitle: string;
  trainerName: string;
  serviceId: number;
  trainerId: string;
  isIndividual: boolean;
  date: string;
  duration: string;
  location?: string;
  notes?: string;
  included?: boolean;
  maxNumberOfUsers: number;
}

const Page = () => {
  const theme = useTheme();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const post = usePostAuth();
  const get = useGet<AppointmentDetails>(AppointmentApi.GET_BY_ID + id);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const appointment = get?.data;

  const handleOpenCancelDialog = () => {
    setCancelDialogOpen(true);
  };

  const handleCloseCancelDialog = () => {
    setCancelDialogOpen(false);
  };

  async function handleCancelAppointment() {
    await post.post(`${AppointmentApi.LEAVE_SESSION}${id}`);
    handleCloseCancelDialog();
    get.refetch();
  }
  const isFull =
    Number(get.data?.numberOfUsers) >= Number(get.data?.maxNumberOfUsers);
  async function handleJoin() {
    if (isFull) {
      return;
    }
    await post.post(`${AppointmentApi.JOIN_SESSION}${id}`);
    get.refetch();
  }

  const handleBack = () => {
    router.back();
  };

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
        title="Leave Session"
        message={`Are you sure you want to leave your session with ${
          appointment?.trainerName
        } on ${formatDate(appointment?.date)}?`}
        onConfirm={handleCancelAppointment}
        onCancel={handleCloseCancelDialog}
        confirmText="Yes, Leave"
        cancelText="No, Stay"
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
                  <DetailItem
                    icon={<FitnessCenter />}
                    label="Service"
                    link={`${USER_ROUTES.SERVICES}/${appointment?.serviceId}`}
                    value={
                      appointment?.serviceTitle
                        ? appointment?.serviceTitle
                        : "N/A"
                    }
                  />
                  <DetailItem
                    icon={<FitnessCenter fontSize="small" />}
                    label="Session Type"
                    value={
                      appointment?.isIndividual
                        ? "Individual Training"
                        : "Group Training"
                    }
                  />
                  <DetailItem
                    icon={<People fontSize="small" />}
                    label="Participants"
                    value={`${
                      `${String(appointment?.numberOfUsers)} / ${String(
                        appointment?.maxNumberOfUsers
                      )}` || "N/A"
                    } ${appointment?.isIndividual ? "person" : "people"}`}
                  />
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
                {isFull ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      p: 1.5,
                      mb: 2,
                      borderRadius: 1,
                      backgroundColor: (theme) =>
                        theme.palette.error.light + "20", // 20% opacity
                      border: "1px solid",
                      borderColor: "error.main",
                    }}
                  >
                    <ErrorOutline color="error" sx={{ fontSize: 20 }} />
                    <Typography
                      variant="body2"
                      color="error"
                      sx={{ fontWeight: 500 }}
                    >
                      This session is fully booked. Please choose another time
                      slot.
                    </Typography>
                  </Box>
                ) : (
                  <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                    {appointment?.included ? (
                      <Button
                        onClick={() => handleOpenCancelDialog()}
                        variant="outlined"
                        color="error"
                        disabled={
                          appointment?.status?.toLowerCase() === "cancelled"
                        }
                      >
                        Leave Session
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        endIcon={<Add />}
                        disabled={
                          appointment?.status?.toLowerCase() === "cancelled"
                        }
                        onClick={() => handleJoin()}
                      >
                        Join
                      </Button>
                    )}
                  </Stack>
                )}
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
                    onClick={() => router.push(GENERAL.CONTACT)}
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

export default Page;
