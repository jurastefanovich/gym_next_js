"use client";
import { Add, Visibility, Search, Close } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Box,
  Chip,
  MenuItem,
  InputAdornment,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useState, useMemo } from "react";
import { StyledPaper } from "./Dashboard";
import { GymApi, TrainerApi } from "@/app/_features/enums/ApiPaths";
import { useGet } from "@/app/hooks/useGet";
import { TrainerDto } from "@/app/_features/utils/Interfaces";
import { usePostAuth } from "@/app/hooks/usePost";
import { useRouter } from "next/navigation";
import { ADMIN_ROUTES, GENERAL } from "@/app/_features/enums/Routes";

export default function Trainers() {
  const router = useRouter();
  const get = useGet<TrainerDto[]>(GymApi.TRAINERS);
  const specializationsGet = useGet<string[]>(GymApi.SPECIALIZATIONS);
  const trainers = get.data || [];
  const postTrainer = usePostAuth();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);

  // New state for dialog open
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  // Use `search` (debounced) for filtering
  const filteredTrainers = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return trainers.filter(
      (t) =>
        `${t.firstName} ${t.lastName}`.toLowerCase().includes(lowerSearch) ||
        t.email.toLowerCase().includes(lowerSearch)
    );
  }, [search, trainers]);

  const [newTrainer, setNewTrainer] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    specs: [] as string[],
    desc: "",
  });

  const resetForm = () => {
    setNewTrainer({
      email: "",
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      specs: [],
      desc: "",
    });
  };

  const addTrainer = async () => {
    const res = await postTrainer.post(TrainerApi.ADD, {
      email: newTrainer.email,
      firstName: newTrainer.firstName,
      lastName: newTrainer.lastName,
      username: newTrainer.username,
      password: newTrainer.password,
      specs: newTrainer.specs,
      desc: newTrainer.desc,
    });
    if (res) {
      get.refetch();
      resetForm();
      setAddDialogOpen(false);
      setSuccessAlert(true);
      setTimeout(() => setSuccessAlert(false), 4000);
    }
  };

  const handleViewTrainer = (trainer: TrainerDto) => {
    router.push(GENERAL.TRAINER_ID + trainer.id);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: "bold" }}>
        Trainer Management
      </Typography>

      {successAlert && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Trainer added successfully!
        </Alert>
      )}

      {get.error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Error loading trainers: {get.error}
        </Alert>
      )}

      {/* Add Trainer Button */}
      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setAddDialogOpen(true)}
        >
          Add New Trainer
        </Button>
      </Box>

      {/* Trainers Table Full Width */}
      <StyledPaper sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "600" }}>
            Trainer List
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {filteredTrainers.length}{" "}
            {filteredTrainers.length === 1 ? "trainer" : "trainers"} found
          </Typography>
        </Box>

        <TextField
          fullWidth
          label="Search by name or email"
          value={searchInput} // bind to input state, not debounced search
          onChange={(e) => setSearchInput(e.target.value)}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        {get.loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: 500,
              boxShadow: "none",
              border: "1px solid #e0e0e0",
            }}
          >
            <Table stickyHeader size="small" aria-label="trainer table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "600" }}>Trainer</TableCell>
                  <TableCell sx={{ fontWeight: "600" }}>Email</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "600" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTrainers.length > 0 ? (
                  filteredTrainers.map((trainer) => (
                    <TableRow key={trainer.id} hover>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            alt={`${trainer.firstName} ${trainer.lastName}`}
                            sx={{ mr: 2 }}
                          />
                          <Box>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "500" }}
                            >
                              {`${trainer.firstName} ${trainer.lastName}`}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              @{trainer.username}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{trainer.email}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="View details">
                          <IconButton
                            onClick={() => handleViewTrainer(trainer)}
                            color="primary"
                            size="small"
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        {search
                          ? "No matching trainers found"
                          : "No trainers available"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </StyledPaper>

      {/* Add Trainer Dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Add New Trainer
          <IconButton
            aria-label="close"
            onClick={() => setAddDialogOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={newTrainer.firstName}
                onChange={(e) =>
                  setNewTrainer({ ...newTrainer, firstName: e.target.value })
                }
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={newTrainer.lastName}
                onChange={(e) =>
                  setNewTrainer({ ...newTrainer, lastName: e.target.value })
                }
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={newTrainer.email}
                onChange={(e) =>
                  setNewTrainer({ ...newTrainer, email: e.target.value })
                }
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                value={newTrainer.username}
                onChange={(e) =>
                  setNewTrainer({ ...newTrainer, username: e.target.value })
                }
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={newTrainer.password}
                onChange={(e) =>
                  setNewTrainer({ ...newTrainer, password: e.target.value })
                }
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Specializations</InputLabel>
                <Select
                  multiple
                  value={newTrainer.specs}
                  onChange={(e) =>
                    setNewTrainer({
                      ...newTrainer,
                      specs: e.target.value as string[],
                    })
                  }
                  label="Specializations"
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {specializationsGet.data?.map((spec) => (
                    <MenuItem key={spec} value={spec}>
                      {spec}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={newTrainer.desc}
                onChange={(e) =>
                  setNewTrainer({ ...newTrainer, desc: e.target.value })
                }
                multiline
                rows={3}
                size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={addTrainer}
            disabled={
              !newTrainer.email ||
              !newTrainer.firstName ||
              !newTrainer.lastName ||
              !newTrainer.username ||
              !newTrainer.password
            }
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
