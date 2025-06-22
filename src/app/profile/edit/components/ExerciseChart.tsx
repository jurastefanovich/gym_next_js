"use client";
import { ServicesApi, StatsApi } from "@/app/_features/enums/ApiPaths";
import { useGet } from "@/app/hooks/useGet";
import {
  BarChart as BarChartIcon,
  FitnessCenter as FitnessCenterIcon,
  LinearScale as LineChartIcon,
  PieChart as PieChartIcon,
  Timeline as TimelineIcon,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import { Fragment, useEffect, useMemo, useState } from "react";

const timeFrames = ["day", "week", "month", "year", "all"] as const;
const chartTypes = ["line", "bar", "pie"] as const;

export default function ExerciseChart() {
  const [selectedExercise, setSelectedExercise] = useState("");
  const [timeFrameIndex, setTimeFrameIndex] = useState(1); // Default: week
  const [chartType, setChartType] = useState<"line" | "bar" | "pie">("line");

  const {
    data: exercises,
    loading: loadingExercises,
    error: exerciseError,
  } = useGet<string[]>(ServicesApi.GET_EXERCISES);

  const chartUrl = useMemo(() => {
    return `${StatsApi.CHART}?exercise=${selectedExercise}&timeframe=${timeFrames[timeFrameIndex]}`;
  }, [selectedExercise, timeFrameIndex]);

  const {
    data: chartData,
    loading: loadingChart,
    error: chartError,
    refetch: refetchChart,
  } = useGet<{
    labels: string[];
    values: number[];
    byExercise?: Record<string, number>;
  }>(chartUrl);

  useEffect(() => {
    refetchChart();
  }, [chartUrl]);

  const renderChart = () => {
    if (!chartData) return null;
    const { labels, values } = chartData;

    if (chartType === "line") {
      return (
        <LineChart
          xAxis={[{ scaleType: "point", data: labels }]}
          series={[{ data: values, area: true }]}
          height={300}
          colors={["#3f51b5"]}
        />
      );
    }
    if (chartType === "bar") {
      return (
        <BarChart
          xAxis={[{ scaleType: "band", data: labels }]}
          series={[{ data: values }]}
          height={300}
          colors={["#3f51b5"]}
        />
      );
    }
  };

  if (loadingExercises || loadingChart) {
    return (
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent sx={{ textAlign: "center", padding: 6 }}>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  const noData = selectedExercise == "" || chartData == null;

  return (
    <Card sx={{ mb: 10, borderRadius: 3, height: "100%" }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <FitnessCenterIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">
            Exercise Statistics
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Exercise</InputLabel>
            <Select
              label="Exercise"
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(e.target.value)}
            >
              {(exercises || []).map((name) => (
                <MenuItem key={name} value={name}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <FitnessCenterIcon fontSize="small" />
                    {name}
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Chart Type</InputLabel>
            <Select
              label="Chart Type"
              value={chartType}
              onChange={(e) => setChartType(e.target.value as any)}
            >
              <MenuItem value="line">
                <LineChartIcon /> Line
              </MenuItem>
              <MenuItem value="bar">
                <BarChartIcon /> Bar
              </MenuItem>
              <MenuItem value="pie">
                <PieChartIcon /> Pie
              </MenuItem>
            </Select>
          </FormControl>
        </Stack>
        {noData ? (
          <Typography>Please select an exercise you want to view</Typography>
        ) : (
          <Fragment>
            <Tabs
              value={timeFrameIndex}
              onChange={(_, newValue) => setTimeFrameIndex(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ mb: 3 }}
            >
              {["7 Days", "5 Weeks", "6 Months", "Year", "All Time"].map(
                (label, i) => (
                  <Tab
                    key={timeFrames[i]}
                    label={label}
                    icon={<TimelineIcon />}
                  />
                )
              )}
            </Tabs>

            <Box sx={{ height: 300 }}>{renderChart()}</Box>
          </Fragment>
        )}
      </CardContent>
    </Card>
  );
}
