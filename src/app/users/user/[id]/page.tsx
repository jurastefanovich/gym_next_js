"use client";
import { BoxNoMargin } from "@/app/_features/components/Styled";
import BreakDown from "@/app/profile/edit/components/BreakDown";
import ExerciseChart from "@/app/profile/edit/components/ExerciseChart";
import Goals from "@/app/profile/edit/components/Goals";
import ProfileId from "@/app/profile/edit/components/idComponents/ProfileId";
import Profile from "@/app/profile/edit/components/Profile";
import QuickStats from "@/app/profile/edit/components/QuickStats";
import RecentSessions from "@/app/profile/edit/components/RecentSessions";
import { Box, Container, Grid, Typography, useTheme } from "@mui/material";

export default function FitnessDashboard() {
  const theme = useTheme();

  return (
    <BoxNoMargin
      sx={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Header */}
        <Box
          sx={{
            mb: 6,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              color: theme.palette.primary.main,
              mb: 1,
            }}
          >
            User Profile
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              fontWeight: 400,
              maxWidth: "600px",
              mx: { xs: "auto", md: "unset" },
            }}
          >
            Track users progress
          </Typography>
        </Box>

        {/* Main Content Grid */}
        <Grid container spacing={4}>
          {/* First Row */}
          <Grid item xs={12} lg={4}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <ProfileId />
              <RecentSessions />
            </Box>
          </Grid>

          <Grid item xs={12} lg={8}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <QuickStats />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Goals />
                </Grid>
                <Grid item xs={12} md={6}>
                  <BreakDown />
                </Grid>
              </Grid>

              <ExerciseChart />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </BoxNoMargin>
  );
}
