"use client";

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
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  CalendarToday,
  Schedule,
  FitnessCenter,
  Person,
  CheckCircle,
  ArrowBack,
  Error as ErrorIcon,
} from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGet } from "@/app/hooks/useGet";
import { usePut } from "@/app/hooks/usePut";
import {
  AppointmentApi,
  ServicesApi,
  TrainerApi,
} from "@/app/_features/enums/ApiPaths";
import { BoxNoMargin } from "@/app/_features/components/Styled";
import { ServiceOption, TrainerDto } from "../../new/page";

dayjs.extend(customParseFormat);

interface AppointmentDetails {
  id: string;
  clientName: string;
  serviceId: string;
  trainerId: string;
  status: string;
  date: string;
  notes: string;
}

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const put = usePut();

  const {
    data: appointment,
    loading: loadingApp,
    error: errorApp,
    refetch: refetchApp,
  } = useGet<AppointmentDetails>(AppointmentApi.GET_BY_ID + id);
  const {
    data: services,
    loading: loadingServices,
    error: errorServices,
    refetch: refetchService,
  } = useGet<ServiceOption[]>(ServicesApi.GET_ALL_GROUP);
  const {
    data: trainers,
    loading: loadingTrainers,
    error: errorTrainers,
    refetch: refetchTrainer,
  } = useGet<TrainerDto[]>(TrainerApi.GET_ALL);

  const loading = loadingApp || loadingServices || loadingTrainers;
  const error = errorApp || errorServices || errorTrainers;
  const parsedDate = dayjs(appointment?.date, "DD/MM/YYYY, HH:mm");
  const [formData, setFormData] = useState<{
    date: Dayjs | null;
    time: Dayjs | null;
    serviceId: string;
    trainerId: string;
    notes: string;
  }>({
    date: null,
    time: null,
    serviceId: "",
    trainerId: "",
    notes: "",
  });

  useEffect(() => {
    if (appointment && services && trainers) {
      setFormData({
        date: parsedDate,
        time: parsedDate,
        serviceId: appointment.serviceId || services[0]?.id || "",
        trainerId: appointment.trainerId || "",
        notes: appointment?.notes || "",
      });
    }
  }, [appointment, services, trainers]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.time) return;

    const combined = formData.date
      .hour(formData.time.hour())
      .minute(formData.time.minute());
    const res = await put.put(AppointmentApi.UPDATE_BY_ID + id, {
      dateTime: combined.toISOString(),
      serviceId: formData.serviceId,
      trainerId: formData.trainerId,
      notes: formData.notes,
    });

    if (res) {
      refetchApp();
      refetchService();
      refetchTrainer();
    }
  };

  if (loading) {
    return (
      <BoxNoMargin>
        <Stack height={"100vh"} alignItems={"center"} justifyContent={"center"}>
          <CircularProgress />
        </Stack>
      </BoxNoMargin>
    );
  }

  if (error || !appointment) {
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
              <form onSubmit={handleSubmit}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Edit Session Details
                </Typography>
                <Typography color="text.secondary" mb={3}>
                  Update your session date, time, and service details
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        label="Date"
                        value={formData.date}
                        onChange={(newDate) =>
                          setFormData((prev) => ({ ...prev, date: newDate }))
                        }
                        disablePast
                        slotProps={{
                          textField: { fullWidth: true },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TimePicker
                        label="Time"
                        value={formData.time}
                        onChange={(newTime) =>
                          setFormData((prev) => ({ ...prev, time: newTime }))
                        }
                        slotProps={{
                          textField: { fullWidth: true },
                        }}
                      />
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
                </LocalizationProvider>
                <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
                  <Button onClick={() => router.back()} disabled={put.loading}>
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
      <Box sx={{ mr: 1.5 }}>{icon}</Box>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography fontWeight={600}>{value}</Typography>
      </Box>
    </Box>
  </Grid>
);

export default Page;
