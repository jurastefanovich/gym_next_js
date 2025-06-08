"use client";

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
  Chip,
  Stack,
  useTheme,
} from "@mui/material";
import {
  LocationOn,
  Phone,
  Email,
  AccessTime,
  FitnessCenter,
  People,
  EmojiEvents,
} from "@mui/icons-material";
import { BoxNoMargin } from "../_features/components/Styled";

const teamMembers = [
  {
    name: "John Doe",
    role: "Fitness Trainer",
    imageUrl: "/images/team/john.jpg",
    specialties: ["Weight Loss", "Strength Training"],
  },
  {
    name: "Jane Smith",
    role: "Yoga Instructor",
    imageUrl: "/images/team/jane.jpg",
    specialties: ["Vinyasa", "Yin Yoga"],
  },
  {
    name: "Mark Wilson",
    role: "Personal Trainer",
    imageUrl: "/images/team/mark.jpg",
    specialties: ["Athletic Performance", "Bodybuilding"],
  },
];

const workingHours = [
  { day: "Monday", hours: "6:00 AM - 9:00 PM" },
  { day: "Tuesday", hours: "6:00 AM - 9:00 PM" },
  { day: "Wednesday", hours: "6:00 AM - 9:00 PM" },
  { day: "Thursday", hours: "6:00 AM - 9:00 PM" },
  { day: "Friday", hours: "6:00 AM - 8:00 PM" },
  { day: "Saturday", hours: "8:00 AM - 6:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

const location = {
  address: "123 Fitness St, Workout City, State, 12345",
  phone: "+1 (123) 456-7890",
  email: "contact@fitgym.com",
};

const values = [
  {
    title: "Inclusivity",
    description:
      "We welcome everyone, regardless of fitness level, background, or ability.",
    icon: <People color="primary" fontSize="large" />,
  },
  {
    title: "Community",
    description:
      "We foster a supportive community that motivates and encourages each other.",
    icon: <FitnessCenter color="primary" fontSize="large" />,
  },
  {
    title: "Excellence",
    description:
      "We believe that through dedication and consistency, you can achieve any fitness goal.",
    icon: <EmojiEvents color="primary" fontSize="large" />,
  },
];

const Page = () => {
  const theme = useTheme();

  return (
    <BoxNoMargin>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(rgba(0, 0, 0, 0.5), url('/images/gym-hero.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          py: 15,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            textAlign={"center"}
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Welcome to Iron Path
          </Typography>
          <Typography textAlign={"center"} variant="h5" sx={{ mb: 4 }}>
            Your journey to a healthier, stronger you starts here
          </Typography>
        </Container>
      </Box>

      {/* About Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            About Us
          </Typography>
          <Divider
            sx={{
              width: 100,
              height: 4,
              backgroundColor: theme.palette.primary.main,
              mx: "auto",
              mb: 4,
            }}
          />
          <Typography variant="body1" sx={{ maxWidth: 800, mx: "auto" }}>
            At Iron Path, we're more than just a fitness center - we're a
            community dedicated to helping you achieve your health and wellness
            goals. Our state-of-the-art facilities and expert trainers provide
            the perfect environment for your transformation journey.
          </Typography>
        </Box>

        {/* Mission & Values Section */}
        <Box sx={{ my: 8 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600, mb: 6 }}
          >
            Our Core Values
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ mb: 2 }}>{value.icon}</Box>
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {value.title}
                  </Typography>
                  <Typography variant="body1">{value.description}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Team Section */}
        <Box sx={{ my: 8 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600, mb: 6 }}
          >
            Meet Our Expert Trainers
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    p: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    "&:hover": {
                      boxShadow: 4,
                    },
                  }}
                >
                  <Avatar
                    src={member.imageUrl}
                    alt={member.name}
                    sx={{
                      width: 120,
                      height: 120,
                      mb: 3,
                      border: `3px solid ${theme.palette.primary.main}`,
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      gutterBottom
                    >
                      {member.role}
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="center"
                      sx={{ mb: 2 }}
                    >
                      {member.specialties.map((specialty, i) => (
                        <Chip
                          key={i}
                          label={specialty}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Hours & Location Section */}
        <Grid container spacing={4} sx={{ my: 8 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, height: "100%", borderRadius: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <AccessTime color="primary" sx={{ mr: 2, fontSize: 40 }} />
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  Working Hours
                </Typography>
              </Box>
              <List>
                {workingHours.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem sx={{ py: 1.5 }}>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1">
                            {item.day}
                          </Typography>
                        }
                        sx={{ flex: "0 0 120px" }}
                      />
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: item.day === "Sunday" ? 600 : "normal",
                        }}
                      >
                        {item.hours}
                      </Typography>
                    </ListItem>
                    {index < workingHours.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, height: "100%", borderRadius: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <LocationOn color="primary" sx={{ mr: 2, fontSize: 40 }} />
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  Our Location
                </Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Address:</strong> {location.address}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Phone:</strong> {location.phone}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {location.email}
                </Typography>
              </Box>
              <Box sx={{ height: 300, bgcolor: "grey.200", borderRadius: 2 }}>
                {/* Map placeholder - replace with actual map component */}
                <Box
                  sx={{
                    display: "flex",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "grey.500",
                  }}
                >
                  <Typography>Map would be displayed here</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </BoxNoMargin>
  );
};

export default Page;
