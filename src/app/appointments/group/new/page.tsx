"use client";

import { BoxNoMargin } from "@/app/_features/components/Styled";
import {
  AppointmentApi,
  ServicesApi,
  TrainerApi,
} from "@/app/_features/enums/ApiPaths";
import MyLoader from "@/app/components/MyLoader";
import { useGet } from "@/app/hooks/useGet";
import { usePost } from "@/app/hooks/usePost";
import {
  ArrowBack,
  Cancel as CancelIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import {
  Button,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

export interface ServiceOption {
  id: string;
  title: string;
  duration: number;
  maxUsersPerGroupSession: number;
}

export interface TrainerDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  phoneNumber: string;
  initials: string;
}

const CreateGroupAppointmentPage = () => {
  const router = useRouter();
  const post = usePost();

  // Fetch available services and trainers
  const { data: services } = useGet<ServiceOption[]>(ServicesApi.GET_ALL_GROUP);
  const { data: trainers } = useGet<TrainerDto[]>(TrainerApi.GET_ALL);

  // Form state
  const [formData, setFormData] = useState({
    serviceId: "",
    trainerId: "",
    startTime: dayjs().add(1, "days"),
    notes: "",
  });

  const [errors, setErrors] = useState({
    serviceId: false,
    trainerId: false,
    startTime: false,
  });

  const selectedService = services?.find(
    (svc) => svc.id === formData.serviceId
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {
      serviceId: !formData.serviceId,
      trainerId: !formData.trainerId,
      startTime: !formData.startTime || formData.startTime.isBefore(dayjs()),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      const payload = {
        serviceId: Number(formData.serviceId), // Convert to number to match Long
        trainerId: Number(formData.trainerId), // Convert to number to match Long
        dateTime: formData.startTime.toISOString(), // Changed from startTime to dateTime
        description: formData.notes || null, // Changed from notes to description
      };
      console.log(AppointmentApi.CREATE_GROUP_APPOINTMENT);
      console.log(payload);
      await post.post(AppointmentApi.CREATE_GROUP_APPOINTMENT, payload);
    } catch (error) {
      console.error("Failed to create group appointment:", error);
    }
  };

  const handleCancel = () => {
    router.push("/appointments/group");
  };

  return (
    <BoxNoMargin>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Create Group Appointment</Typography>
        <Button
          startIcon={<ArrowBack />}
          variant="outlined"
          onClick={handleCancel}
        >
          Back
        </Button>
      </Stack>

      <Paper elevation={2} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Service Selector */}
            <FormControl fullWidth error={errors.serviceId}>
              <InputLabel id="service-label">Service</InputLabel>
              <Select
                labelId="service-label"
                value={formData.serviceId}
                label="Service"
                onChange={(e) =>
                  setFormData({ ...formData, serviceId: e.target.value })
                }
              >
                {services?.map((service) => (
                  <MenuItem key={service.id} value={service.id}>
                    {service.title}
                    <Chip
                      label={`${service.maxUsersPerGroupSession} max`}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Trainer Selector */}
            <FormControl fullWidth error={errors.trainerId}>
              <InputLabel id="trainer-label">Trainer</InputLabel>
              <Select
                labelId="trainer-label"
                value={formData.trainerId}
                label="Trainer"
                onChange={(e) =>
                  setFormData({ ...formData, trainerId: e.target.value })
                }
              >
                {trainers?.map((trainer) => (
                  <MenuItem key={trainer.id} value={trainer.id}>
                    {trainer.firstName} {trainer.lastName}
                    <Chip label={trainer.email} size="small" sx={{ ml: 1 }} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Date Time Picker */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Start Time"
                value={formData.startTime}
                onChange={(newValue: Dayjs | null) => {
                  if (newValue) {
                    setFormData({ ...formData, startTime: newValue });
                  }
                }}
                timeSteps={{ minutes: 30 }}
                disablePast
                minDateTime={dayjs().add(1, "day")}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: errors.startTime,
                    helperText: errors.startTime
                      ? "Start time must be in the future"
                      : "",
                  },
                }}
              />
            </LocalizationProvider>

            {/* Duration Display */}
            {selectedService && (
              <TextField
                label="Duration"
                value={`${Math.round(selectedService.duration / 60)} minutes`}
                disabled
                fullWidth
              />
            )}

            {/* Notes Field */}
            <TextField
              label="Notes (Optional)"
              multiline
              rows={4}
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              fullWidth
            />

            <Divider />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button type="submit" variant="contained">
                Create Appointment
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </BoxNoMargin>
  );
};

export default CreateGroupAppointmentPage;
