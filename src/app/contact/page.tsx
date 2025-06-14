"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  CircularProgress,
  Alert,
  useTheme,
  Paper,
  Avatar,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  Send,
  CheckCircle,
  Help,
  Schedule,
} from "@mui/icons-material";
import { usePost } from "../hooks/usePost";
import {
  getAccessToken,
  isLoggedIn,
} from "../_features/utils/LocalStorageHelpers";
import { GymValues } from "../_features/enums/GymData";
import { useAuth } from "../context/AuthContext";

const ContactPage = () => {
  const theme = useTheme();
  const loggedIn = isLoggedIn();
  const user = useAuth();
  const data = user.data;

  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const post = usePost();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  React.useEffect(() => {
    if (loggedIn && data) {
      setName(`${data.firstName} ${data.lastName}`);
      setEmail(data.email);
    }
  }, [loggedIn, data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = { name, email, subject, message };
  };
  const contactMethods = [
    {
      icon: <Email color="primary" />,
      title: "Email Us",
      value: GymValues.supportMail,
      action: "Send us an email",
    },
    {
      icon: <Phone color="primary" />,
      title: "Call Us",
      value: GymValues.phoneNumber,
      action: "Call our support line",
    },
    {
      icon: <LocationOn color="primary" />,
      title: "Visit Us",
      value: GymValues.location,
      action: "Get directions",
    },
    {
      icon: <Schedule color="primary" />,
      title: "Hours",
      value: "Mon-Fri: 6am-10pm\nSat-Sun: 8am-8pm",
      action: "",
    },
  ];

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", p: { xs: 2, md: 4 } }}>
      {/* Page Header */}
      <Box textAlign="center" mb={6}>
        <Chip
          label="We're here to help"
          color="primary"
          icon={<Help />}
          sx={{ mb: 2, px: 2, py: 1, fontSize: "0.9rem" }}
        />
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Contact Our Team
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          maxWidth={700}
          mx="auto"
        >
          Have questions or feedback? Reach out to us through the form below or
          connect with our support team directly.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Contact Form Column */}
        <Grid item xs={12} md={7}>
          <Card elevation={2} sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              {submitted ? (
                <Box textAlign="center" py={4}>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.success.light,
                      color: theme.palette.success.main,
                      width: 80,
                      height: 80,
                      mb: 3,
                      mx: "auto",
                    }}
                  >
                    <CheckCircle fontSize="large" />
                  </Avatar>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    Message Sent Successfully!
                  </Typography>
                  <Typography color="text.secondary" mb={4}>
                    We've received your message and will get back to you within
                    24 hours.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => setSubmitted(false)}
                    startIcon={<Send />}
                  >
                    Send Another Message
                  </Button>
                </Box>
              ) : (
                <>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    Send Us a Message
                  </Typography>
                  <Typography color="text.secondary" mb={3}>
                    Fill out the form below and we'll respond as soon as
                    possible.
                  </Typography>

                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ "& .MuiTextField-root": { mb: 3 } }}
                  >
                    <Grid container spacing={2}>
                      {!loggedIn && (
                        <>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Your Name"
                              variant="outlined"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Your Email"
                              variant="outlined"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                          </Grid>
                        </>
                      )}

                      <Grid item xs={12}>
                        <FormControl fullWidth required>
                          <InputLabel>Subject</InputLabel>
                          <Select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            label="Subject"
                          >
                            <MenuItem value="General Inquiry">
                              General Inquiry
                            </MenuItem>
                            <MenuItem value="Membership">Membership</MenuItem>
                            <MenuItem value="Personal Training">
                              Personal Training
                            </MenuItem>
                            <MenuItem value="Group Classes">
                              Group Classes
                            </MenuItem>
                            <MenuItem value="Billing">Billing</MenuItem>
                            <MenuItem value="Feedback">Feedback</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          minRows={5}
                          label="Your Message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                        />
                      </Grid>
                    </Grid>

                    <Button
                      fullWidth
                      size="large"
                      variant="contained"
                      type="submit"
                      disabled={post.loading}
                      startIcon={
                        post.loading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <Send />
                        )
                      }
                      sx={{ mt: 2, py: 1.5 }}
                    >
                      {post.loading ? "Sending..." : "Send Message"}
                    </Button>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Info Column */}
        <Grid item xs={12} md={5}>
          <Box sx={{ position: "sticky", top: 20 }}>
            <Card elevation={2} sx={{ borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  Other Ways to Connect
                </Typography>
                <Typography color="text.secondary" mb={3}>
                  Prefer to contact us directly? Here's how you can reach our
                  team.
                </Typography>

                <Grid container spacing={3}>
                  {contactMethods.map((method, index) => (
                    <Grid item xs={12} key={index}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          // "&:hover": {
                          //   borderColor: "primary.main",
                          //   backgroundColor: "action.hover",
                          // },
                        }}
                      >
                        <Box display="flex" alignItems="flex-start">
                          <Box
                            sx={{
                              mr: 2,
                              mt: 0.5,
                              color: "primary.main",
                            }}
                          >
                            {method.icon}
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {method.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              whiteSpace="pre-line"
                              sx={{ my: 1 }}
                            >
                              {method.value}
                            </Typography>
                            {/* {method.action && (
                              <Button
                                variant="text"
                                size="small"
                                color="primary"
                                sx={{ mt: 1, px: 0 }}
                              >
                                {method.action}
                              </Button>
                            )} */}
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactPage;
