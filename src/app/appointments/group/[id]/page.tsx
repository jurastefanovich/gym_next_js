"use client";

import { BoxNoMargin } from "@/app/_features/components/Styled";
import { AppointmentApi } from "@/app/_features/enums/ApiPaths";
import { formatDate } from "@/app/_features/utils/DateHelpers";
import { ParticipantsList } from "@/app/appointments/my-appointments/[id]/component/ParticipantsList";
import { useGet } from "@/app/hooks/useGet";
import { usePostAuth } from "@/app/hooks/usePost";
import {
  ArrowBack,
  Cancel,
  Done,
  Edit,
  FitnessCenter,
  LocationOn,
  Notes,
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
  Chip,
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
  maxNumberOfUsers: number;
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
  active: "primary",
  pending: "warning",
  cancelled: "error",
};

const Page = () => {
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
    try {
      await post.post(`${AppointmentApi.CANCEL_BY_ID}${id}`);
      handleCloseCancelDialog();
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
    }
  }

  const handleBack = () => {
    router.back();
  };

  const handleOnEdit = () => {
    router.push("/appointments/group/edit/" + id);
  };
  const handleFinishAppointment = () => {
    router.push("/appointments/group/finish/" + id);
  };

  if (get.loading) {
    return (
      <BoxNoMargin>
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
      </BoxNoMargin>
    );
  }

  if (get.error) {
    return (
      <BoxNoMargin>
        <Stack spacing={2}>
          <Box>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </Box>
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to load session details
          </Alert>
        </Stack>
      </BoxNoMargin>
    );
  }

  return (
    <BoxNoMargin>
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

      <HeaderSection
        title="Training Session Details"
        date={appointment?.date}
        onBack={handleBack}
      />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Main Content Column */}
          <Grid item xs={12} lg={8}>
            <SessionDetailsCard
              onEdit={handleOnEdit}
              appointment={appointment}
              onCancel={handleOpenCancelDialog}
              onFinish={handleFinishAppointment}
            />
          </Grid>

          {/* Sidebar Column */}
          <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
              <ParticipantsList
                maxParticipants={appointment?.maxNumberOfUsers}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </BoxNoMargin>
  );
};

const HeaderSection = ({
  title,
  date,
  onBack,
}: {
  title: string;
  date?: string;
  onBack: () => void;
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        py: 4,
        position: "relative",
        color: "white",
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h4" fontWeight={700}>
              {title}
            </Typography>
            <Typography variant="subtitle1" mt={1}>
              {date ? formatDate(date) : "Loading date..."}
            </Typography>
          </Box>
          <Button
            startIcon={<ArrowBack />}
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
            onClick={onBack}
          >
            Back
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

const SessionDetailsCard = ({
  appointment,
  onCancel,
  onEdit,
  onFinish,
}: {
  appointment?: AppointmentDetails;
  onCancel: () => void;
  onEdit: () => void;
  onFinish: () => void;
}) => {
  const isCancelled = appointment?.status?.toLowerCase() === "cancelled";

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" fontWeight={700}>
            Session Details
          </Typography>
          {appointment?.status && (
            <Chip
              label={appointment.status}
              color={
                statusColors[
                  appointment.status.toLowerCase() as keyof typeof statusColors
                ] || "default"
              }
              sx={{ textTransform: "capitalize" }}
            />
          )}
        </Stack>

        <Grid container spacing={2} mt={2}>
          <DetailItem
            icon={<FitnessCenter />}
            label="Session Type"
            value={
              appointment?.isIndividual
                ? "Individual Training"
                : "Group Training"
            }
          />

          <DetailItem
            icon={<Schedule />}
            label="Duration"
            value={
              appointment?.duration
                ? `${Math.round(Number(appointment.duration)) / 60} mins`
                : "N/A"
            }
          />

          <DetailItem
            icon={<People />}
            label="Participants"
            value={`${appointment?.numberOfUsers || 0} / ${
              appointment?.maxNumberOfUsers || "N/A"
            }`}
          />

          {appointment?.location && (
            <DetailItem
              icon={<LocationOn />}
              label="Location"
              value={appointment.location}
            />
          )}
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
                <Notes sx={{ verticalAlign: "middle", mr: 1 }} />
                Additional Notes
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                <Typography>{appointment.notes}</Typography>
              </Paper>
            </Box>
          </>
        )}

        <Divider sx={{ my: 4 }} />

        <Stack
          direction="row"
          justifyContent={"space-between"}
          spacing={2}
          flexWrap="wrap"
          useFlexGap
        >
          <Stack
            direction="row"
            justifyContent={"space-between"}
            spacing={2}
            flexWrap="wrap"
            useFlexGap
          >
            <Button
              startIcon={<Edit />}
              onClick={onEdit}
              variant="contained"
              color="secondary"
              disabled={isCancelled}
            >
              Edit
            </Button>
            <Button
              startIcon={<Done />}
              onClick={onFinish}
              variant="contained"
              color="primary"
              disabled={isCancelled}
            >
              Finish
            </Button>
          </Stack>
          <Button
            startIcon={<Cancel />}
            onClick={onCancel}
            variant="outlined"
            color="primary"
            disabled={isCancelled}
          >
            Cancel Session
          </Button>
        </Stack>
      </CardContent>
    </Card>
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
  <Grid item xs={12} sm={6}>
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
          bgcolor: "primary.light",
          width: 40,
          height: 40,
        }}
      >
        {icon}
      </Avatar>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body1" fontWeight={600}>
          {value || "N/A"}
        </Typography>
      </Box>
    </Paper>
  </Grid>
);

export default Page;
