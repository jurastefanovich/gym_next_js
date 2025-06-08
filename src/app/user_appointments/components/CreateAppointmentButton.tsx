"use client";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

const steps = [
  "Select Service",
  "Choose Trainer",
  "Pick Date & Time",
  "Confirmation",
];

const serviceOptions = [
  { value: "personal_training", label: "Personal Training" },
  { value: "group_class", label: "Group Class" },
  { value: "nutrition_consult", label: "Nutrition Consultation" },
  { value: "yoga_session", label: "Yoga Session" },
];

const trainerOptions = [
  { value: "john_doe", label: "John Doe" },
  { value: "jane_smith", label: "Jane Smith" },
  { value: "mike_johnson", label: "Mike Johnson" },
  { value: "sarah_williams", label: "Sarah Williams" },
];

export default function CreateAppointmentButton() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedService, setSelectedService] = useState("");
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState<Dayjs | null>(null);
  const [notes, setNotes] = useState("");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedService("");
    setSelectedTrainer("");
    setSelectedDateTime(null);
    setNotes("");
    setOpen(false);
  };

  const handleServiceChange = (event: SelectChangeEvent) => {
    setSelectedService(event.target.value);
  };

  const handleTrainerChange = (event: SelectChangeEvent) => {
    setSelectedTrainer(event.target.value);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="service-select-label">Service</InputLabel>
            <Select
              labelId="service-select-label"
              value={selectedService}
              label="Service"
              onChange={handleServiceChange}
            >
              {serviceOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 1:
        return (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="trainer-select-label">Trainer</InputLabel>
            <Select
              labelId="trainer-select-label"
              value={selectedTrainer}
              label="Trainer"
              onChange={handleTrainerChange}
            >
              {trainerOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 2:
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ mt: 2 }}>
              <DateTimePicker
                label="Select Date & Time"
                value={selectedDateTime}
                onChange={(newValue) => setSelectedDateTime(newValue)}
                minDate={dayjs().add(1, "day")}
                disablePast
                ampm={false}
                sx={{ width: "100%" }}
              />
            </Box>
            <TextField
              label="Additional Notes"
              multiline
              rows={4}
              fullWidth
              sx={{ mt: 3 }}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </LocalizationProvider>
        );
      case 3:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Appointment Summary
            </Typography>
            <Box
              sx={{
                p: 2,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <Typography>
                <strong>Service:</strong>{" "}
                {serviceOptions.find((s) => s.value === selectedService)?.label}
              </Typography>
              <Typography>
                <strong>Trainer:</strong>{" "}
                {trainerOptions.find((t) => t.value === selectedTrainer)?.label}
              </Typography>
              <Typography>
                <strong>Date & Time:</strong>{" "}
                {selectedDateTime?.format("MMMM D, YYYY [at] h:mm A")}
              </Typography>
              {notes && (
                <Typography>
                  <strong>Notes:</strong> {notes}
                </Typography>
              )}
            </Box>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Create New Appointment
      </Button>
      <Dialog open={open} onClose={handleReset} fullWidth maxWidth="sm">
        <DialogTitle>Create New Appointment</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} sx={{ mb: 4, mt: 2 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box>
            {activeStep === steps.length ? (
              <Box textAlign="center">
                <Typography variant="h6" gutterBottom>
                  Appointment Created Successfully!
                </Typography>
                <Typography>
                  Your appointment has been scheduled. You'll receive a
                  confirmation shortly.
                </Typography>
              </Box>
            ) : (
              getStepContent(activeStep)
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          {activeStep !== 0 && activeStep !== steps.length && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeStep < steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={
                (activeStep === 0 && !selectedService) ||
                (activeStep === 1 && !selectedTrainer) ||
                (activeStep === 2 && !selectedDateTime)
              }
            >
              Next
            </Button>
          ) : activeStep === steps.length - 1 ? (
            <Button variant="contained" onClick={handleNext}>
              Confirm Appointment
            </Button>
          ) : (
            <Button variant="contained" onClick={handleReset}>
              Done
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
