import {
  Card,
  CardContent,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
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
export default function Goals() {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Your Goals
        </Typography>
        <Stack spacing={1}>
          {userData.goals.map((goal, index) => (
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
  );
}
