"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Divider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Tooltip,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { BoxNoMargin } from "@/app/_features/components/Styled";

// Dummy data
const session = {
  id: 1,
  serviceName: "Strength Training",
  date: "2025-06-17",
  location: "Main Gym",
  coach: "John Trainer",
  notes: "Focus on proper form and controlled movements",
};

const usersInSession = [
  { id: 1, name: "Alice Johnson", level: "Intermediate" },
  { id: 2, name: "Bob Smith", level: "Beginner" },
  { id: 3, name: "Charlie Davis", level: "Advanced" },
];

const serviceExercises = [
  { type: "SQUAT", name: "Barbell Squat" },
  { type: "BENCH_PRESS", name: "Bench Press" },
  { type: "DEADLIFT", name: "Deadlift" },
];

const defaultExerciseFields = {
  sets: "",
  reps: "",
  weight: "",
  duration: "",
  restTime: "",
};

const FinishSessionPage: React.FC = () => {
  const [exerciseDefaults, setExerciseDefaults] = useState<
    Record<string, typeof defaultExerciseFields>
  >({});
  const [userExerciseData, setUserExerciseData] = useState<
    Record<
      number,
      Record<string, typeof defaultExerciseFields & { modified?: boolean }>
    >
  >({});
  const [editing, setEditing] = useState<{
    userId: number | null;
    exercise: string | null;
  }>({ userId: null, exercise: null });

  useEffect(() => {
    const defaults: typeof exerciseDefaults = {};
    const userData: typeof userExerciseData = {};

    serviceExercises.forEach((exercise) => {
      defaults[exercise.type] = { ...defaultExerciseFields };
    });

    usersInSession.forEach((user) => {
      userData[user.id] = {};
      serviceExercises.forEach((exercise) => {
        userData[user.id][exercise.type] = {
          ...defaultExerciseFields,
          modified: false,
        };
      });
    });

    setExerciseDefaults(defaults);
    setUserExerciseData(userData);
  }, []);

  const handleDefaultChange = (
    exercise: string,
    field: string,
    value: string
  ) => {
    const updatedDefaults = {
      ...exerciseDefaults,
      [exercise]: { ...exerciseDefaults[exercise], [field]: value },
    };
    setExerciseDefaults(updatedDefaults);

    const updatedUsers = { ...userExerciseData };
    for (const userId in updatedUsers) {
      const userExercises = updatedUsers[+userId];
      if (!userExercises[exercise].modified) {
        userExercises[exercise] = {
          ...userExercises[exercise],
          [field]: value,
        };
      }
    }
    setUserExerciseData(updatedUsers);
  };

  const handleUserExerciseChange = (
    userId: number,
    exercise: string,
    field: string,
    value: string
  ) => {
    setUserExerciseData((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [exercise]: {
          ...prev[userId][exercise],
          [field]: value,
          modified: true,
        },
      },
    }));
  };

  const applyDefaultsToUser = (userId: number, exercise: string) => {
    setUserExerciseData((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [exercise]: {
          ...exerciseDefaults[exercise],
          modified: false,
        },
      },
    }));
  };

  const startEditing = (userId: number, exercise: string) => {
    setEditing({ userId, exercise });
  };

  const stopEditing = () => {
    setEditing({ userId: null, exercise: null });
  };

  const handleSubmit = () => {
    console.log("Submitting finished session data:");
    console.log(userExerciseData);
    // Replace with actual API call
    alert("Session data saved successfully!");
  };

  return (
    <BoxNoMargin>
      {/* Session Header */}
      <Paper sx={{ p: 3, mb: 4 }} elevation={2}>
        <Typography variant="h4" gutterBottom>
          Complete Training Session
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography>
              <strong>Service:</strong> {session.serviceName}
            </Typography>
            <Typography>
              <strong>Date:</strong> {session.date}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography>
              <strong>Location:</strong> {session.location}
            </Typography>
            <Typography>
              <strong>Coach:</strong> {session.coach}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography>
              <strong>Notes:</strong> {session.notes}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Default Exercise Values */}
      <Paper sx={{ p: 3, mb: 4 }} elevation={2}>
        <Typography variant="h5" gutterBottom>
          Default Exercise Values
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Set default values that will apply to all users. You can customize
          individual values later.
        </Typography>

        {serviceExercises.map((exercise) => (
          <Accordion key={exercise.type} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                {exercise.name}
              </Typography>
              <Chip label={exercise.type} size="small" />
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {Object.keys(defaultExerciseFields).map((field) => (
                  <Grid item xs={6} sm={4} md={2} key={field}>
                    <TextField
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      type="number"
                      fullWidth
                      value={exerciseDefaults[exercise.type]?.[field] ?? ""}
                      onChange={(e) =>
                        handleDefaultChange(
                          exercise.type,
                          field,
                          e.target.value
                        )
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>

      {/* User Exercise Data */}
      <Paper sx={{ p: 3, mb: 4 }} elevation={2}>
        <Typography variant="h5" gutterBottom>
          User Exercise Data
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Review and customize exercise data for each user.
        </Typography>

        {usersInSession.map((user) => (
          <Accordion key={user.id} defaultExpanded sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                {user.name}
              </Typography>
              <Chip
                label={user.level}
                size="small"
                color={
                  user.level === "Beginner"
                    ? "primary"
                    : user.level === "Intermediate"
                    ? "secondary"
                    : "success"
                }
              />
            </AccordionSummary>
            <AccordionDetails>
              {serviceExercises.map((exercise) => (
                <Box key={exercise.type} mb={4}>
                  <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                    <Typography variant="subtitle1">{exercise.name}</Typography>
                    <Chip label={exercise.type} size="small" />
                    {Object.keys(defaultExerciseFields).some(
                      (field) =>
                        userExerciseData[user.id]?.[exercise.type]?.[field] !==
                        exerciseDefaults[exercise.type]?.[field]
                    ) && (
                      <Chip
                        icon={<CheckCircleIcon fontSize="small" />}
                        label="Customized"
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                    )}
                  </Stack>

                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Parameter</TableCell>
                          <TableCell align="right">Value</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.keys(defaultExerciseFields).map((field) => (
                          <TableRow key={field}>
                            <TableCell>
                              {field.charAt(0).toUpperCase() + field.slice(1)}
                            </TableCell>
                            <TableCell align="right">
                              {editing.userId === user.id &&
                              editing.exercise === exercise.type ? (
                                <TextField
                                  size="small"
                                  type="number"
                                  value={
                                    userExerciseData[user.id]?.[
                                      exercise.type
                                    ]?.[field] ?? ""
                                  }
                                  onChange={(e) =>
                                    handleUserExerciseChange(
                                      user.id,
                                      exercise.type,
                                      field,
                                      e.target.value
                                    )
                                  }
                                  sx={{ width: 100 }}
                                />
                              ) : (
                                userExerciseData[user.id]?.[exercise.type]?.[
                                  field
                                ] || "-"
                              )}
                              {userExerciseData[user.id]?.[exercise.type]?.[
                                field
                              ] !==
                                exerciseDefaults[exercise.type]?.[field] && (
                                <Tooltip title="Differs from default">
                                  <Chip
                                    label="Modified"
                                    size="small"
                                    color="warning"
                                    sx={{ ml: 1 }}
                                  />
                                </Tooltip>
                              )}
                            </TableCell>
                            <TableCell align="right">
                              {editing.userId === user.id &&
                              editing.exercise === exercise.type ? (
                                <Tooltip title="Save changes">
                                  <IconButton
                                    onClick={stopEditing}
                                    color="primary"
                                  >
                                    <SaveIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              ) : (
                                <Tooltip title="Edit values">
                                  <IconButton
                                    onClick={() =>
                                      startEditing(user.id, exercise.type)
                                    }
                                    color="primary"
                                  >
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              )}
                              <Tooltip title="Reset to defaults">
                                <IconButton
                                  onClick={() =>
                                    applyDefaultsToUser(user.id, exercise.type)
                                  }
                                  color="secondary"
                                >
                                  <ContentCopyIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          startIcon={<SaveIcon />}
          sx={{ px: 4 }}
        >
          Complete Session
        </Button>
      </Box>
    </BoxNoMargin>
  );
};

export default FinishSessionPage;
