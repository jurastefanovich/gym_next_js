"use client";
import { AppointmentApi } from "@/app/_features/enums/ApiPaths";
import { ServiceDetail } from "@/app/_features/utils/Interfaces";
import { useSnackbar } from "@/app/context/SnackbarContext";
import { usePost, usePostAuth } from "@/app/hooks/usePost";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";

interface BookingStepperDialogProps {
  open: boolean;
  onClose: () => void;
  service: ServiceDetail;
  serviceId: number;
}

const steps = ["Select Date & Time", "Confirm Appointment"];

export default function BookingStepperDialog({
  open,
  onClose,
  service,
  serviceId,
}: BookingStepperDialogProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const post = usePostAuth();
  const snackbar = useSnackbar();
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleClose = () => {
    setActiveStep(0);
    setSelectedDateTime(null);
    onClose();
  };

  const handleDateTimeChange = (dateTime: Date) => {
    setSelectedDateTime(dateTime);
  };

  const handleSubmit = async () => {
    const obj = {
      serviceId,
      dateAndTime: dayjs(selectedDateTime).toISOString(),
    };

    const res = await post.post(AppointmentApi.SERVICE_BOOK, obj);

    if (res) {
      handleClose();
      snackbar.showMessage("Appointment created successfully!", "success");
    }
  };

  return (
    <Dialog
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle
        sx={{
          bgcolor: "primary.main",
          color: "white",
          fontWeight: 600,
          py: 2,
        }}
      >
        Book Appointment
      </DialogTitle>
      <DialogContent sx={{ my: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel />
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Select Date and Time
            </Typography>
            {/* New Date and Time Pickers */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
                <DatePicker
                  label="Select Date"
                  value={selectedDateTime ? dayjs(selectedDateTime) : null}
                  onChange={(newDate) => {
                    if (newDate) {
                      const updated = dayjs(selectedDateTime ?? newDate)
                        .set("year", newDate.year())
                        .set("month", newDate.month())
                        .set("date", newDate.date());
                      setSelectedDateTime(updated.toDate());
                    }
                  }}
                />
                <TimePicker
                  label="Select Time"
                  value={selectedDateTime ? dayjs(selectedDateTime) : null}
                  onChange={(newTime) => {
                    if (newTime) {
                      const updated = dayjs(selectedDateTime ?? newTime)
                        .set("hour", newTime.hour())
                        .set("minute", newTime.minute());
                      setSelectedDateTime(updated.toDate());
                    }
                  }}
                />
              </Box>
            </LocalizationProvider>
          </Box>
        )}

        {activeStep === 1 && selectedDateTime && (
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Appointment Details
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Service Information
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <Chip
                  icon={<AccessTimeIcon />}
                  label={`${Math.ceil(service.duration / 60)} min`}
                  variant="outlined"
                  size="small"
                />
              </Box>
              <Typography>{service.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {service.description}
              </Typography>
            </Box>

            {service.needsTrainer && service.trainer && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  Trainer
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PersonIcon fontSize="small" />
                  <Typography>
                    {service.trainer.firstName} {service.trainer.lastName}
                  </Typography>
                </Box>
              </Box>
            )}

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Date & Time
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CalendarTodayIcon fontSize="small" />
                <Typography>
                  {selectedDateTime.toLocaleDateString()} at{" "}
                  {selectedDateTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Review your appointment details before confirming
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={activeStep === 0 ? handleClose : handleBack}>
          {activeStep === 0 ? "Cancel" : "Back"}
        </Button>
        <Button
          variant="contained"
          onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
          disabled={activeStep === 0 && !selectedDateTime}
        >
          {activeStep === steps.length - 1 ? "Confirm Booking" : "Next"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
