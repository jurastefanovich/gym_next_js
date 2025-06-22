"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  LinearProgress,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { BoxNoMargin } from "@/app/_features/components/Styled";
import { AppointmentApi } from "@/app/_features/enums/ApiPaths";
import { useGet } from "@/app/hooks/useGet";
import { usePut } from "@/app/hooks/usePut";
import { FinishSessionDto, FinishUser } from "@/app/_features/utils/Interfaces";
import { Background } from "@/app/_features/enums/Colors";

interface Session {
  id: number;
  serviceName: string;
  date: string;
  coach: FinishUser;
  notes: string;
}

interface ExerciseDef {
  name: string;
}

type ExerciseFields = {
  sets: string;
  reps: string;
  weight: string;
  duration: string;
  restTime: string;
  modified?: boolean;
};

const defaultExerciseFields: Omit<ExerciseFields, "modified"> = {
  sets: "",
  reps: "",
  weight: "",
  duration: "",
  restTime: "",
};

const FinishSessionPage: React.FC = () => {
  const { id } = useParams();
  const { data, loading } = useGet<FinishSessionDto>(
    id ? `${AppointmentApi.FINISH}${id}` : null
  );
  const put = usePut();

  const [session, setSession] = useState<Session | null>(null);
  const [usersInSession, setUsersInSession] = useState<FinishUser[]>([]);
  const [serviceExercises, setServiceExercises] = useState<ExerciseDef[]>([]);
  const [exerciseDefaults, setExerciseDefaults] = useState<
    Record<string, ExerciseFields>
  >({});
  const [pendingDefaults, setPendingDefaults] = useState<
    Record<string, ExerciseFields>
  >({});
  const [userExerciseData, setUserExerciseData] = useState<
    Record<number, Record<string, ExerciseFields>>
  >({});
  const [expandedUser, setExpandedUser] = useState<number | null>(null);
  const [expandedExercises, setExpandedExercises] = useState<
    Record<number, string | null>
  >({});

  const [editing, setEditing] = useState<{
    userId: number | null;
    exercise: string | null;
  }>({
    userId: null,
    exercise: null,
  });

  // Load and map data
  useEffect(() => {
    if (!data) return;

    const mappedUsers: FinishUser[] = data.users.map((u) => ({
      id: u.id,
      name: `${u.firstName ?? ""} ${u.lastName ?? ""}`,
      firstName: u.firstName,
      lastName: u.lastName,
      username: u.username,
      phoneNumber: u.phoneNumber,
      initials: u.initials,
      email: u.email,
    }));

    const mappedExercises: ExerciseDef[] = data.exercises.map((ex) => ({
      name: ex,
    }));

    setSession({
      id: data.id,
      serviceName: data.serviceName,
      date: data.date,
      coach: data.trainer,
      notes: data.notes,
    });

    setUsersInSession(mappedUsers);
    setServiceExercises(mappedExercises);

    // Initialize default values
    const defaultMap: Record<string, ExerciseFields> = {};
    mappedExercises.forEach((ex) => {
      defaultMap[ex.name] = { ...defaultExerciseFields };
    });
    setExerciseDefaults(defaultMap);
    setPendingDefaults(defaultMap);

    // Initialize user exercise data
    const userMap: Record<number, Record<string, ExerciseFields>> = {};
    mappedUsers.forEach((user) => {
      userMap[user.id] = {};
      mappedExercises.forEach((ex) => {
        userMap[user.id][ex.name] = { ...defaultExerciseFields };
      });
    });
    setUserExerciseData(userMap);
  }, [data]);

  const handlePendingDefaultChange = (
    exercise: string,
    field: string,
    value: string
  ) => {
    setPendingDefaults((prev) => ({
      ...prev,
      [exercise]: { ...prev[exercise], [field]: value },
    }));
  };

  const applyDefaults = () => {
    setExerciseDefaults(pendingDefaults);

    setUserExerciseData((prev) => {
      const updated = { ...prev };
      for (const userId in updated) {
        for (const exercise in pendingDefaults) {
          if (!updated[userId][exercise].modified) {
            updated[userId][exercise] = {
              ...pendingDefaults[exercise],
            };
          }
        }
      }
      return updated;
    });
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
          ...prev[userId]?.[exercise],
          [field]: value,
          modified: true,
        },
      },
    }));
  };

  const stopEditing = () => setEditing({ userId: null, exercise: null });

  const handleSubmit = () => {
    const payload = {
      sessionId: Number(id),
      userResults: Object.entries(userExerciseData).map(([uid, exs]) => ({
        userId: +uid,
        exercises: Object.entries(exs).map(([type, vals]) => ({
          type,
          sets: vals.sets,
          reps: vals.reps,
          weight: vals.weight,
          duration: vals.duration,
          restTime: vals.restTime,
        })),
      })),
      defaultValues: exerciseDefaults,
    };
    put.put(`${AppointmentApi.FINISH}${id}`, payload);
  };

  const toggleUserExpand = (userId: number) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  const toggleExerciseExpand = (userId: number, exerciseName: string) => {
    setExpandedExercises((prev) => ({
      ...prev,
      [userId]:
        expandedExercises[userId] === exerciseName ? null : exerciseName,
    }));
  };

  if (loading) {
    return (
      <BoxNoMargin>
        <LinearProgress />
      </BoxNoMargin>
    );
  }

  function normalizeFieldName(input: string) {
    const words = input.split(/(?=[A-Z])/);
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <BoxNoMargin sx={{ backgroundColor: "#f5f5f5" }}>
      <Paper sx={{ p: 3, mb: 4, backgroundColor: "background.paper" }}>
        <Typography variant="h4" gutterBottom sx={{ color: "primary.main" }}>
          Complete Training Session
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                p: 2,
                backgroundColor: "grey.100",
                borderRadius: 1,
                borderLeft: "4px solid",
                borderColor: "primary.main",
              }}
            >
              <Typography variant="subtitle1" color="text.secondary">
                Service
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, fontWeight: "medium" }}>
                {session?.serviceName}
              </Typography>

              <Typography variant="subtitle1" color="text.secondary">
                Date
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, fontWeight: "medium" }}>
                {session?.date}
              </Typography>

              <Typography variant="subtitle1" color="text.secondary">
                Coach
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                {`${session?.coach.firstName} ${session?.coach.lastName}`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Default Exercise Values */}
      <Paper sx={{ p: 3, mb: 4, backgroundColor: "background.paper" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            p: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="h5" sx={{ color: "primary.main" }}>
            Default Exercise Values
          </Typography>
          <Button
            variant="contained"
            onClick={applyDefaults}
            disabled={
              JSON.stringify(pendingDefaults) ===
              JSON.stringify(exerciseDefaults)
            }
            sx={{
              backgroundColor: "primary.dark",
              "&:hover": {
                backgroundColor: "primary.main",
              },
            }}
          >
            Apply Defaults
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Set default values that will be applied to all users who haven't been
          customized.
        </Typography>

        {serviceExercises.map((ex) => (
          <Accordion key={ex.name} sx={{ mb: 2 }}>
            <AccordionSummary
              sx={{ bgcolor: Background.PRIMARY, color: "white" }}
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            >
              <Typography sx={{ flexGrow: 1, fontWeight: "medium" }}>
                {ex.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {Object.keys(defaultExerciseFields).map((field) => (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={field}>
                    <TextField
                      label={normalizeFieldName(field)}
                      type="number"
                      fullWidth
                      size="small"
                      inputProps={{ min: 0 }}
                      value={pendingDefaults[ex.name]?.[field] ?? ""}
                      onChange={(e) =>
                        handlePendingDefaultChange(
                          ex.name,
                          field,
                          e.target.value
                        )
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>

      {/* User Exercise Data */}
      <Paper sx={{ p: 3, backgroundColor: "background.paper" }}>
        <Typography variant="h5" gutterBottom sx={{ color: "primary.main" }}>
          User Exercise Data
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Review and customize exercise parameters for each user.
        </Typography>

        {usersInSession.map((user) => (
          <Accordion
            key={user.id}
            sx={{ mb: 2 }}
            expanded={expandedUser === user.id}
            onChange={() => toggleUserExpand(user.id)}
          >
            <AccordionSummary
              sx={{ bgcolor: Background.PRIMARY, color: "white" }}
              expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
                  {user.name}
                </Typography>
                {Object.values(userExerciseData[user.id] || {}).some(
                  (ex) => ex.modified
                ) && (
                  <Chip
                    icon={<CheckCircleIcon fontSize="small" />}
                    label="Customized"
                    size="small"
                    color="success"
                  />
                )}
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              {serviceExercises.map((ex) => (
                <Accordion
                  key={ex.name}
                  sx={{ mb: 2 }}
                  expanded={expandedExercises[user.id] === ex.name}
                  onChange={() => toggleExerciseExpand(user.id, ex.name)}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography sx={{ fontWeight: "medium" }}>
                        {ex.name}
                      </Typography>
                      {userExerciseData[user.id]?.[ex.name]?.modified && (
                        <Chip
                          icon={<CheckCircleIcon fontSize="small" />}
                          label="Customized"
                          size="small"
                          color="success"
                          variant="outlined"
                        />
                      )}
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper} variant="outlined">
                      <Table size="small">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: "grey.100" }}>
                            <TableCell sx={{ fontWeight: "bold" }}>
                              Parameter
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{ fontWeight: "bold" }}
                            >
                              Value
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{ fontWeight: "bold" }}
                            >
                              Actions
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.keys(defaultExerciseFields).map((field) => {
                            const current =
                              userExerciseData[user.id]?.[ex.name] || {};
                            return (
                              <TableRow key={field}>
                                <TableCell>
                                  {normalizeFieldName(field)}
                                </TableCell>
                                <TableCell align="right">
                                  {editing.userId === user.id &&
                                  editing.exercise === ex.name ? (
                                    <TextField
                                      size="small"
                                      inputProps={{ min: 0 }}
                                      type="number"
                                      value={current[field] ?? ""}
                                      onChange={(e) =>
                                        handleUserExerciseChange(
                                          user.id,
                                          ex.name,
                                          field,
                                          e.target.value
                                        )
                                      }
                                      sx={{ width: 100 }}
                                      autoFocus
                                    />
                                  ) : (
                                    current[field] || "-"
                                  )}
                                </TableCell>
                                <TableCell align="right">
                                  {editing.userId === user.id &&
                                  editing.exercise === ex.name ? (
                                    <Tooltip title="Save">
                                      <IconButton
                                        onClick={stopEditing}
                                        color="primary"
                                      >
                                        <SaveIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  ) : (
                                    <Tooltip title="Edit">
                                      <IconButton
                                        onClick={() =>
                                          setEditing({
                                            userId: user.id,
                                            exercise: ex.name,
                                          })
                                        }
                                      >
                                        <EditIcon fontSize="small" />
                                      </IconButton>
                                    </Tooltip>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 4,
            p: 2,
            borderRadius: 1,
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            sx={{
              px: 4,
            }}
          >
            Complete Session
          </Button>
        </Box>
      </Paper>
    </BoxNoMargin>
  );
};

export default FinishSessionPage;
