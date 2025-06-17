"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  Tabs,
  Tab,
  Select,
  MenuItem,
  Chip,
  LinearProgress,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Edit as EditIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  FitnessCenter as FitnessCenterIcon,
  CalendarToday as CalendarTodayIcon,
  Timeline as TimelineIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  ShowChart as LineChartIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  History as HistoryIcon,
  TrendingUp as TrendingUpIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { LineChart, PieChart, BarChart } from "@mui/x-charts";
import { BoxNoMargin } from "../_features/components/Styled";

// Mock data
const userData = {
  firstName: "Alex",
  lastName: "Johnson",
  username: "alexfit",
  email: "alex@example.com",
  phoneNumber: "+1 555-123-4567",
  level: "Intermediate",
  joinDate: "January 2023",
  bio: "Fitness enthusiast focused on strength training and mobility",
  goals: [
    "Increase deadlift to 200kg",
    "Run a sub-25min 5k",
    "10 strict pullups",
  ],
  stats: {
    streak: 7,
    sessionsThisWeek: 5,
    favoriteExercise: "Squats",
    totalSessions: 342,
    monthlyProgress: 12, // %
  },
};

const exerciseOptions = [
  { id: "all", name: "All Exercises", icon: <FitnessCenterIcon /> },
  { id: "squats", name: "Squats", icon: <FitnessCenterIcon /> },
  { id: "pushups", name: "Pushups", icon: <FitnessCenterIcon /> },
  { id: "pullups", name: "Pullups", icon: <FitnessCenterIcon /> },
  { id: "deadlifts", name: "Deadlifts", icon: <FitnessCenterIcon /> },
  { id: "running", name: "Running", icon: <FitnessCenterIcon /> },
];

const progressData = {
  daily: [3, 5, 2, 6, 4, 7, 4], // Last 7 days
  weekly: [12, 15, 10, 18, 14], // Last 5 weeks
  monthly: [42, 38, 45, 50, 40, 48], // Last 6 months
  yearly: [120, 90, 110, 130, 150, 140, 160, 180, 200, 190, 210, 220], // Last 12 months
  byExercise: {
    squats: 150,
    pushups: 120,
    pullups: 80,
    deadlifts: 50,
    running: 100,
  },
  recentSessions: [
    {
      date: "2023-06-15",
      exercises: ["Squats", "Deadlifts"],
      duration: "45 min",
    },
    {
      date: "2023-06-13",
      exercises: ["Pushups", "Pullups"],
      duration: "30 min",
    },
    { date: "2023-06-10", exercises: ["Running"], duration: "60 min" },
  ],
};

const timeFrames = ["day", "week", "month", "year", "all"];
const chartTypes = ["line", "bar", "pie"];

export default function FitnessDashboard() {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(userData);
  const [selectedExercise, setSelectedExercise] = useState("all");
  const [timeFrame, setTimeFrame] = useState("week");
  const [chartType, setChartType] = useState("line");
  const [activeTab, setActiveTab] = useState(0);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    bio: user.bio,
  });

  const handleExerciseChange = (event) => {
    setSelectedExercise(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setTimeFrame(timeFrames[newValue]);
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  const handleEditClick = () => {
    setOpenEditDialog(true);
  };

  const handleEditSave = () => {
    setUser({ ...user, ...editForm });
    setOpenEditDialog(false);
  };

  const handleEditCancel = () => {
    setEditForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      bio: user.bio,
    });
    setOpenEditDialog(false);
  };

  const handleFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const getCurrentData = () => {
    switch (timeFrame) {
      case "day":
        return progressData.daily.slice(-7);
      case "week":
        return progressData.weekly.slice(-5);
      case "month":
        return progressData.monthly.slice(-6);
      case "year":
        return progressData.yearly.slice(-12);
      default:
        return Object.values(progressData.byExercise);
    }
  };

  const getLabels = () => {
    switch (timeFrame) {
      case "day":
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      case "week":
        return Array.from({ length: 5 }, (_, i) => `Week ${i + 1}`);
      case "month":
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      case "year":
        return Array.from({ length: 12 }, (_, i) =>
          new Date(0, i).toLocaleString("default", { month: "short" })
        );
      default:
        return Object.keys(progressData.byExercise);
    }
  };

  const renderChart = () => {
    const data = getCurrentData();
    const labels = getLabels();

    switch (chartType) {
      case "line":
        return (
          <LineChart
            xAxis={[{ scaleType: "point", data: labels }]}
            series={[{ data, area: true }]}
            height={300}
            colors={["#3f51b5"]}
          />
        );
      case "bar":
        return (
          <BarChart
            xAxis={[{ scaleType: "band", data: labels }]}
            series={[{ data }]}
            height={300}
            colors={["#3f51b5"]}
          />
        );
      case "pie":
        return (
          <PieChart
            series={[
              {
                data: labels.map((label, index) => ({
                  id: index,
                  value: data[index],
                  label,
                })),
                innerRadius: 30,
              },
            ]}
            height={300}
            slotProps={{
              legend: { hidden: true },
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <BoxNoMargin
      sx={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="bold">
            Fitness Dashboard
          </Typography>
          <Typography color="text.secondary">
            Track your progress and manage your fitness journey
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Left Column - Profile & Quick Stats */}
          <Grid item xs={12} md={4}>
            {/* Profile Card */}
            <Card sx={{ mb: 3, borderRadius: 3 }}>
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ width: 80, height: 80, fontSize: 32 }}>
                      {user.firstName.charAt(0)}
                      {user.lastName.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h5" fontWeight="bold">
                        {user.firstName} {user.lastName}
                      </Typography>
                      <Typography color="text.secondary">
                        @{user.username}
                      </Typography>
                      <Chip
                        label={user.level}
                        size="small"
                        color="primary"
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  </Stack>
                  <IconButton onClick={handleEditClick}>
                    <EditIcon />
                  </IconButton>
                </Stack>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    <EmailIcon
                      fontSize="small"
                      sx={{ mr: 1, verticalAlign: "middle" }}
                    />
                    {user.email}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    <PhoneIcon
                      fontSize="small"
                      sx={{ mr: 1, verticalAlign: "middle" }}
                    />
                    {user.phoneNumber}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    {user.bio}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" color="text.secondary">
                  Member since {user.joinDate}
                </Typography>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card sx={{ mb: 3, borderRadius: 3 }}>
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ mb: 2 }}
                >
                  <TrendingUpIcon color="primary" />
                  <Typography variant="h6" fontWeight="bold">
                    Quick Stats
                  </Typography>
                </Stack>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, borderRadius: 2, height: "100%" }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Current Streak
                      </Typography>
                      <Typography variant="h4" color="primary">
                        {user.stats.streak} days
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, borderRadius: 2, height: "100%" }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Sessions This Week
                      </Typography>
                      <Typography variant="h4">
                        {user.stats.sessionsThisWeek}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, borderRadius: 2, height: "100%" }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Favorite Exercise
                      </Typography>
                      <Typography variant="h4">
                        {user.stats.favoriteExercise}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, borderRadius: 2, height: "100%" }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Total Sessions
                      </Typography>
                      <Typography variant="h4">
                        {user.stats.totalSessions}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Goals */}
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Your Goals
                </Typography>
                <Stack spacing={1}>
                  {user.goals.map((goal, index) => (
                    <Paper key={index} sx={{ p: 2, borderRadius: 2 }}>
                      <Typography>{goal}</Typography>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(index * 30 + 20, 100)}
                        sx={{ mt: 1, height: 6, borderRadius: 3 }}
                      />
                    </Paper>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Middle Column - Exercise Stats */}
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3, borderRadius: 3, height: "100%" }}>
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ mb: 2 }}
                >
                  <FitnessCenterIcon color="primary" />
                  <Typography variant="h6" fontWeight="bold">
                    Exercise Statistics
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Exercise</InputLabel>
                    <Select
                      value={selectedExercise}
                      onChange={handleExerciseChange}
                      label="Exercise"
                    >
                      {exerciseOptions.map((exercise) => (
                        <MenuItem key={exercise.id} value={exercise.id}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                          >
                            {exercise.icon}
                            <span>{exercise.name}</span>
                          </Stack>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth size="small">
                    <InputLabel>Chart Type</InputLabel>
                    <Select
                      value={chartType}
                      onChange={handleChartTypeChange}
                      label="Chart Type"
                    >
                      <MenuItem value="line">
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <LineChartIcon />
                          <span>Line</span>
                        </Stack>
                      </MenuItem>
                      <MenuItem value="bar">
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <BarChartIcon />
                          <span>Bar</span>
                        </Stack>
                      </MenuItem>
                      <MenuItem value="pie">
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <PieChartIcon />
                          <span>Pie</span>
                        </Stack>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Stack>

                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{ mb: 3 }}
                >
                  <Tab label="7 Days" icon={<CalendarTodayIcon />} />
                  <Tab label="5 Weeks" icon={<TimelineIcon />} />
                  <Tab label="6 Months" icon={<TimelineIcon />} />
                  <Tab label="Year" icon={<TimelineIcon />} />
                  <Tab label="All Time" icon={<TimelineIcon />} />
                </Tabs>

                <Box sx={{ height: 300 }}>{renderChart()}</Box>

                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Total{" "}
                  {selectedExercise === "all"
                    ? "Exercises"
                    : exerciseOptions.find((e) => e.id === selectedExercise)
                        ?.name}
                  :{" "}
                  <strong>
                    {selectedExercise === "all"
                      ? Object.values(progressData.byExercise).reduce(
                          (a, b) => a + b,
                          0
                        )
                      : progressData.byExercise[selectedExercise] || 0}
                  </strong>
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - Recent Sessions & Exercise Breakdown */}
          <Grid item xs={12} md={4}>
            {/* Recent Sessions */}
            <Card sx={{ mb: 3, borderRadius: 3 }}>
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ mb: 2 }}
                >
                  <HistoryIcon color="primary" />
                  <Typography variant="h6" fontWeight="bold">
                    Recent Sessions
                  </Typography>
                </Stack>

                <Stack spacing={2}>
                  {progressData.recentSessions.map((session, index) => (
                    <Paper key={index} sx={{ p: 2, borderRadius: 2 }}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography fontWeight="bold">
                          {session.date}
                        </Typography>
                        <Chip label={session.duration} size="small" />
                      </Stack>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        {session.exercises.map((exercise, i) => (
                          <Chip
                            key={i}
                            label={exercise}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            {/* Exercise Breakdown */}
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ mb: 2 }}
                >
                  <BarChartIcon color="primary" />
                  <Typography variant="h6" fontWeight="bold">
                    Exercise Breakdown
                  </Typography>
                </Stack>

                <Stack spacing={2}>
                  {Object.entries(progressData.byExercise).map(
                    ([exercise, count]) => (
                      <Box key={exercise}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          sx={{ mb: 0.5 }}
                        >
                          <Typography variant="body2">
                            {exercise.charAt(0).toUpperCase() +
                              exercise.slice(1)}
                          </Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {count}
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={
                            (count /
                              Math.max(
                                ...Object.values(progressData.byExercise)
                              )) *
                            100
                          }
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>
                    )
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Edit Profile Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleEditCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Edit Profile</Typography>
            <IconButton onClick={handleEditCancel}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ pt: 2 }}>
            <TextField
              label="First Name"
              name="firstName"
              value={editForm.firstName}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={editForm.lastName}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={editForm.email}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={editForm.phoneNumber}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              label="Bio"
              name="bio"
              value={editForm.bio}
              onChange={handleFormChange}
              multiline
              rows={3}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </BoxNoMargin>
  );
}
