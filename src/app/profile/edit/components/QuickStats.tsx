import { AppointmentApi, StatsApi } from "@/app/_features/enums/ApiPaths";
import { useGet } from "@/app/hooks/useGet";
import { TrendingUp } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

export default function QuickStats() {
  const getStats = useGet(StatsApi.QUICK_STATS);
  if (getStats.loading) {
    return <LinearProgress />;
  }

  const data = getStats.data;
  const streak = data?.["Session Streak"];
  const favorite = data?.["Favorite Exercise"];
  const formattedFavorite = String(favorite).split("_").join(" ").toLowerCase();
  const thisWeek = data?.["Session this week"];
  const total = data?.["Total Sessions"];
  const singleStreak = streak < 2;
  return (
    <Card sx={{ mb: 3, borderRadius: 3 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <TrendingUp color="primary" />
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
                {streak} {singleStreak ? "day" : "days"}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper sx={{ p: 2, borderRadius: 2, height: "100%" }}>
              <Typography variant="subtitle2" color="text.secondary">
                Sessions This Week
              </Typography>
              <Typography variant="h4">{thisWeek}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper sx={{ p: 2, borderRadius: 2, height: "100%" }}>
              <Typography variant="subtitle2" color="text.secondary">
                Most Done Exercise
              </Typography>
              <Typography variant="h4">{formattedFavorite}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper sx={{ p: 2, borderRadius: 2, height: "100%" }}>
              <Typography variant="subtitle2" color="text.secondary">
                Total Sessions
              </Typography>
              <Typography variant="h4">{total}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
