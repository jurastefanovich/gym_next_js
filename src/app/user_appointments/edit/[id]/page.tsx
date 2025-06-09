"use client";

import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
  useTheme,
  Avatar,
  Skeleton,
  Alert,
  CircularProgress,
  CardContent,
} from "@mui/material";
import { BoxNoMargin } from "@/app/_features/components/Styled";
import { AppointmentApi } from "@/app/_features/enums/ApiPaths";
import { useGet } from "@/app/hooks/useGet";
import { usePostAuth } from "@/app/hooks/usePost";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  ArrowBack,
  CalendarToday,
  Schedule,
  FitnessCenter,
  Person,
  CheckCircle,
  Error,
} from "@mui/icons-material";

// Dummy data
const dummyServices = [
  {
    id: "1",
    name: "Massage Therapy",
    description: "Relaxation and therapeutic massage sessions",
  },
  {
    id: "2",
    name: "Personal Training",
    description: "One-on-one fitness coaching",
  },
];

const dummyTrainers = {
  "1": [
    { id: "101", name: "Anna Therapist", specialty: "Deep Tissue, Swedish" },
    { id: "102", name: "Ben Healer", specialty: "Sports, Reflexology" },
  ],
  "2": [
    { id: "201", name: "Tom Trainer", specialty: "Strength, Conditioning" },
    { id: "202", name: "Sarah Strength", specialty: "HIIT, Functional" },
  ],
};

const statusColors = {
  confirmed: "success",
  pending: "warning",
  cancelled: "error",
};

const EditAppointmentPage = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const {
    data: appointment,
    loading,
    error,
  } = useGet(AppointmentApi.GET_BY_ID + id);
  const post = usePostAuth();

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    serviceId: "",
    trainerId: "",
  });

  useEffect(() => {
    if (appointment) {
      const dateObj = dayjs(appointment.date);
      setFormData({
        date: dateObj.format("YYYY-MM-DD"),
        time: dateObj.format("HH:mm"),
        serviceId: appointment.serviceId || "1",
        trainerId: appointment.trainerId || dummyTrainers["1"]?.[0]?.id || "",
      });
    }
  }, [appointment]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "serviceId") {
      const newTrainers = dummyTrainers["1"];
      setFormData((prev) => ({
        ...prev,
        serviceId: value,
        trainerId: newTrainers?.[0]?.id || "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { date, time, serviceId, trainerId } = formData;

    try {
      await post.post(AppointmentApi.UPDATE_BY_ID + id, {
        dateTime: `${date}T${time}`,
        serviceId,
        trainerId,
      });
      setSuccess(true);
      setTimeout(() => router.push(`/appointments/${id}`), 1500);
    } catch (err) {
      console.error("Error updating appointment", err);
    }
  };

  const getStatusChip = () => {
    if (!appointment?.status) return null;

    return (
      <Chip
        label={
          appointment.status.charAt(0).toUpperCase() +
          appointment.status.slice(1).toLowerCase()
        }
        size="small"
        sx={{
          color: "white",
          fontWeight: 600,
          textTransform: "capitalize",
          borderRadius: 1,
          px: 1,
        }}
        icon={
          appointment.status.toLowerCase() === "confirmed" ? (
            <CheckCircle fontSize="small" />
          ) : appointment.status.toLowerCase() === "pending" ? (
            <Schedule fontSize="small" />
          ) : (
            <Error fontSize="small" />
          )
        }
      />
    );
  };

  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        <Skeleton variant="rectangular" width="100%" height={400} />
      </Box>
    );
  }

  if (error || !appointment) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load appointment details
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
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => router.back()}
          sx={{ mb: 2 }}
        >
          Back to Appointment
        </Button>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Edit Appointment
        </Typography>
        <Typography color="text.secondary">
          Update the details of your scheduled session
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Client Summary Card */}
        <Grid item xs={12} md={5}>
          <Card sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Appointment Summary
              </Typography>

              <Box display="flex" alignItems="center" mb={3}>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: theme.palette.primary.main,
                    mr: 2,
                    fontSize: "1.5rem",
                  }}
                >
                  {appointment.clientName?.charAt(0) || "C"}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {appointment.clientName || "Client Name"}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    {getStatusChip()}
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <DetailItem
                    icon={<CalendarToday color="primary" />}
                    label="Original Date"
                    value={dayjs(appointment.date).format("MMM D, YYYY")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DetailItem
                    icon={<Schedule color="primary" />}
                    label="Original Time"
                    value={dayjs(appointment.date).format("h:mm A")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DetailItem
                    icon={<FitnessCenter color="primary" />}
                    label="Service Type"
                    value={
                      dummyServices.find((s) => s.id === appointment.serviceId)
                        ?.name || "N/A"
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <DetailItem
                    icon={<Person color="primary" />}
                    label="Original Trainer"
                    value={
                      dummyTrainers["1"]?.find(
                        (t) => t.id === appointment.trainerId
                      )?.name || "N/A"
                    }
                  />
                </Grid>
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
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  Appointment Updated!
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
                  Update your appointment date, time, and service details
                </Typography>

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Date"
                        name="date"
                        type="date"
                        fullWidth
                        value={formData.date}
                        onChange={handleChange}
                        required
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: (
                            <CalendarToday color="action" sx={{ mr: 1 }} />
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Time"
                        name="time"
                        type="time"
                        fullWidth
                        value={formData.time}
                        onChange={handleChange}
                        required
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: (
                            <Schedule color="action" sx={{ mr: 1 }} />
                          ),
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
                        {dummyServices.map((s) => (
                          <MenuItem key={s.id} value={s.id}>
                            <Box>
                              <Typography>{s.name}</Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {s.description}
                              </Typography>
                            </Box>
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
                        {(dummyTrainers["1"] || []).map((t) => (
                          <MenuItem key={t.id} value={t.id}>
                            <Box>
                              <Typography>{t.name}</Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {t.specialty}
                              </Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>

                  <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
                    <Button
                      variant="outlined"
                      onClick={() => router.back()}
                      disabled={post.loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={post.loading}
                      startIcon={
                        post.loading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : null
                      }
                    >
                      {post.loading ? "Saving..." : "Save Changes"}
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
);

export default EditAppointmentPage;
