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

interface Session {
  id: number;
  serviceName: string;
  date: string;
  coach: string;
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
  const [userExerciseData, setUserExerciseData] = useState<
    Record<number, Record<string, ExerciseFields>>
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
    console.log(data)
    // const mappedUsers: FinishUser[] = data.users.map((u) => ({
    //   id: u.id,
    //   name: `${u.firstName ?? ""} ${u.lastName ?? ""}`,
    //   firstName: u.firstName, // Add this line
    //   lastName: u.lastName, // Add this line if needed
    //   username: u.username,
    //   phoneNumber: u.phoneNumber,
    //   initials: u.initials,
    //   email: u.email
    // }));

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

    setUsersInSession(new Array());
    setServiceExercises(mappedExercises);

    // Initialize default values
    const defaultMap: Record<string, ExerciseFields> = {};
    mappedExercises.forEach((ex) => {
      defaultMap[ex.name] = { ...defaultExerciseFields };
    });
    setExerciseDefaults(defaultMap);

    // Initialize user exercise data
    const userMap: Record<number, Record<string, ExerciseFields>> = {};
    // mappedUsers.forEach((user) => {
    //   userMap[user.id] = {};
    //   mappedExercises.forEach((ex) => {
    //     userMap[user.id][ex.name] = { ...defaultExerciseFields };
    //   });
    // });
    setUserExerciseData(userMap);
  }, [data]);

  const handleDefaultChange = (
    exercise: string,
    field: string,
    value: string
  ) => {
    setExerciseDefaults((prev) => ({
      ...prev,
      [exercise]: { ...prev[exercise], [field]: value },
    }));

    setUserExerciseData((prev) => {
      const updated = { ...prev };
      for (const userId in updated) {
        if (!updated[userId][exercise].modified) {
          updated[userId][exercise] = {
            ...exerciseDefaults[exercise],
            [field]: value,
          };
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

  if (loading) {
    return (
      <BoxNoMargin>
        <LinearProgress />
      </BoxNoMargin>
    );
  }

  return (
    <BoxNoMargin>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4">Complete Training Session</Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={4}>
            <Typography>
              <strong>Service:</strong> {session?.serviceName}
            </Typography>
            <Typography>
              <strong>Date:</strong> {session?.date}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography>
              <strong>Coach:</strong> {session?.coach}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography>
              <strong>Notes:</strong> {session?.notes}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Default Exercise Values */}
      {/* <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Default Exercise Values
        </Typography>
        {serviceExercises.map((ex) => (
          <Accordion key={ex.name} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ flexGrow: 1 }}>{ex.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {Object.keys(defaultExerciseFields).map((field) => (
                  <Grid item xs={6} sm={4} md={2} key={field}>
                    <TextField
                      label={field}
                      type="number"
                      fullWidth
                      value={exerciseDefaults[ex.name]?.[field] ?? ""}
                      onChange={(e) =>
                        handleDefaultChange(ex.name, field, e.target.value)
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper> */}

      {/* User Exercise Data */}
      {/* <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          User Exercise Data
        </Typography>
        {usersInSession.map((user) => (
          <Accordion key={user.id} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{user.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {serviceExercises.map((ex) => {
                const current = userExerciseData[user.id]?.[ex.name] || {};
                return (
                  <Box key={ex.name} mb={2}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="subtitle1">{ex.name}</Typography>
                      {current.modified && (
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
                              <TableCell>{field}</TableCell>
                              <TableCell align="right">
                                {editing.userId === user.id &&
                                editing.exercise === ex.name ? (
                                  <TextField
                                    size="small"
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
                                  />
                                ) : (
                                  current[field] || "-"
                                )}
                              </TableCell>
                              <TableCell align="right">
                                {editing.userId === user.id &&
                                editing.exercise === ex.name ? (
                                  <Tooltip title="Save">
                                    <IconButton onClick={stopEditing}>
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
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                );
              })}
            </AccordionDetails>
          </Accordion>
        ))}
        <Box textAlign="right" mt={3}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit Session
          </Button>
        </Box>
      </Paper> */}
    </BoxNoMargin>
  );
};

export default FinishSessionPage;
