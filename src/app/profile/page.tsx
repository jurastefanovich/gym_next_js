"use client";

import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Profile() {
  const get = useAuth();
  const user = get.data;
  const router = useRouter();
  function goToEdit() {
    router.push("/profile/edit/");
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        px: 2,
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
      }}
    >
      <Container maxWidth="md">
        <Card elevation={4} sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Box
            sx={{
              height: 120,
              bgcolor: "primary.main",
              background: "primary",
            }}
          />

          <CardContent sx={{ position: "relative", pt: 8 }}>
            {/* Avatar with absolute positioning */}
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: "primary.main",
                fontSize: 48,
                position: "absolute",
                top: -60,
                left: "50%",
                transform: "translateX(-50%)",
                border: "4px solid white",
                boxShadow: 3,
              }}
            >
              {user?.initials}
            </Avatar>

            <Stack spacing={3} alignItems="center" sx={{ mt: 4 }}>
              <Box textAlign="center">
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {user?.username}
                </Typography>
              </Box>

              <IconButton
                onClick={() => goToEdit()}
                color="primary"
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  bgcolor: "background.paper",
                  boxShadow: 1,
                  "&:hover": {
                    bgcolor: "background.default",
                  },
                }}
              >
                <EditIcon />
              </IconButton>

              <Divider sx={{ width: "100%", my: 2 }} />

              <Grid container spacing={3} sx={{ width: "100%" }}>
                <Grid item xs={12} md={6}>
                  <Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <EmailIcon color="primary" />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Email
                        </Typography>
                        <Typography variant="body1">{user?.email}</Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper elevation={0} sx={{ p: 2, borderRadius: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <PhoneIcon color="primary" />
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Phone
                        </Typography>
                        <Typography variant="body1">
                          {user?.phoneNumber || "Not provided"}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
