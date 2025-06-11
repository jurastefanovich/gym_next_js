"use client";
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Container,
  Chip,
  Stack,
  useTheme,
  Button,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  FitnessCenter,
  People,
  EmojiEvents,
  AccessTime,
  LocationOn,
  ArrowForward,
  SportsGymnastics,
  Pool,
  SelfImprovement,
  DirectionsRun,
} from "@mui/icons-material";
import { BoxNoMargin } from "./_features/components/Styled";
import Hero from "./_features/hero/Hero";
import { Background } from "./_features/enums/Colors";

const featuredServices = [
  {
    title: "Personal Training",
    description: "One-on-one coaching tailored to your fitness goals",
    icon: <DirectionsRun color="primary" fontSize="large" />,
  },
  {
    title: "Group Classes",
    description: "Fun, motivating workouts with our fitness community",
    icon: <People color="primary" fontSize="large" />,
  },
  {
    title: "Yoga Studio",
    description: "Improve flexibility and find your inner peace",
    icon: <SelfImprovement color="primary" fontSize="large" />,
  },
  {
    title: "Swimming Pool",
    description: "Olympic-sized pool for all your aquatic workouts",
    icon: <Pool color="primary" fontSize="large" />,
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Member for 3 years",
    quote: "The trainers here changed my life. I've never felt stronger!",
    avatar: "/images/testimonials/sarah.jpg",
  },
  {
    name: "Michael Chen",
    role: "Member for 1 year",
    quote: "Best gym facilities in town with an amazing community vibe.",
    avatar: "/images/testimonials/michael.jpg",
  },
  {
    name: "Emma Rodriguez",
    role: "New member",
    quote: "I was nervous to join but everyone made me feel so welcome!",
    avatar: "/images/testimonials/emma.jpg",
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

export default function Home() {
  const theme = useTheme();

  return (
    <>
      <Hero />
      <BoxNoMargin sx={{bgcolor: Background.DARK}}>
        {/* Hero Section */}
        <Box
          sx={{
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/gym-hero.jpg')`,
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
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Transform Your Body, Elevate Your Life
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Join Iron Path today and start your fitness journey with our
              expert trainers
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                href="/services"
              >
                Explore Services
              </Button>
              <Button
                variant="outlined"
                size="large"
                color="inherit"
                endIcon={<ArrowForward />}
                href="/signup"
              >
                Join Now
              </Button>
            </Stack>
          </Container>
        </Box>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Why Choose Iron Path?
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
              We offer world-class facilities, expert trainers, and a supportive
              community to help you achieve your fitness goals.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {featuredServices.map((service, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
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
                  <Box sx={{ mb: 2 }}>{service.icon}</Box>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {service.description}
                    </Typography>
                    <Button
                      variant="text"
                      endIcon={<ArrowForward />}
                      href="/services"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Stats Section */}
        <Box sx={{ backgroundColor: "primary.main", color: "white", py: 8 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={6} sm={3} textAlign="center">
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  10+
                </Typography>
                <Typography variant="h6">Years Experience</Typography>
              </Grid>
              <Grid item xs={6} sm={3} textAlign="center">
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  500+
                </Typography>
                <Typography variant="h6">Happy Members</Typography>
              </Grid>
              <Grid item xs={6} sm={3} textAlign="center">
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  15+
                </Typography>
                <Typography variant="h6">Expert Trainers</Typography>
              </Grid>
              <Grid item xs={6} sm={3} textAlign="center">
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  24+
                </Typography>
                <Typography variant="h6">Weekly Classes</Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Testimonials */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              What Our Members Say
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
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ mb: 3, fontStyle: "italic" }}
                  >
                    "{testimonial.quote}"
                  </Typography>
                  <Box
                    sx={{ display: "flex", alignItems: "center", mt: "auto" }}
                  >
                    <Avatar
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* CTA Section */}
        <Box
          sx={{
            background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/gym-cta.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            py: 10,
            textAlign: "center",
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
              Ready to Start Your Fitness Journey?
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Get your free 7-day trial pass today
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              href="/signup"
              sx={{ px: 6 }}
            >
              Claim Your Free Trial
            </Button>
          </Container>
        </Box>

        {/* Hours & Location */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
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
                        <Typography variant="body1">{item.hours}</Typography>
                      </ListItem>
                      {index < workingHours.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <SportsGymnastics
                    color="primary"
                    sx={{ mr: 2, fontSize: 40 }}
                  />
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    Today's Classes
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>6:30 AM</strong> - Power Yoga
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>8:00 AM</strong> - HIIT Circuit
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>12:00 PM</strong> - Lunchtime Lift
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>6:00 PM</strong> - Spin Class
                </Typography>
                <Button
                  variant="text"
                  endIcon={<ArrowForward />}
                  href="/classes"
                  sx={{ mt: 2 }}
                >
                  View Full Schedule
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </BoxNoMargin>
    </>
  );
}
