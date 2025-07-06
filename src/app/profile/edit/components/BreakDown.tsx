import { StatsApi } from "@/app/_features/enums/ApiPaths";
import { formatExercise } from "@/app/_features/utils/StringHelpers";
import { useGet } from "@/app/hooks/useGet";
import { BarChart } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";

interface BreakDown {
  exercise: string;
  totalReps: number;
}

export default function BreakDown() {
  const { id } = useParams();
  const getBreakDown = useGet<BreakDown[]>(StatsApi.BREAK_DOWN + "/" + id);
  const data = getBreakDown.data;

  if (getBreakDown.loading) {
    return (
      <Wrapper>
        <CircularProgress />
      </Wrapper>
    );
  }

  if (data == null || data.length == 0) {
    <Wrapper>
      <Typography>You haven't done any exercises yet</Typography>;
    </Wrapper>;
  }

  return (
    <Wrapper>
      <Stack spacing={2}>
        {data?.map((breakdown) => (
          <Box key={breakdown.exercise}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: 0.5 }}
            >
              <Typography variant="body2">
                {formatExercise(breakdown.exercise)}
              </Typography>
              <Typography variant="body2" fontWeight="bold">
                {breakdown.totalReps}
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={
                (breakdown.totalReps / Math.max(breakdown.totalReps)) * 100
              }
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        ))}
      </Stack>
    </Wrapper>
  );
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <BarChart color="primary" />
          <Typography variant="h6" fontWeight="bold">
            Top performing exercises
          </Typography>
        </Stack>
        <Typography variant="caption" sx={{ mb: 4 }}>
          Number represents the totals number of reps over time
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}
