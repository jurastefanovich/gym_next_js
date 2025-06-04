"use client";

import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UserStats from "../components/UserStats";

export default function Profile() {
  // Dummy user data
  const user = {
    username: "janedoe",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    phoneNumber: "+1 (555) 123-4567",
    avatarUrl: "", // fallback to initials
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <>
          <Grid container spacing={4} alignItems="center">
            {/* Avatar Section */}
            <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
              <Avatar
                src={user.avatarUrl}
                sx={{
                  width: 150,
                  height: 150,
                  bgcolor: "primary.main",
                  fontSize: 48,
                  mx: "auto",
                }}
              >
                {user.firstName[0]}
                {user.lastName[0]}
              </Avatar>
            </Grid>

            {/* Info Section */}
            <Grid item xs={12} md={8}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h5" fontWeight="bold">
                  {user.firstName} {user.lastName}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  size="small"
                >
                  Edit
                </Button>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  Username
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {user.username}
                </Typography>

                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  Email
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {user.email}
                </Typography>

                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  gutterBottom
                >
                  Phone
                </Typography>
                <Typography variant="body1">{user.phoneNumber}</Typography>
              </Box>
            </Grid>
          </Grid>
        </>
        <UserStats />
      </Container>
    </Box>
  );
}
