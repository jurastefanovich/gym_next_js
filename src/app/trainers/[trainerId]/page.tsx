"use client";
import {
  Box,
  Button,
  Grid,
  Typography,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

// Static trainer data for now
const trainerData = {
  firstName: "John",
  lastName: "Doe",
  bio: "John Doe is a certified fitness trainer with over 10 years of experience helping clients achieve their fitness goals. He specializes in strength training, nutrition, and high-intensity workouts. He is passionate about helping individuals live healthier lives.",
  contact: "john.doe@example.com",
  imageUrl: "/trainer2.jpg", // You can replace this with your actual image URL
};

export default function TrainerPage() {
  // State to control dialog open/close
  const [open, setOpen] = useState(false);

  // State to handle form input values
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  // Open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handle form submission (for now, just log to the console)
  const handleSend = () => {
    console.log("Title:", title);
    console.log("Message:", message);
    // You can add your send logic here, e.g., making an API call
    handleClose();
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", padding: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left Section: Trainer's Image */}
          <Grid item xs={12} sm={5} md={4}>
            <Box
              sx={{
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <img
                src={trainerData.imageUrl}
                alt={`${trainerData.firstName} ${trainerData.lastName}`}
                style={{
                  width: "100%",
                  height: 500,
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>

          {/* Right Section: Trainer's Info */}
          <Grid item xs={12} sm={7} md={8}>
            <Typography variant="h4" fontWeight="bold">
              {trainerData.firstName} {trainerData.lastName}
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              {trainerData.bio}
            </Typography>
            <Typography variant="body1" color="text.primary" paragraph>
              <strong>Contact: </strong>
              {trainerData.contact}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleClickOpen()}
            >
              Get in Touch
            </Button>
          </Grid>
        </Grid>
      </Container>

      {/* Dialog for the Contact Form */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Contact {trainerData.firstName}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Message"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSend} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
