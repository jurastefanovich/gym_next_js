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
} from "@mui/icons-material";
import { LineChart, PieChart, BarChart } from "@mui/x-charts";

// Mock data for exercises and progress
const exerciseOptions = [
  { id: "all", name: "All Exercises" },
  { id: "squats", name: "Squats" },
  { id: "pushups", name: "Pushups" },
  { id: "pullups", name: "Pullups" },
  { id: "deadlifts", name: "Deadlifts" },
  { id: "running", name: "Running" },
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
};

const timeFrames = ["day", "week", "month", "year", "all"];
const chartTypes = ["line", "bar", "pie"];

export default function ProfileDashboard() {
  const get = useAuth();
  const user = get.data;
  const router = useRouter();

  const [selectedExercise, setSelectedExercise] = useState("all");
  const [timeFrame, setTimeFrame] = useState("week");
  const [chartType, setChartType] = useState("line");
  const [activeTab, setActiveTab] = useState(0);

  const goToEdit = () => router.push("/profile/edit/");

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

  // Get data for current time frame
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

  // Get labels for current time frame
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
            series={[{ data }]}
            height={300}
          />
        );
      case "bar":
        return (
          <BarChart
            xAxis={[{ scaleType: "band", data: labels }]}
            series={[{ data }]}
            height={300}
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
              },
            ]}
            height={300}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        py: 4,
        px: 2,
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
      }}
    >
      <Container maxWidth="lg">
        {/* User Profile Header */}
        <Card
          elevation={0}
          sx={{ borderRadius: 3, mb: 4, background: "transparent" }}
        >
          <Box
            sx={{
              height: 160,
              position: "relative",
            }}
          />

          <CardContent sx={{ position: "relative", pt: 10 }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: "primary.main",
                fontSize: 48,
                position: "absolute",
                top: -60,
                left: 40,
                border: "4px solid white",
                boxShadow: 3,
              }}
            >
              {user?.initials}
            </Avatar>

            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  @{user?.username}
                </Typography>

                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Chip
                    icon={<EmailIcon />}
                    label={user?.email}
                    variant="outlined"
                  />
                  <Chip
                    icon={<PhoneIcon />}
                    label={user?.phoneNumber || "Not provided"}
                    variant="outlined"
                  />
                </Stack>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-start" }}
              >
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={goToEdit}
                  sx={{ height: 40, alignSelf: "center" }}
                >
                  Edit Profile
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
      {/* Dashboard Content */}
      <Grid container spacing={4}>
        {/* Exercise Statistics */}
        <Grid item xs={12} md={8}>
          <Card elevation={0} sx={{ borderRadius: 3, height: "100%" }}>
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  <FitnessCenterIcon sx={{ mr: 1 }} />
                  Exercise Progress
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Select
                    value={selectedExercise}
                    onChange={handleExerciseChange}
                    size="small"
                    sx={{ minWidth: 150 }}
                  >
                    {exerciseOptions.map((exercise) => (
                      <MenuItem key={exercise.id} value={exercise.id}>
                        {exercise.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Select
                    value={chartType}
                    onChange={handleChartTypeChange}
                    size="small"
                    sx={{ minWidth: 150 }}
                  >
                    <MenuItem value="line">Line Chart</MenuItem>
                    <MenuItem value="bar">Bar Chart</MenuItem>
                    <MenuItem value="pie">Pie Chart</MenuItem>
                  </Select>
                </Stack>
              </Stack>

              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ mb: 3 }}
              >
                <Tab label="Last 7 Days" icon={<CalendarTodayIcon />} />
                <Tab label="Last 5 Weeks" icon={<TimelineIcon />} />
                <Tab label="Last 6 Months" icon={<TimelineIcon />} />
                <Tab label="Last Year" icon={<TimelineIcon />} />
                <Tab label="All Time" icon={<TimelineIcon />} />
              </Tabs>

              {renderChart()}

              <Typography variant="h6" sx={{ mt: 3 }}>
                Total Sessions:{" "}
                {selectedExercise === "all"
                  ? Object.values(progressData.byExercise).reduce(
                      (a, b) => a + b,
                      0
                    )
                  : progressData.byExercise[selectedExercise] || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ borderRadius: 3, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Quick Stats
              </Typography>

              <Stack spacing={2}>
                <Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Current Streak
                  </Typography>
                  <Typography variant="h4">7 days</Typography>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Sessions This Week
                  </Typography>
                  <Typography variant="h4">5</Typography>
                </Paper>

                <Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Favorite Exercise
                  </Typography>
                  <Typography variant="h4">Squats</Typography>
                </Paper>
              </Stack>
            </CardContent>
          </Card>

          {/* Exercise Breakdown */}
          <Card elevation={0} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                Exercise Breakdown
              </Typography>

              {Object.entries(progressData.byExercise).map(
                ([exercise, count]) => (
                  <Box key={exercise} sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {exercise.charAt(0).toUpperCase() + exercise.slice(1)}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={
                        (count /
                          Math.max(...Object.values(progressData.byExercise))) *
                        100
                      }
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {count} sessions
                    </Typography>
                  </Box>
                )
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
