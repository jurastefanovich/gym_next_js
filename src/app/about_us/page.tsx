"use client";

import React from "react";
import { Box, Typography, Grid, Paper, Avatar, Card, CardContent, List, ListItem, ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles";

// Dummy data for the team section
const teamMembers = [
  { name: "John Doe", role: "Fitness Trainer", imageUrl: "/images/team/john.jpg" },
  { name: "Jane Smith", role: "Yoga Instructor", imageUrl: "/images/team/jane.jpg" },
  { name: "Mark Wilson", role: "Personal Trainer", imageUrl: "/images/team/mark.jpg" },
];

// Dummy data for working hours and location
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

// Styles using makeStyles (optional)
const useStyles = makeStyles({
  section: {
    marginBottom: "2rem",
    padding: "2rem",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
  },
  sectionTitle: {
    marginBottom: "1rem",
    fontWeight: "bold",
  },
  teamCard: {
    maxWidth: 240,
    margin: "auto",
    textAlign: "center",
  },
  teamAvatar: {
    width: 100,
    height: 100,
    margin: "auto",
    marginBottom: "1rem",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const page = () => {
  const classes = useStyles();

  return (
    <Box sx={{ maxWidth: "1200px", margin: "auto", padding: 2 }}>
      {/* Gym Introduction Section */}
      <Box className={classes.section}>
        <Typography variant="h4" align="center" className={classes.sectionTitle}>
          About Us
        </Typography>
        <Typography variant="body1" align="center">
          Welcome to Fit Gym! Our mission is to help you achieve your fitness goals in a
          supportive and welcoming environment. Whether you're here to lose weight, build muscle,
          or improve your overall health, we're here to guide you every step of the way.
        </Typography>
      </Box>

      {/* Mission & Values Section */}
      <Box className={classes.section}>
        <Typography variant="h5" align="center" className={classes.sectionTitle}>
          Our Mission & Values
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          At Fit Gym, our mission is to empower individuals to take control of their health and
          wellness. We believe in inclusivity, community, and hard work. Here’s what we stand for:
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" align="center" gutterBottom>
                Inclusivity
              </Typography>
              <Typography variant="body2" align="center">
                We welcome everyone, regardless of fitness level, background, or ability.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" align="center" gutterBottom>
                Community
              </Typography>
              <Typography variant="body2" align="center">
                We foster a supportive community that motivates and encourages each other.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" align="center" gutterBottom>
                Hard Work
              </Typography>
              <Typography variant="body2" align="center">
                We believe that through dedication and consistency, you can achieve any fitness goal.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Team Section */}
      <Box className={classes.section}>
        <Typography variant="h5" align="center" className={classes.sectionTitle}>
          Meet Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item key={index}>
              <Card className={classes.teamCard}>
                <Avatar
                  src={member.imageUrl}
                  alt={member.name}
                  className={classes.teamAvatar}
                />
                <CardContent>
                  <Typography variant="h6">{member.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Working Hours Section */}
      <Box className={classes.section}>
        <Typography variant="h5" align="center" className={classes.sectionTitle}>
          Our Working Hours
        </Typography>
        <List>
          {workingHours.map((item, index) => (
            <ListItem key={index} className={classes.listItem}>
              <ListItemText primary={item.day} />
              <Typography variant="body2">{item.hours}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Location Section */}
      <Box className={classes.section}>
        <Typography variant="h5" align="center" className={classes.sectionTitle}>
          Location
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          <strong>Address:</strong> {location.address}
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          <strong>Phone:</strong> {location.phone}
        </Typography>
        <Typography variant="body1" align="center">
          <strong>Email:</strong> {location.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default page;
