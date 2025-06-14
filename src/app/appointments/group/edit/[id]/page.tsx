"use client";

import { BoxNoMargin } from "@/app/_features/components/Styled";
import {
  AppointmentApi,
  ServicesApi,
  TrainerApi,
} from "@/app/_features/enums/ApiPaths";
import { useGet } from "@/app/hooks/useGet";
import { usePut } from "@/app/hooks/usePut";
import {
  ArrowBack,
  CalendarToday,
  CheckCircle,
  Error as ErrorIcon,
  FitnessCenter,
  Person,
  Schedule,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ServiceOption, TrainerDto } from "../../new/page";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

dayjs.extend(customParseFormat);

interface AppointmentDetails {
  id: string;
  clientName: string;
  serviceId: string;
  trainerId: string;
  status: string;
  date: string; // ISO string
}

const Page = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const {
    data: appointment,
    loading: loadingApp,
    error: errorApp,
  } = useGet<AppointmentDetails>(AppointmentApi.GET_BY_ID + id);
  const {
    data: services,
    loading: loadingServices,
    error: errorServices,
  } = useGet<ServiceOption[]>(ServicesApi.GET_ALL_GROUP);
  const {
    data: trainers,
    loading: loadingTrainers,
    error: errorTrainers,
  } = useGet<TrainerDto[]>(TrainerApi.GET_ALL);

  const put = usePut();
  const parsedDate = dayjs(appointment?.date, "DD/MM/YYYY, HH:mm");
  const loading = loadingApp || loadingServices || loadingTrainers;
  const error = errorApp || errorServices || errorTrainers;

  const [formData, setFormData] = useState({
    dateTime: dayjs(), // initialize with tomorrow
    serviceId: "",
    trainerId: "",
  });

  useEffect(() => {
    if (appointment && services && trainers) {
      const dateObj = dayjs(appointment.date);

      setFormData({
        dateTime: dateObj,
        serviceId: appointment?.serviceId || services[0]?.id || "",
        trainerId: appointment?.trainerId || trainers[0]?.id || "",
        notes: appointment.status, //CHANGE THIS TO NOTES
      });
    }
  }, [appointment, services, trainers]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await put.put(AppointmentApi.UPDATE_BY_ID + id, {
        dateTime: formData.dateTime.toISOString(),
        serviceId: formData.serviceId,
        trainerId: formData.trainerId,
        notes: formData.notes,
      });

      setSuccess(true);
      setTimeout(() => router.push(`/appointments/${id}`), 1500);
    } catch (err) {
      console.error("Error updating appointment", err);
    }
  };

  const getStatusChip = () => {
    if (!appointment?.status) return null;
    const status = appointment.status.toLowerCase();
    const icons: any = {
      confirmed: <CheckCircle />,
      pending: <Schedule />,
    };
    return (
      <Chip
        label={status.charAt(0).toUpperCase() + status.slice(1)}
        size="small"
        sx={{
          color: "white",
          fontWeight: 600,
          textTransform: "capitalize",
          borderRadius: 1,
          px: 1,
        }}
        icon={icons[status] || <ErrorIcon />}
      />
    );
  };

  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !appointment) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load session details
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => router.back()}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <BoxNoMargin>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button startIcon={<ArrowBack />} onClick={() => router.back()}>
          Back
        </Button>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Edit Session
        </Typography>
        <Typography color="text.secondary">
          Update details of your scheduled session
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Summary */}
        <Grid item xs={12} md={5}>
          <Card sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Session Summary
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <DetailItem
                  icon={<CalendarToday color="primary" />}
                  label="Original Date"
                  value={parsedDate.format("MMM D, YYYY")}
                />
                <DetailItem
                  icon={<Schedule color="primary" />}
                  label="Original Time"
                  value={parsedDate.format("h:mm A")}
                />
                <DetailItem
                  icon={<FitnessCenter color="primary" />}
                  label="Service Type"
                  value={
                    services?.find((s) => s.id === appointment.serviceId)
                      ?.title || "N/A"
                  }
                />
                <DetailItem
                  icon={<Person color="primary" />}
                  label="Original Trainer"
                  value={
                    trainers?.find(
                      (t) => Number(t?.id) === Number(appointment?.trainerId)
                    )?.firstName || "N/A"
                  }
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Edit Form */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            {success ? (
              <Box textAlign="center" py={4}>
                <CheckCircle color="success" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h5" fontWeight={600}>
                  Session Updated!
                </Typography>
                <Typography color="text.secondary">
                  Your changes have been saved successfully.
                </Typography>
              </Box>
            ) : (
              <>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Edit Session Details
                </Typography>
                <Typography color="text.secondary" mb={3}>
                  Update your session date, time, and service details
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          label="Start Time"
                          value={formData.dateTime}
                          onChange={(newValue) => {
                            if (newValue) {
                              setFormData((prev) => ({
                                ...prev,
                                dateTime: newValue,
                              }));
                            }
                          }}
                          disablePast
                          minDateTime={dayjs().add(1, "day")}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        label="Service"
                        name="serviceId"
                        fullWidth
                        value={formData.serviceId}
                        onChange={handleChange}
                        required
                      >
                        {services?.map((s) => (
                          <MenuItem key={s.id} value={s.id}>
                            {s.title}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        label="Trainer"
                        name="trainerId"
                        fullWidth
                        value={formData.trainerId}
                        onChange={handleChange}
                        required
                      >
                        {trainers?.map((t) => (
                          <MenuItem key={t.id} value={t.id}>
                            {t.firstName}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Notes"
                        multiline
                        rows={5}
                        name="notes"
                        fullWidth
                        value={formData.notes}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                  <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
                    <Button
                      onClick={() => router.back()}
                      disabled={put.loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={put.loading}
                      startIcon={
                        put.loading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : undefined
                      }
                    >
                      {put.loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </Box>
                </form>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
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
  <Grid item xs={12} sm={6}>
    <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
      <Box sx={{ mr: 1.5, color: "primary.main" }}>{icon}</Box>
      <Box>
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body1" fontWeight={500}>
          {value || "N/A"}
        </Typography>
      </Box>
    </Box>
  </Grid>
);

export default Page;
